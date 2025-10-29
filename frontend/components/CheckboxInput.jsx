import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from "react";
import { Pressable } from "react-native";

export const CheckboxInput = ({
  label,
  checked = false,
  onChange,
  size = 12,
  color = "#4B4B4C",
  currentTheme
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggle = () => {
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  };

  return (
    <Pressable
      onPress={toggle}
      style={{ gap: 8 }}
    >
      <MaterialCommunityIcons
        name={isChecked ? "checkbox-marked" : "checkbox-blank-outline"}
        size={size}
        color={isChecked ? color : `${currentTheme === "light" ? "#6B7280" : "#FFF3EB"}`}
      />
    </Pressable>
  );
};
