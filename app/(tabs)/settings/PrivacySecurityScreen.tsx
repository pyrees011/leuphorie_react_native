import { View, Text, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Lock, Eye, Fingerprint, Shield, ChevronRight } from 'lucide-react-native';

export default function PrivacySecurityScreen() {
  const [settings, setSettings] = useState({
    biometrics: true,
    twoFactor: false,
    locationTracking: true,
    dataCollection: true,
    changePassword: false
  });

  const securitySections = [
    {
      title: 'Security',
      items: [
        { 
          icon: Lock,
          label: 'Change Password',
          type: 'link',
          key: 'changePassword'
        },
        { 
          icon: Fingerprint,
          label: 'Biometric Login',
          type: 'toggle',
          key: 'biometrics'
        },
        { 
          icon: Shield,
          label: 'Two-Factor Authentication',
          type: 'toggle',
          key: 'twoFactor'
        }
      ]
    },
    {
      title: 'Privacy',
      items: [
        { 
          icon: Eye,
          label: 'Location Tracking',
          type: 'toggle',
          key: 'locationTracking'
        },
        { 
          icon: Shield,
          label: 'Data Collection',
          type: 'toggle',
          key: 'dataCollection'
        }
      ]
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="p-4 gap-6">
        {securitySections.map((section, index) => (
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
                  <Text className="flex-1 text-gray-900 ml-3">{item.label}</Text>
                  {item.type === 'toggle' ? (
                    <Switch
                      value={settings[item.key as keyof typeof settings]}
                      onValueChange={(value) => 
                        setSettings(prev => ({...prev, [item.key]: value}))
                      }
                      trackColor={{ false: '#D1D5DB', true: '#90C088' }}
                    />
                  ) : (
                    <ChevronRight size={20} color="#666" />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
