import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

type Props = {
  label: string;
  onPress: () => void;
  style?: any;
  disabled?: boolean;
};

const Button = ({ label, style, onPress, disabled }: Props) => {
  return (
    <Pressable
      onPress={disabled ? () => {} : onPress}
      style={[styles.container, style, disabled && { opacity: 0.5 }]}>
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#caa2fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '600',
    lineHeight: 20,
  },
});
