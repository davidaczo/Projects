import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';
import { SCREEN_WIDTH } from '../../constants/theme';

const SeparatorWithText = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  line: {
    marginBottom: 8,
    width: SCREEN_WIDTH - 48,
    height: 1,
    backgroundColor: COLORS.lightPurple,
    marginHorizontal: 4
  },
  text: {
    paddingHorizontal: 8,
    fontSize: 16,
    color: COLORS.darkPurple,
    fontWeight: 'bold'
  },
});

export default SeparatorWithText;
