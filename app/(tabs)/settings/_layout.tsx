import { Stack } from "expo-router";
import { Text } from "react-native";
export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ 
      headerShown: false,
      contentStyle: { backgroundColor: 'white' }
    }}>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false,
          headerTitle: 'Settings',
        }} 
      />
      <Stack.Screen 
        name="ProfileScreen" 
        options={{ 
          headerShown: false,
          title: "Profile",
          headerShadowVisible: false,
        }} 
      />
      <Stack.Screen 
        name="NotificationsScreen" 
        options={{ 
          headerShown: false,
          title: "Notifications",
          headerShadowVisible: false,
        }} 
      />
      <Stack.Screen 
        name="PrivacySecurityScreen" 
        options={{ 
          headerShown: false,
          title: "Privacy & Security",
          headerShadowVisible: false,
        }} 
      />
      <Stack.Screen 
        name="AppPreferencesScreen" 
        options={{ 
          headerShown: false,
          title: "App Preferences",
          headerShadowVisible: false,
        }} 
      />
    </Stack>
  );
}
