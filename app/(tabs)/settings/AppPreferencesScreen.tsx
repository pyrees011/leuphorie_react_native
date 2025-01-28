import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Moon, Sun, Palette, Globe, Volume2 } from 'lucide-react-native';

export default function AppPreferencesScreen() {
  const preferenceSections = [
    {
      title: 'Appearance',
      items: [
        { 
          icon: Palette,
          label: 'Theme',
          value: 'Light'
        },
        { 
          icon: Sun,
          label: 'Dark Mode',
          value: 'Off'
        }
      ]
    },
    {
      title: 'App Settings',
      items: [
        { 
          icon: Globe,
          label: 'Language',
          value: 'English'
        },
        { 
          icon: Volume2,
          label: 'Sound Effects',
          value: 'On'
        }
      ]
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4 gap-6">
        {preferenceSections.map((section, index) => (
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
                >
                  <Icon size={20} color="#666" />
                  <Text className="flex-1 text-gray-900 ml-3">{item.label}</Text>
                  <Text className="text-gray-600">{item.value}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
