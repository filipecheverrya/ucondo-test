import { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import Text from './Text';

export default Select = ({
  style,
  placeholder,
  onChangeValue,
  options,
  label,
  value = null,
  disabled,
}) => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);

  return (
    <View>
      <Text inputLabel>
        {label}
      </Text>
      <DropDownPicker
        style={[
          { borderColor: '#FFF', borderRadius: 10, zIndex: 8 },
          disabled && { opacity: .5 },
          style,
        ]}
        placeholder={placeholder}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(callback) => onChangeValue(callback())}
        setItems={setItems}
        onChangeValue={onChangeValue}
        textStyle={{
          color: '#777777',
        }}
        disabled={disabled}
      />
    </View>
  );
}