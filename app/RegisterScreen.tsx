import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { AuthButton } from '../components/auth/AuthButton';
import { AuthInput } from '../components/auth/AuthInput';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('Ferdinand Sinaga');
  const [email, setEmail] = useState('ferdinands@gmail.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <TouchableOpacity
        className="mb-6"
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color="#666" />
      </TouchableOpacity>

      <View className="gap-2 mb-6">
        <Text className="text-2xl font-bold text-gray-900">Register</Text>
        <Text className="text-base text-gray-600">Create your account</Text>
      </View>

      <View className="gap-6">
        <View className="gap-4">
          <AuthInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
          />
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
          <AuthInput
            placeholder="Repeat Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <AuthButton
          title="Register"
          onPress={() => {}}
        />

        <View className="flex-row justify-center">
          <Text className="text-sm text-gray-600">I have an account? </Text>
          <Text
            className="text-sm text-green-600"
            onPress={() => router.replace('/LoginScreen')}
          >
            Login
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}