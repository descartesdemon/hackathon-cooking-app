import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function RoundedButton({ title, onPress, buttonStyle = null, containerStyle = null, textStyle = null}) {
  return (
        <View style={[styles.buttonContainer, { borderWidth: 2, borderColor: "#888888", borderRadius: 10 }]}>
          <Pressable
            style={[styles.button, { backgroundColor: "#fff" }]}
            onPress={onPress}
          >
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{title}</Text>
          </Pressable>
        </View>
  
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    height: 50,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
});