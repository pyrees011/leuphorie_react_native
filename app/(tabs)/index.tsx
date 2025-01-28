import { Text, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-white">
      <TouchableOpacity onPress={() => router.push('/questionnaire')}>
        <Text>Go to questionnaire</Text>
      </TouchableOpacity>
      <Text className="text-2xl font-bold">Initializing...</Text>
            <TouchableOpacity onPress={() => router.replace("/RegisterScreen")}>
              <Text>Don't have an account? Sign Up</Text>
            </TouchableOpacity>
    </SafeAreaView>
  );
}
