import { Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <TouchableOpacity onPress={() => router.push('/questionnaire')}>
        <Text>Go to questionnaire</Text>
      </TouchableOpacity>
      <Text className="text-2xl font-bold">Initializing...</Text>
    </SafeAreaView>
  );
}
