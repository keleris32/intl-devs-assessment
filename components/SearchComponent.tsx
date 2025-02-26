import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { debounce } from "lodash";
import { Search } from "lucide-react-native";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

type SearchComponentProps = {
  placeholder?: string;
  debounceDelay?: number;
  onSearch: (query: string) => void;
};

const SearchComponent: React.FC<SearchComponentProps> = ({
  placeholder = "Search...",
  debounceDelay = 300,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isFocused, setFocused] = React.useState<boolean>(false);

  const colorScheme = useColorScheme();

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

  const debouncedSearch = React.useCallback(
    debounce((query: string) => {
      onSearch(query);
    }, debounceDelay),
    [onSearch, debounceDelay]
  );

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    debouncedSearch(text);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme ?? "light"].card,
        },
      ]}
    >
      <Search size={18} color={Colors[colorScheme ?? "light"].text} />
      <TextInput
        style={[styles.input, { color: Colors[colorScheme ?? "light"].text }]}
        value={searchTerm}
        onChangeText={handleSearch}
        onBlur={() => handleBlur()}
        onFocus={handleFocus}
        placeholder={placeholder}
        placeholderTextColor={Colors[colorScheme ?? "light"].tint}
        allowFontScaling={false}
      />
    </View>
  );
};

export default SearchComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
    gap: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  input: {
    fontFamily: "Inter",
    flex: 1,
    height: "100%",
    backgroundColor: "inherit",
  },
});
