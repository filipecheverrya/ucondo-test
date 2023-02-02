import { useRef } from 'react';
import { Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Button from './src/components/Button';
import Text from './src/components/Text';
import Home from './src/pages/Home';
import Create from './src/pages/Create';
import { FormProvider, GlobalProvider } from './src/store';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

export default function App() {
  const submitRef = useRef(null);

  return (
    <>
      <GlobalProvider>
        <FormProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTitle: (props) => {
                  return (
                    <Text {...props} titleHeader />
                  );
                },
                headerStyle: {
                  backgroundColor: '#622490',
                },
                headerTintColor: '#fff',
              }}
            >
              <Stack.Screen
                name="Home"
                options={{
                  title: 'Plano de Contas',
                  headerRight: (props) => {
                    const navigation = useNavigation();
                    return (
                      <Button
                        {...props}
                        label={'+'}
                        iconStyle
                        onPress={() => navigation.navigate('Create')}
                      />
                    )
                  },
                }}
              >
                {(props) => <Home {...props} />}
              </Stack.Screen>
              <Stack.Screen
                name="Create"
                options={{
                  title: 'Inserir Conta',
                  headerRight: (props) => (
                    <Button
                      {...props}
                      iconStyle
                      onPress={() => submitRef.current.props.onPress()}
                    >
                      <Image source={require('./assets/insert-icon.png')} alt="Insert icon" />
                    </Button>
                  )
                }}
              >
                {(props) => <Create {...props} ref={submitRef} />}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </FormProvider>
      </GlobalProvider>
      <StatusBar style="light" />
    </>
  );
}
