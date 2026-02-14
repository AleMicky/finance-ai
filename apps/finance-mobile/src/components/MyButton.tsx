import React from 'react'
import { Text, Pressable, StyleSheet, type PressableProps } from "react-native";


interface Props extends PressableProps {
  title: string;
  onPress: () => void;
}

export const MyButton = ({ title, onPress, ...rest }: Props) => {
  return (
    <Pressable style={styles.primaryButton} onPress={onPress} {...rest}>
      <Text style={styles.primaryBtnText}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  primaryButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: "#1976FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  primaryBtnText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  }
});
