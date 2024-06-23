import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function Preferences() {
  const [text, setText] = useState("");
  return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Preferences Here</Text>

        <Text>Options and dietary restrictions form</Text>
      </View>
  );
}
