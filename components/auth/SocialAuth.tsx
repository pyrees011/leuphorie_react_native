import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Facebook } from 'lucide-react-native';

export const SocialAuth = () => {
  return (
    <View style={styles.container}>
      <View style={styles.divider}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>Or login with</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
          {/* <Google size={20} color="#4285F4" /> */}
          <Text style={styles.socialButtonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton} onPress={() => {}}>
          <Facebook size={20} color="#1877F2" />
          <Text style={styles.socialButtonText}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#2C2C2E',
  },
  dividerText: {
    color: '#666',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    height: 48,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2C2C2E',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  socialButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
});