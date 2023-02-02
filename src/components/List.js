import { Fragment } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Button from '../components/Button';

export default List = ({ items, onPressDetail, onPressDelete }) => {
  const Item = ({ code, name, type }) => {
    return (
      <View style={styles.listItem}>
        <Button
          style={styles.buttonLabel}
          onPress={() => onPressDetail(code)}
        >
          <Text
            style={styles.itemLabel}
            itemLabel
            tintColor={type === 'despesa' ? '#E28856' : '#1BA803'}
          >
            {`${code} - ${name}`}
          </Text>
        </Button>
        <Button
          style={styles.itemButton}
          iconStyle
          onPress={() => onPressDelete(code)}
        >
          <Image
            source={require('../../assets/trash-icon.png')}
            alt="Delete icon"
          />
        </Button>
      </View>
    );
  }

  return (
    <>
      {items.map((parentProps, index) => (
        <Fragment key={parentProps.code}>
          <Item {...parentProps} index={index} />
        </Fragment>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 16,
    marginBottom: 16,
  },
  buttonLabel: {
    flexDirection: 'row',
  },
  itemLabel: {
    paddingVertical: 16,
    width: '85%',
  },
  itemButton: {
    paddingVertical: 16,
    paddingRight: 36,
    justifyContent: 'center',
    display: 'flex',
    width: '15%',
  }
});
