import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {DepartmentScreen, HomeScreen, DepartmentModal} from '../screens';
import {iItem} from '../store/reducers/reducer';

type RootStackParamList = {
  Home: undefined;
  Department: {
    departmentData: iItem[];
    departmentTitle: string;
  };
  DepartmentModal: {
    departmentDetailData: iItem;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Department" component={DepartmentScreen} />
      <Stack.Screen
        options={{
          presentation: 'modal',
        }}
        name="DepartmentModal"
        component={DepartmentModal}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

//props
type DepartmentProps = NativeStackScreenProps<RootStackParamList, 'Department'>;
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
type DepartmentModalProps = NativeStackScreenProps<
  RootStackParamList,
  'DepartmentModal'
>;
//route props
export type DepartmentScreenRouteProp = DepartmentProps['route'];
export type DepartmentModalRouteProp = DepartmentModalProps['route'];
//navigation props
export type HomeNavigationProp = HomeProps['navigation'];
export type DepartmentScreenNavigationProp = DepartmentProps['navigation'];
export type DepartmentModalNavigationProp = DepartmentModalProps['navigation'];

export default RootStack;
