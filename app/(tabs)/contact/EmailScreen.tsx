import { View, Text } from "react-native";

const EmailScreen = () => {
  return (
    <View className="flex-1 bg-white p-5 items-center justify-center">
      <Text className="text-xl font-semibold">Support Email</Text>
      <Text className="text-lg text-gray-600">support@example.com</Text>
      <Text className="text-lg text-gray-600">help@example.com</Text>
    </View>
  );
};

export default EmailScreen;
