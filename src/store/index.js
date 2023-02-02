import { createContext, useReducer } from 'react';
import { deleteRevenue, setRevenueOnList } from '../helpers/Scripts';

const initialGlobalState = {
  revenues: [
    {
      code: '1',
      name: 'Receitas',
      type: 'receita',
      launch: false,
      dependencies: [],
    },
    {
      code: '2',
      name: 'Despesas',
      type: 'despesa',
      launch: false,
      dependencies: [],
    },
  ],
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      const revenuesOnList = setRevenueOnList(state.revenues, action.payload);
      return {
        ...state,
        revenuesOnList,
      };
    case 'delete':
      // const list = deleteRevenue(state.revenues, action.payload);
      return {
        ...state,
      };
    case 'clear':
      return initialGlobalState;
    default:
      return state;
  }
}

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, initialGlobalState);
  const values = {
    state: () => state,
    add: ({ payload }) => dispatch({ type: 'add', payload }),
    remove: ({ payload }) => dispatch({ type: 'delete', payload }),
  }
  return (
    <GlobalContext.Provider value={values}>
      {children}
    </GlobalContext.Provider>
  );
}

const initialFormState = {
  parentId: '',
  code: '',
  name: '',
  type: '',
  launch: false,
  dependencies: []
}

const formReducer = (state, action) => {
  switch (action.type) {
    case 'edit':
      return {
        ...state,
        [action.field]: action.payload,
      }
  
    default:
      return state;
  }
}

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const values = {
    state: () => state,
    edit: ({ field, payload }) => {
      dispatch({
        type: 'edit',
        field,
        payload,
      });
    }
  }
  return (
    <FormContext.Provider value={values}>
      {children}
    </FormContext.Provider>
  );
}