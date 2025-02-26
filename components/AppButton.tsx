import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Platform,
  Text,
  ActivityIndicator,
} from "react-native";

import CustomText from "./CustomText";

type ButtonProps = {
  contentContainerStyle: any;
  label: string;
  labelStyle?: any;
  onPress: () => void;
  imageIcon?: ImageSourcePropType;
  disabled?: boolean;
  loading?: boolean;
  disabledColor?: string;
};

const AppButton: React.FC<ButtonProps> = ({
  contentContainerStyle,
  label,
  labelStyle,
  onPress,
  imageIcon,
  disabled = false,
  loading = false,
  disabledColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        contentContainerStyle,
        disabled && {
          backgroundColor: disabledColor ? disabledColor : "#918FB2",
        },
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {imageIcon && <Image source={imageIcon} style={styles.imageIconStyle} />}
      {loading && <ActivityIndicator size={"small"} color={"#53470C"} />}
      <Text
        style={{
          alignItems: "center",
          fontWeight: Platform.OS === "android" ? "700" : "600",
          ...labelStyle,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 55,
    borderRadius: 10,
    gap: 10,
  },
  imageIconStyle: {
    position: "absolute",
    width: 20,
    height: 20,
    left: 40,
  },
});
