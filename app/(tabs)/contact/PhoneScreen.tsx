import { View, Text } from "react-native";

const PhoneScreen = () => {
  return (
    <View className="flex-1 bg-white p-5 items-center justify-center">
      <Text className="text-xl font-semibold">Phone Support</Text>
      <Text className="text-lg text-gray-600">+1 (234) 567-8900</Text>
    </View>
  );
};

export default PhoneScreen;
