import React from "react";
import { Text, TextProps } from "react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

const CustomText: React.FC<TextProps> = ({ style, children, ...props }) => {
  const colorScheme = useColorScheme();
  return (
    <Text
      style={[
        style,
        {
          color: Colors[colorScheme ?? "light"].text,
        },
      ]}
      allowFontScaling={false}
      {...props}
    >
      {children}
    </Text>
  );
};

export default CustomText;
