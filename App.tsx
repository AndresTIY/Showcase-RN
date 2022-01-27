import React from 'react';
import {Provider} from 'react-redux';
import RootStack from './src/navigation/navigation';
import store from './src/store/store';
import {ErrorWrapper, LoadingWrapper} from './src/components';

const App = () => {
  return (
    <Provider store={store}>
      <RootStack />
      <ErrorWrapper />
      <LoadingWrapper />
    </Provider>
  );
};

export default App;
