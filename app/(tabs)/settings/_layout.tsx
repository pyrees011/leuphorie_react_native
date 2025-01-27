import { Stack } from "expo-router";

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen name="index" options={{ title: "Settings" }} />
      <Stack.Screen name="ProfileScreen" options={{ title: "Profile" }} />
      <Stack.Screen name="NotificationsScreen" options={{ title: "Notifications" }} />
      <Stack.Screen name="PrivacySecurityScreen" options={{ title: "Privacy & Security" }} />
      <Stack.Screen name="AppPreferencesScreen" options={{ title: "App Preferences" }} />
    </Stack>
  );
}
