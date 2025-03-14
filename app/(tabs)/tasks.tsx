import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Check, Bell } from 'lucide-react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useState, useCallback } from 'react';
import { AddTaskModal } from '../../components/ui/AddTaskModal';
import { useTasks } from '@/hooks/useTask';

interface DeletedTask {
  task: typeof tasks[0];
  index: number;
}

interface CategoryCardProps {
  title: string;
  count: number;
  color: string;
}

export default function Tasks() {
  const [tasksList, setTasksList] = useState(tasks);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const { categories } = useTasks();

  console.log("categories", categories);

  const handleTaskCompletion = useCallback((index: number) => {
    const updatedTasks = [...tasksList];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,  
    };
    setTasksList(updatedTasks);
  }, [tasksList]);

  const handleAddTask = (newTask: {
    title: string;
    priority: 'high' | 'medium' | 'low';
    time: string;
  }) => {
    setTasksList(prev => [...prev, {
      ...newTask,
      completed: false,
    }]);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1 bg-gray-100">

        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* Welcome Banner */}
          <View className="bg-gradient-to-r from-emerald-800/25 to-yellow-500/25 p-6">
            <Text className="text-2xl font-semibold mb-2">Today's Tasks</Text>
            <Text className="text-gray-600">
              You have {tasksList.filter(t => !t.completed).length} tasks remaining
            </Text>
          </View>

          {/* Tasks Section */}
          <View className="p-4 gap-4">
            {/* Categories */}
            <View className="px-4 mb-6">
              <Text className="text-gray-500 mb-4 uppercase text-sm">CATEGORIES</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 16, paddingRight: 16 }}
              >
                <CategoryCard title="Business" count={40} color="bg-pink-500" />
                <CategoryCard title="Personal" count={18} color="bg-blue-500" />
                <CategoryCard title="Hobbies" count={75} color="bg-green-500" />
                <CategoryCard title="Health" count={58} color="bg-yellow-500" />
              </ScrollView>
            </View>

            {/* Tasks List */}
            <View className="bg-white rounded-xl p-4">
              <Text className="text-xl font-semibold mb-4">Priority Tasks</Text>
              <View className="gap-2">
                {tasksList.map((task, index) => (
                  <TaskCard 
                    key={index}
                    task={task}
                    onToggleCompletion={() => handleTaskCompletion(index)}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Add Task Button */}
        <TouchableOpacity 
          className="absolute bottom-28 right-8 w-14 h-14 bg-emerald-500 rounded-full items-center justify-center shadow-lg"
          onPress={() => setIsAddModalVisible(true)}
        >
          <Plus size={24} color="white" />
        </TouchableOpacity>

        {/* Add Task Modal */}
        <AddTaskModal
          visible={isAddModalVisible}
          onClose={() => setIsAddModalVisible(false)}
          onAdd={handleAddTask}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const TaskCard = ({ task, onToggleCompletion }: { 
  task: typeof tasks[0], 
  onToggleCompletion: () => void 
}) => {
  return (
    <TouchableOpacity 
      onPress={onToggleCompletion}
      className="flex-row items-center p-4 bg-gray-50 rounded-xl"
    >
      <View className={`w-5 h-5 rounded-full border-2 mr-3 ${
        task.priority === 'high' ? 'border-red-500' 
        : task.priority === 'medium' ? 'border-yellow-500' 
        : 'border-green-500'} ${task.completed && 'bg-gray-300 border-gray-300'}`}
      >
        {task.completed && <Check size={14} color="white" />}
      </View>
      <Text className={`flex-1 text-base ${
        task.completed ? 'text-gray-400 line-through' : 'text-gray-900'
      }`}>
        {task.title}
      </Text>
      <Text className="text-gray-400 text-sm">{task.time}</Text>
    </TouchableOpacity>
  );
};

const tasks = [
  { title: 'Daily meeting with team', completed: false, priority: 'high', time: '10:00 AM' },
  { title: 'Pay for rent', completed: true, priority: 'medium', time: '12:00 PM' },
  { title: 'Check emails', completed: false, priority: 'low', time: '2:00 PM' },
  { title: 'Lunch with Emma', completed: false, priority: 'high', time: '1:00 PM' },
  { title: 'Meditation', completed: false, priority: 'medium', time: '4:00 PM' },
];

// const categories = ['All', 'Work', 'Personal', 'Shopping', 'Health'];

const CategoryCard = ({ title, count, color }: CategoryCardProps) => {
  return (
    <View className="flex-col bg-white p-4 rounded-lg min-w-[150px] gap-2">
      <Text className="text-gray-500 text-sm font-light">{count} tasks</Text>
      <Text className="text-gray-900 text-xl font-bold mb-2">{title}</Text>
      <View className="w-full h-1 bg-gray-300 rounded-full" >
        <View className={`h-1 w-[${count}%] ${color} rounded-full`} />
      </View>
    </View>
  );
};