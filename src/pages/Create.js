import { forwardRef, useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

import TextInput from '../components/Input';
import Select from '../components/Select';
import { GlobalContext } from '../store';
import GlobalStyles from '../helpers/GlobalStyles';
import { getParentOptionsFromRevenue, getDependenciesFromRevenue, getRevenueByCode } from '../helpers/Scripts';
import { Controller, useForm } from 'react-hook-form';

export default Create = forwardRef(({ route, navigation }, ref) => {
  const {
    state: globalState,
    add: addRevenue,
  } = useContext(GlobalContext);
  const { revenues } = globalState();
  const parentOptions = getParentOptionsFromRevenue(revenues);
  const typeOptions = [
    { label: 'Receita', value: 'receita' },
    { label: 'Despesa', value: 'despesa' }
  ];

  const generateCodeSuggestion = (value) => {
    let suggestion = '';
    const [revenue] = getDependenciesFromRevenue(revenues, { parentId: value });
    const { dependencies: dep } = revenue;

    if (dep?.length) {
      const splittedCode = dep[dep.length - 1].code.split('.');
      const increCodeNumber = (+splittedCode[splittedCode.length - 1] + 1);
      splittedCode.pop();
      suggestion = `${splittedCode.join('.')}.${increCodeNumber}`;
    } else {
      suggestion = `${revenue.code}.1`;
    }

    setValue('code', suggestion);
  }

  const [formDisabled, setFormDisabled] = useState(false);

  useEffect(() => {
    if (route?.params?.code) {
      const { code } = route.params;
      const [revenue] = getRevenueByCode(revenues, code);
      if (revenue?.dependencies) delete revenue.dependencies;
      Object.entries(revenue)
        .map(([key, value]) => setValue(key, value));
      setFormDisabled(true);
    } else {
      setValue('parentId', parentOptions[0].value);
      setValue('type', typeOptions[0].value);
      generateCodeSuggestion(parentOptions[0].value);
    }
  }, []);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      parentId: null,
      code: '',
      name: '',
      type: null,
      launch: true,
    }
  });

  const changeType = (option) => {
    const [revenue] = getRevenueByCode(revenues, option.value);
    setValue('type', revenue.type);
  }

  const onSubmit = (payload) => {
    try {
      if (!route?.params?.code) {
        addRevenue({
          payload: {
            ...payload,
            dependencies: []
          }
        });
      }
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  return (
    <View style={GlobalStyles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.fieldContainer}>
            <Select
              onChangeValue={(index) => {
                const [currentOption] = parentOptions.filter(e => e.value === index);
                changeType(currentOption);
                onChange(currentOption.value);
                generateCodeSuggestion(currentOption.value);
              }}
              value={value}
              label={'Conta pai'}
              options={parentOptions}
              disabled={formDisabled}
            />
          </View>
        )}
        name={'parentId'}
      />
      {errors.parentId && <Text style={styles.errorText}>O campo é obrigatório.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.fieldContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label={'Código'}
              keyboardType={'numeric'}
              disabled
            />
          </View>
        )}
        name={'code'}
      />
      {errors.code && <Text style={styles.errorText}>O campo é obrigatório.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.fieldContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              label={'Nome'}
              keyboardType={'text'}
              disabled={formDisabled}
            />
          </View>
        )}
        name={'name'}
      />
      {errors.name && <Text style={styles.errorText}>O campo é obrigatório.</Text>}
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.fieldContainer}>
            <Select
              onChangeValue={onChange}
              value={value}
              label={'Tipo'}
              options={typeOptions}
              disabled
            />
          </View>
        )}
        name={'type'}
      />
      {errors.type && <Text style={styles.errorText}>O campo é obrigatório.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View style={styles.fieldContainer}>
            <Select
              onChangeValue={onChange}
              value={value}
              label={'Aceita lançamento'}
              options={[
                {label: 'Sim', value: true},
                {label: 'Não', value: false}
              ]}
              disabled={formDisabled}
            />
          </View>
        )}
        name={'launch'}
      />
      {errors.launch && <Text style={styles.errorText}>O campo é obrigatório.</Text>}

      <View style={{ display: 'none' }}>
        <Button
          ref={ref}
          title={'Submit'}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
})

const styles = StyleSheet.create({
  fieldContainer: {
    width: '100%',
    marginVertical: 8,
  },
  errorText: {
    color: '#CC0000',
    alignSelf: 'flex-start',
  }
});
