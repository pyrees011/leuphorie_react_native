import { View, Text, Switch, ScrollView } from 'react-native';
import { useState } from 'react';
import { Bell, MessageCircle, Calendar, Activity } from 'lucide-react-native';



export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState({
    pushEnabled: true,
    emailEnabled: false,
    remindersEnabled: true,
    updatesEnabled: true
  });

  const notificationSections = [
    {
      title: 'General',
      items: [
        { 
          icon: Bell,
          label: 'Push Notifications',
          key: 'pushEnabled',
          description: 'Receive push notifications'
        },
        { 
          icon: MessageCircle,
          label: 'Email Notifications',
          key: 'emailEnabled',
          description: 'Receive email updates'
        }
      ]
    },
    {
      title: 'Activities',
      items: [
        { 
          icon: Calendar,
          label: 'Reminders',
          key: 'remindersEnabled',
          description: 'Get reminded about tasks'
        },
        { 
          icon: Activity,
          label: 'App Updates',
          key: 'updatesEnabled',
          description: 'Receive app update notifications'
        }
      ]
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4 gap-6">
        {notificationSections.map((section, index) => (
          <View key={index} className="bg-white rounded-xl overflow-hidden">
            <Text className="text-gray-500 text-sm uppercase px-4 pt-4 pb-2">
              {section.title}
            </Text>
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon;
              return (
                <View
                  key={itemIndex}
                  className="flex-row items-center px-4 py-4 border-t border-gray-100"
                >
                  <Icon size={20} color="#666" />
                  <View className="flex-1 ml-3">
                    <Text className="text-gray-900">{item.label}</Text>
                    <Text className="text-gray-500 text-sm">{item.description}</Text>
                  </View>
                  <Switch
                    value={notifications[item.key as keyof typeof notifications]}
                    onValueChange={(value) => 
                      setNotifications(prev => ({...prev, [item.key]: value}))
                    }
                    trackColor={{ false: '#D1D5DB', true: '#90C088' }}
                  />
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
