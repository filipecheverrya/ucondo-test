import { View, TextInput as ReactTextInput, StyleSheet } from 'react-native';

import Text from './Text';

export default TextInput = ({
  style,
  placeholder,
  keyboardType,
  onChangeText,
  label,
  value,
  onBlur,
  disabled,
}) => {
  return (
    <View style={{ width: '100%' }}>
      <Text inputLabel>{label}</Text>
      <ReactTextInput
        style={[
          styles.defaultInput,
          disabled && styles.disabled,
          style,
        ]}
        editable={!disabled}
        selectTextOnFocus={!disabled}
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        value={value}
        onBlur={onBlur}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  defaultInput: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    color: '#777777',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  disabled: {
    opacity: .5,
  }
});
