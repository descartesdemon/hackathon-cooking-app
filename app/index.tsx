import { Text, View, TextInput, Button, TouchableOpacity } from "react-native";
import React, { useState } from "react";

export default function Index() {
  const [text, setText] = useState("");
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>What are you craving?</Text>
      <TextInput
      style={{ height: 70, borderColor: 'gray', borderWidth: 1, width: '80%', marginTop: 20 }}
      onChangeText={setText}
      value={text}
      placeholder="Enter list of items"
      multiline={true}
      returnKeyType="none"
    />
      <View style={{ marginTop: 20, width: '80%', backgroundColor: 'green' }}>
        <Button
          title="Scan Ingredients"
          color="#fff"
          onPress={() => console.log('Button pressed')}
        />
      </View>
      <TouchableOpacity onPress={() => console.log('test')} style={{ marginTop: 20 }}>
        <Text style={{ color: 'blue' }}>Type your ingredients instead...</Text>
      </TouchableOpacity>
    </View>
  );
}
