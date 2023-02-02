import { useContext } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { GlobalContext } from '../store';
import Text from '../components/Text';
import GlobalStyles from '../helpers/GlobalStyles';
import { getListFromRevenues } from '../helpers/Scripts';
import List from '../components/List';

export default Home = ({ navigation }) => {
  const { state: globalState, remove: removeRevenue } = useContext(GlobalContext);
  const { revenues } = globalState();
  const listRevenues = getListFromRevenues(revenues);

  const onPressDeleteItem = (code) => {
    removeRevenue({ payload: code });
    Alert.alert('Feature not working');
    return null;
  }
  
  const onPressDetailsItem = (code) => {
    navigation.navigate('Create', { code });
  }

  return (
    <View style={GlobalStyles.container}>
      <View style={styles.sectionHeader}>
        <Text
          style={styles.sectionTitle}
          sectionTitle
        >
          Listagem
        </Text>
        <Text totalCountLabel>
          {`${listRevenues.length} Registros`}
        </Text>
      </View>
      <View style={styles.listContainer}>
        <List
          items={listRevenues}
          onPressDetail={onPressDetailsItem}
          onPressDelete={onPressDeleteItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    alignSelf: 'flex-start',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  listContainer: {
    marginTop: 24,
    alignSelf: 'flex-start',
    width: '100%',
  },
});