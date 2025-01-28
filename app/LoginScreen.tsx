import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { AuthButton } from '../components/auth/AuthButton';
import { AuthInput } from '../components/auth/AuthInput';
import { SocialAuth } from '../components/auth/SocialAuth';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('ferdinands@gmail.com');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white p-5">

      <View className="gap-1 mb-6">
        <Text className="text-2xl font-bold text-gray-900">Leuphorie</Text>
        <Text className="text-base text-gray-600">Sign in to your Account</Text>
      </View>

      <View className="gap-6">
        <View className="gap-4">
          <AuthInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <AuthInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity>
          <Text className="text-sm text-green-600 text-right">Forgot Password?</Text>
        </TouchableOpacity>

        <AuthButton
          title="Login"
          onPress={() => router.replace('/(tabs)')}
        />

        <SocialAuth />

        <View className="flex-row justify-center">
          <Text className="text-sm text-gray-600">Don't have an account? </Text>
          <Text
            className="text-sm text-green-600"
            onPress={() => router.replace('/RegisterScreen')}
          > 
            Register
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}