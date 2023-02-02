import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default Button = (({ label, children, iconStyle, onPress, style }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress()}
        style={[
          { paddingHorizontal: 16 },
          style,
        ]}
      >
        {label && (
          <Text
            style={[
              iconStyle && styles.iconStyle,
            ]}
          >
            {label}
          </Text>
        )}
        {children}
      </TouchableOpacity>
    </View>
  );
})

const styles = StyleSheet.create({
  iconStyle: {
    fontSize: 36,
    fontWeight: '300',
    color: '#fff',
  },
});
