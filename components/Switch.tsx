import React, { useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import Animated, {
  interpolateColor,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";
import { useSwitch } from "@/context/SwitchContext";

type SwitchComponentProps = {
  activeColor: string;
  inActiveColor: string;
};

const Switch: React.FC<SwitchComponentProps> = ({
  activeColor,
  inActiveColor,
}) => {
  const { isActive, toggleSwitch } = useSwitch();
  const switchTranslate = useSharedValue(isActive ? 24 : 4);

  useEffect(() => {
    switchTranslate.value = withSpring(isActive ? 24 : 4, {
      mass: 1,
      damping: 15,
      stiffness: 120,
    });
  }, [isActive]);

  const progress = useDerivedValue(() => {
    return withTiming(isActive ? 22 : 0);
  });

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: switchTranslate.value }],
    };
  });

  const backgroundColorStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 22],
      [inActiveColor, activeColor]
    );
    return { backgroundColor };
  });

  return (
    <TouchableWithoutFeedback onPress={toggleSwitch}>
      <Animated.View style={[styles.container, backgroundColorStyle]}>
        <Animated.View style={[styles.circle, customSpringStyles]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Switch;

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 28,
    borderRadius: 30,
    justifyContent: "center",
    backgroundColor: "#F2F5F7",
    padding: 2,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 30,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 4,
  },
});
