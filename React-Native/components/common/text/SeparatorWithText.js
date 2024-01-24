import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';
import { SCREEN_WIDTH } from '../../../constants/theme';

const SeparatorWithText = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {text &&
        <Text style={styles.text}>{text}</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  line: {
    marginBottom: 12,
    height: 1,
    backgroundColor: COLORS.secondaryLight,
    marginHorizontal: 4
  },
  text: {
    paddingHorizontal: 8,
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: 'bold'
  },
});

export default SeparatorWithText;
