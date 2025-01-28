import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RelativePathString, router } from 'expo-router';
import { Bell, ChevronRight, User, Bell as BellIcon, Lock, Settings as SettingsIcon } from 'lucide-react-native';

export default function Settings() {
  const user = {
    username: "Ferdinand",
    email: "ferdinand@example.com",
    avatar: "https://i.pinimg.com/736x/f3/d2/34/f3d2346a59335f12ec7b6c460177414a.jpg"
  };

  const settingsSections = [
    {
      title: 'Account',
      items: [
        {
          icon: User,
          label: 'Profile',
          route: '/settings/ProfileScreen',
        },
        {
          icon: BellIcon,
          label: 'Notifications',
          route: '/settings/NotificationsScreen',
        },
        {
          icon: Lock,
          label: 'Privacy & Security',
          route: '/settings/PrivacySecurityScreen',
        },
        {
          icon: SettingsIcon,
          label: 'App Preferences',
          route: '/settings/AppPreferencesScreen',
        },
      ],
    },
  ];

  return (
    <View className="flex-1 bg-gray-100">

      <ScrollView>
        {/* Settings Sections */}
        <View className="p-4 gap-6">
          {settingsSections.map((section, index) => (
            <View key={index} className="bg-white rounded-xl overflow-hidden">
              <Text className="text-gray-500 text-sm uppercase px-4 pt-4 pb-2">
                {section.title}
              </Text>
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity
                    key={itemIndex}
                    className="flex-row items-center px-4 py-4 border-t border-gray-100"
                    onPress={() => router.push(item.route as RelativePathString)}
                  >
                    <Icon size={20} color="#666" />
                    <Text className="flex-1 ml-3 text-gray-900">{item.label}</Text>
                    <ChevronRight size={20} color="#666" />
                  </TouchableOpacity>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
