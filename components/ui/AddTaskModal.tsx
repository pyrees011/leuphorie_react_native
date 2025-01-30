import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Modal, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { X } from 'lucide-react-native';
import { useState } from 'react';

interface AddTaskModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (task: {
    title: string;
    priority: 'high' | 'medium' | 'low';
    time: string;
  }) => void;
}

export function AddTaskModal({ visible, onClose, onAdd }: AddTaskModalProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [time, setTime] = useState('');

  const handleAdd = () => {
    if (!title.trim()) return;
    
    onAdd({
      title,
      priority,
      time: time || '12:00 PM',
    });

    // Reset form
    setTitle('');
    setPriority('medium');
    setTime('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex-1"
        >
          <View className="flex-1 justify-end bg-black/50">
            <View className="bg-white rounded-t-3xl p-6">
              <View className="flex-row justify-between items-center mb-6">
                <Text className="text-xl font-semibold">Add New Task</Text>
                <TouchableOpacity onPress={onClose}>
                  <X size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <ScrollView 
                className="gap-4"
                keyboardShouldPersistTaps="handled"
              >
                <View className="mb-4">
                  <Text className="text-gray-600 mb-2">Task Title</Text>
                  <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter task title"
                    className="border border-gray-200 rounded-lg p-3"
                    returnKeyType="next"
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-gray-600 mb-2">Priority</Text>
                  <View className="flex-row gap-2">
                    {(['high', 'medium', 'low'] as const).map((p) => (
                      <TouchableOpacity
                        key={p}
                        onPress={() => setPriority(p)}
                        className={`flex-1 p-3 rounded-lg border ${
                          priority === p 
                            ? 'bg-emerald-500 border-emerald-500' 
                            : 'border-gray-200'
                        }`}
                      >
                        <Text className={priority === p ? 'text-white' : 'text-gray-600'}>
                          {p.charAt(0).toUpperCase() + p.slice(1)}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View className="mb-6">
                  <Text className="text-gray-600 mb-2">Time</Text>
                  <TextInput
                    value={time}
                    onChangeText={setTime}
                    placeholder="e.g., 3:00 PM"
                    className="border border-gray-200 rounded-lg p-3"
                    returnKeyType="done"
                    onSubmitEditing={handleAdd}
                  />
                </View>

                <TouchableOpacity
                  onPress={handleAdd}
                  className="bg-emerald-500 p-4 rounded-lg mb-4"
                >
                  <Text className="text-white text-center font-semibold">Add Task</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Modal>
  );
} 