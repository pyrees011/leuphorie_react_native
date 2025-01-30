import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// components
import { AuthButton } from '../components/auth/AuthButton';
import { SocialAuth } from '../components/auth/SocialAuth';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 py-6 justify-between">
        {/* Header Section */}
        <View className="gap-2">
          <Text className="text-2xl font-bold text-gray-900">
            Let's upgrade your learning experience
          </Text>
          <Text className="text-base text-gray-600 leading-6">
            Changing the way people learn by providing an interactive, engaging, and personalized learning
          </Text>
        </View>

        {/* Image Section */}
        <Image
          source={require('../assets/images/clefairy.png')}
          className="w-52 h-52 self-center"
          resizeMode="contain"
        />

        {/* Actions Section */}
        <View className="gap-6">
          <AuthButton
            title="Continue with email"
            onPress={() => router.push('/LoginScreen')}
          />
          <AuthButton
            title="Continue with number"
            onPress={() => {}}
          />
          <SocialAuth />
          
          {/* Footer */}
          <View className="flex-row justify-center">
            <Text className="text-sm text-gray-900">Don't have an account? </Text>
            <Text
              className="text-sm font-bold text-gray-900"
              onPress={() => router.push('/RegisterScreen')}
            >
              Register
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
