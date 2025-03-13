import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

type Props = { isChecked: boolean };

const RadioButton = ({ isChecked }: Props) => {
  return (
    <>
      {isChecked ? (
        <MaterialIcons name='radio-button-on' size={24} color='#caa2fe' />
      ) : (
        <MaterialIcons name='radio-button-off' size={24} color='#caa2fe' />
      )}
    </>
  );
};

export default RadioButton;

const styles = StyleSheet.create({});
