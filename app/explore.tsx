import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function Explore() {
  const [text, setText] = useState("");
  return (
    <>
    <View>
    <Text style={{ fontFamily: 'Inter-Bold', fontSize: 36, color: "black", padding: 16 }}>Explore</Text>
    <View   style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
<TextInput
  style={{ 
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    width: '90%', 
    marginTop: 20, 
    fontFamily: 'Inter-Regular',
    paddingLeft: 10,
    textAlignVertical: 'center', // Add this line
    fontSize: 16 // Add this line
  }}
  onChangeText={setText}
  value={text}
  placeholder="Search"
  multiline={true}
  returnKeyType="none"
/>
</View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>Temporary</Text>
      </View>
      </View>
      </>
  );
}
