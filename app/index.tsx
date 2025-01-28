import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';

// components
import { AuthButton } from '../components/auth/AuthButton';
import { SocialAuth } from '../components/auth/SocialAuth';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Let's upgrade your learning experience</Text>
          <Text style={styles.subtitle}>
            Changing the way people learn by providing an interactive, engaging, and personalized learning
          </Text>
        </View>

        <Image
          source={require('../assets/images/clefairy.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.actions}>
          <AuthButton
            title="Continue with email"
            onPress={() => {}}
          />
          <AuthButton
            title="Continue with number"
            onPress={() => {}}
          />
          <SocialAuth />
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don't have an account? </Text>
            <Text
              style={styles.footerLink}
              onPress={() => router.push('/RegisterScreen')}
            >
              Register
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    lineHeight: 24,
  },
  actions: {
    gap: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: 'black',
    fontSize: 14,
  },
  footerLink: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
