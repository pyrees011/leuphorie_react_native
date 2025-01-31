import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

// Icons
import { ArrowLeft } from 'lucide-react-native';

// Components
import { AuthButton } from '../components/auth/AuthButton';
import { AuthInput } from '../components/auth/AuthInput';

// Hooks
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../hooks/useAuth';

export default function RegisterScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp } = useAuth();

  const handleRegister = async () => {
    try {
      await signUp(username, email, password);
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-5">

      <View className="gap-2 mb-6">
        <Text className="text-2xl font-bold text-gray-900">Register</Text>
        <Text className="text-base text-gray-600">Create your account</Text>
      </View>

      <View className="gap-6">
        <View className="gap-4">
          <AuthInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
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
            // secureTextEntry
          />
          <AuthInput
            placeholder="Repeat Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            // secureTextEntry
          />
        </View>

        <AuthButton
          title="Register"
          onPress={handleRegister}
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