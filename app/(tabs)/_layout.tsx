import React from 'react';
import { Tabs } from 'expo-router';
import { Platform, View, Text, Image, TouchableOpacity } from 'react-native';

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Bell } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';

export default function TabLayout() {
  const { user } = useAuth();
  const colorScheme = useColorScheme();

  const userObject = {
    username: user?.username,
    avatar: "https://i.pinimg.com/736x/f3/d2/34/f3d2346a59335f12ec7b6c460177414a.jpg"
  };

  return (
    <View className="flex-1">
      {/* Header wrapped in SafeAreaView */}
      <SafeAreaView edges={['top']} className="bg-white pb-0 mb-0">
        <View className="flex-row items-center p-4 bg-white">
          <Image 
            source={{ uri: userObject.avatar }}
            className="w-12 h-12 rounded-full mr-3"
          />
          <View className="flex-row items-center space-x-2">
            <Text className="text-lg font-semibold">{userObject.username}</Text>
          </View>
          <TouchableOpacity className="ml-auto">
            <Bell size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* Tab Navigation */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: 'absolute',
            },
            default: {},
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="Contact"
          options={{
            title: "Contact",
            headerShown: false,
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="tasks"
          options={{
            title: 'Tasks',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="checklist" color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="gearshape.fill" color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="bubble.left.and.bubble.right.fill" color={color} />,
            headerShown: false,
          }}
        />
      </Tabs>
    </View>
  );
}
