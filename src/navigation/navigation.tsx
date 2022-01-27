import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {DepartmentScreen, HomeScreen} from '../screens';
import {iItem} from '../store/reducers/reducer';

type RootStackParamList = {
  Home: undefined;
  Department: {
    departmentData: iItem[];
    departmentTitle: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Department" component={DepartmentScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

type DepartmentProps = NativeStackScreenProps<RootStackParamList, 'Department'>;
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export type DepartmentScreenRouteProp = DepartmentProps['route'];

export type HomeNavigationProp = HomeProps['navigation'];

export default RootStack;
