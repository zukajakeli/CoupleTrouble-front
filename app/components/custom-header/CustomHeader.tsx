import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import BackButton from 'app/components/back-button/BackButton';
import Ionicons from '@expo/vector-icons/Ionicons';

type Props = {
  title: string;
  iconName: string;
};

const CustomHeader = ({ title, iconName }: Props) => {
  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.titleContainer}>
        <Ionicons name={iconName} size={24} color='#caa2fe' />
        <Text style={styles.headerText}>{title}</Text>
      </View>
      <View />
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  titleContainer: { flexDirection: 'row', alignItems: 'center' },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
    color: '#030303',
    marginLeft: 8,
  },
});
