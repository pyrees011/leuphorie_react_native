import { Stack } from "expo-router";

export default function ContactLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: "Contact Us" }} />
      <Stack.Screen name="EmailScreen" options={{ title: "Email Support" }} />
      <Stack.Screen name="PhoneScreen" options={{ title: "Phone Support" }} />
      <Stack.Screen name="LiveChatScreen" options={{ title: "Live Chat" }} />
      <Stack.Screen name="ContactFormScreen" options={{ title: "Send Us a Message" }} />
      <Stack.Screen name="FAQScreen" options={{ title: "FAQ" }} />
    </Stack>
  );
}
