import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function Explore() {
  const [text, setText] = useState("");
  return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Temporary</Text>
      </View>
  );
}
