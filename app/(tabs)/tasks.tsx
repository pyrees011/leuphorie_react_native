import { View, Text, TouchableOpacity, ScrollView, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Check, Trash2 } from 'lucide-react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useState, useCallback } from 'react';

interface CategoryCardProps {
  title: string;
  count: number;
  color: string;
}

interface DeletedTask {
  task: typeof tasks[0];
  index: number;
}

export default function Tasks() {
  // TODO: make this dynamic
  // TODO: fix the swipe left to delete
  // TODO: connect to the database
  // TODO: fix the states
  const [tasksList, setTasksList] = useState(tasks);
  const [deletedTask, setDeletedTask] = useState<DeletedTask | null>(null);
  const [showUndo, setShowUndo] = useState(false);

  const handleDelete = useCallback((index: number) => {
    const taskToDelete = tasksList[index];
    setTasksList(prev => prev.filter((_, i) => i !== index));
    setDeletedTask({ task: taskToDelete, index });
    setShowUndo(true);

    // Auto-hide undo after 5 seconds
    setTimeout(() => {
      setShowUndo(false);
      setDeletedTask(null);
    }, 5000);
  }, [tasksList]);

  const handleUndo = useCallback(() => {
    if (deletedTask) {
      const newTasks = [...tasksList];
      newTasks.splice(deletedTask.index, 0, deletedTask.task);
      setTasksList(newTasks);
      setShowUndo(false);
      setDeletedTask(null);
    }
  }, [deletedTask, tasksList]);

  const handleTaskCompletion = useCallback((index: number) => {
    const updatedTasks = [...tasksList];
    updatedTasks[index] = {
      ...updatedTasks[index],
      completed: !updatedTasks[index].completed,  
    };
    setTasksList(updatedTasks);
  }, [tasksList]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} className="bg-gray-100">
        {/* Title Section */}
        <View className="px-4 mb-6">
          <Text className="text-3xl font-bold text-gray-900">
            What's up, {user.name}!
          </Text>
        </View>

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

        {/* Today's Tasks */}
        <View className="px-4 mt-2 flex-1">
          <Text className="text-gray-500 mb-4 uppercase text-sm">TODAY'S TASKS</Text>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {tasksList.map((task, index) => (
              <TaskCard 
                key={index} 
                task={task}
                onDelete={() => handleDelete(index)}
                onToggleCompletion={() => handleTaskCompletion(index)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Undo Snackbar */}
        {showUndo && (
          <View className="absolute bottom-24 left-4 right-4 bg-gray-900 rounded-lg p-4 flex-row justify-between items-center">
            <Text className="text-white">Task was deleted</Text>
            <TouchableOpacity onPress={handleUndo}>
              <Text className="text-blue-400 font-medium">UNDO</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Add Task Button */}
        <TouchableOpacity className="absolute bottom-8 right-8 w-14 h-14 bg-blue-500 rounded-full items-center justify-center">
          <Plus size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const user = {
  name: 'Joy',
};

const tasks = [
  { title: 'Daily meeting with team', completed: false, priority: 'high' },
  { title: 'Pay for rent', completed: true, priority: 'medium' },
  { title: 'Check emails', completed: false, priority: 'low' },
  { title: 'Lunch with Emma', completed: false, priority: 'high' },
  { title: 'Meditation', completed: false, priority: 'medium' },
];

const CategoryCard = ({ title, count, color }: CategoryCardProps) => {
    return (
      <View className="flex-col bg-white p-4 rounded-lg min-w-[150px] gap-2">
        <Text className="text-gray-500 text-sm font-light">{count} tasks</Text>
        <Text className="text-gray-900 text-xl font-bold mb-2">{title}</Text>
        <View className="w-full h-1 bg-gray-300 rounded-full" >
          <View className={`h-1 ${color} w-[${count}%] rounded-full`} />
        </View>
      </View>
    );
  };

const TaskCard = ({ task, onDelete, onToggleCompletion }: { task: typeof tasks[0], onDelete: () => void, onToggleCompletion: () => void }) => {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleSwipeLeft = () => {
    setIsDeleted(true);
    setTimeout(() => {
      if (isDeleted) {
        onDelete();
      }
    }, 5000);
  };

  const handleUndo = () => {
    setIsDeleted(false);
  };

  if (isDeleted) {
    return (
      <View className="flex-row items-center justify-between mb-4 bg-gray-100 p-4 rounded-lg">
        <Text className="text-gray-600">Task was deleted</Text>
        <TouchableOpacity 
          onPress={handleUndo}
          className="bg-white px-4 py-2 rounded-full border border-gray-300"
        >
          <Text className="text-blue-500">Undo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <Swipeable
      friction={2}
      leftThreshold={80}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      onSwipeableOpen={() => handleSwipeLeft()}
      renderRightActions={() => null}
    >
      <View className="flex-row items-center mb-4 bg-white p-4 rounded-lg py-6">
        <TouchableOpacity className={`w-5 h-5 rounded-full border-2 mr-3 ${
          task.priority === 'high' && !task.completed ? 'border-red-500' 
          : task.priority === 'medium' && !task.completed ? 'border-yellow-500' 
          : task.priority === 'low' && !task.completed ? 'border-green-500' 
          : 'border-gray-300'} ${task.completed && 'bg-gray-300 border-gray-300'}`}
          onPress={onToggleCompletion}
        >
          {task.completed && <Check size={14} color="white" />}
        </TouchableOpacity>
        <Text className={`text-base ${
          task.completed ? 'text-gray-400 line-through' : 'text-gray-900'
        }`}>
          {task.title}
        </Text>
      </View>
    </Swipeable>
  );
};


// this works for swipe left to delete

// const TaskCard = ({ task, onDelete }: { task: typeof tasks[0], onDelete: () => void }) => {
//   const renderRightActions = (
//     progress: Animated.AnimatedInterpolation<number>,
//     dragX: Animated.AnimatedInterpolation<number>
//   ) => {
//     const scale = dragX.interpolate({
//       inputRange: [-80, 0],
//       outputRange: [1, 0],
//       extrapolate: 'clamp',
//     });

//     return (
//       <TouchableOpacity 
//         onPress={onDelete}
//         className="w-15 h-10 flex justify-center items-center bg-gray-100 border-black border-2 rounded-full p-2 px-4 mt-4"
//       >
//         <Text className="text-black">Undo</Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <Swipeable
//       renderRightActions={renderRightActions}
//       rightThreshold={40}
//     >
//       <View className="flex-row items-center mb-4 bg-white p-4 rounded-lg py-6">
//         <View className={`w-5 h-5 rounded-full border-2 mr-3 ${
//           task.priority === 'high' && !task.completed ? 'border-red-500' 
//           : task.priority === 'medium' && !task.completed ? 'border-yellow-500' 
//           : task.priority === 'low' && !task.completed ? 'border-green-500' 
//           : 'border-gray-300'} ${task.completed && 'bg-gray-300 border-gray-300'}`}
//         >
//           {task.completed && <Check size={14} color="white" />}
//         </View>
//         <Text className={`text-base ${
//           task.completed ? 'text-gray-400 line-through' : 'text-gray-900'
//         }`}>
//           {task.title}
//         </Text>
//       </View>
//     </Swipeable>
//   );
// };