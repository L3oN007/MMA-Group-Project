import React, { FC } from "react";

import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

interface FontTextProps extends TextProps {
  style?: TextStyle;
}

const FontText: FC<FontTextProps> = ({ children, style, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Jakarta",
  },
});

export default FontText;
