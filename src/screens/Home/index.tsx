import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, TouchableOpacity} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../types/hooks';
import {getData, showError} from '../../store/actions/actions';
import {BaseText} from '../../components';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../styles';
import {HomeNavigationProp} from '../../navigation/navigation';

const Home = () => {
  const [departmentNames, setDepartmentNames] = useState<string[]>([]);
  const [showErrorButton, setShowErrorButton] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const {data} = useAppSelector(state => state);

  const {navigate} = useNavigation<HomeNavigationProp>();

  useEffect(() => {
    if (!data?.length) {
      dispatch(getData());
    }
  }, [dispatch, data]);

  useEffect(() => {
    let departmentNamesCollection: string[] = [];
    if (data.length) {
      data.forEach(item => {
        if (!departmentNamesCollection.includes(item.department)) {
          departmentNamesCollection.push(item.department);
        }
      });
      setDepartmentNames(departmentNamesCollection);
    }
  }, [data]);

  const handleNavigate = (departmentTitle: string) => {
    const departmentData = data.filter(
      name => name.department === departmentTitle,
    );
    navigate('Department', {departmentData, departmentTitle});
  };

  const errorButton = (
    <TouchableOpacity
      onPress={() => dispatch(showError('Something Went Wrong'))}
      style={styles.errorButton}>
      <BaseText error>Show Error</BaseText>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BaseText center fontSize="large">
        The Metropolitan Museum of Art Collection API
      </BaseText>
      <BaseText style={styles.textSpacing} fontSize="mediumPlus" bold>
        Departments
      </BaseText>
      {departmentNames?.map(name => {
        return (
          <TouchableOpacity
            key={name}
            onPress={() => handleNavigate(name)}
            style={styles.listItem}>
            <BaseText>{name}</BaseText>
            <BaseText fontSize="mediumPlus">{'>'}</BaseText>
          </TouchableOpacity>
        );
      })}
      {showErrorButton && errorButton}
      <TouchableOpacity
        onPress={() => setShowErrorButton(!showErrorButton)}
        style={styles.hiddenButton}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },

  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 10,
    shadowOffset: {
      width: 10,
      height: 3,
    },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 5,
  },
  textSpacing: {
    marginVertical: 20,
  },
  errorButton: {
    padding: 40,
  },
  hiddenButton: {
    width: '100%',
    height: 70,
  },
});
export default Home;
