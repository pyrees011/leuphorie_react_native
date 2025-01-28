import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, Edit2 } from 'lucide-react-native';

export default function ProfileScreen() {
  const user = {
    username: "Ferdinand",
    email: "ferdinand@example.com",
    avatar: "https://i.pinimg.com/736x/f3/d2/34/f3d2346a59335f12ec7b6c460177414a.jpg"
  };

  const profileSections = [
    {
      title: 'Personal Information',
      items: [
        { label: 'Name', value: user.username },
        { label: 'Email', value: user.email },
        { label: 'Phone', value: '+1 234 567 890' },
      ]
    },
    {
      title: 'Account Settings',
      items: [
        { label: 'Change Password', value: '********' },
        { label: 'Language', value: 'English' },
        { label: 'Time Zone', value: 'UTC-7' },
      ]
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Profile Header */}
      <View className="bg-gradient-to-r from-emerald-800/25 to-yellow-500/25 p-6 items-center">
        <View className="relative">
          <Image 
            source={{ uri: user.avatar }}
            className="w-24 h-24 rounded-full"
          />
          <TouchableOpacity className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow">
            <Camera size={20} color="#666" />
          </TouchableOpacity>
        </View>
        <Text className="text-xl font-semibold mt-4">{user.username}</Text>
        <Text className="text-gray-600">{user.email}</Text>
      </View>

      {/* Profile Sections */}
      <View className="p-4 gap-6">
        {profileSections.map((section, index) => (
          <View key={index} className="bg-white rounded-xl overflow-hidden">
            <Text className="text-gray-500 text-sm uppercase px-4 pt-4 pb-2">
              {section.title}
            </Text>
            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                className="flex-row items-center justify-between px-4 py-4 border-t border-gray-100"
              >
                <Text className="text-gray-600">{item.label}</Text>
                <View className="flex-row items-center">
                  <Text className="text-gray-900 mr-2">{item.value}</Text>
                  <Edit2 size={16} color="#666" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
