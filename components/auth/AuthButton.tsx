import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface AuthButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'primary' | 'outline';
}

export const AuthButton = ({ onPress, title, variant = 'primary' }: AuthButtonProps) => {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        variant === 'outline' ? styles.outlineButton : styles.primaryButton
      ]} 
      onPress={onPress}
    >
      <Text style={[
        styles.buttonText,
        variant === 'outline' ? styles.outlineButtonText : styles.primaryButtonText
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#AADC42',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2C2C2E',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryButtonText: {
    color: '#000',
  },
  outlineButtonText: {
    color: '#FFF',
  },
});