import { StyleSheet, Text as ReactText } from 'react-native';

export default Text = ({
  tintColor,
  children,
  titleHeader,
  inputLabel,
  sectionTitle,
  totalCountLabel,
  itemLabel,
  style,
}) => {
  return (
    <ReactText
      style={[
        { color: tintColor },
        titleHeader && styles.titleHeader,
        inputLabel && styles.inputLabel,
        sectionTitle && styles.sectionTitle,
        totalCountLabel && styles.totalCountLabel,
        itemLabel && styles.itemLabel,
        style,
      ]}
    >
      {children}
    </ReactText>
  );
}

const styles = StyleSheet.create({
  titleHeader: {
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    fontSize: 22,
  },
  inputLabel: {
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '700',
    color: '#6A6A6A',
    lineHeight: 22,
  },
  sectionTitle: {
    fontWeight: '400',
    fontSize: 20,
    color: '#3D3D4C',
    lineHeight: 24,
  },
  totalCountLabel: {
    fontWeight: '400',
    fontSize: 15,
    color: '#A0A0B2',
  },
  itemLabel: {
    fontWeight: '400',
    fontSize: 15,
  },
});
    