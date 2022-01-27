import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';

import {BaseText, BlurredImage} from '../../components';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  DepartmentModalNavigationProp,
  DepartmentModalRouteProp,
} from '../../navigation/navigation';
import {splitCamelCase} from '../../utils';
import {iItem} from '../../store/reducers/reducer';

interface iScreenData {
  value: string;
  title: string;
}

const DepartmentDetail = () => {
  const {setOptions} = useNavigation<DepartmentModalNavigationProp>();
  const [screenData, setScreenData] = useState<iScreenData[] | undefined>();

  const {
    params: {departmentDetailData},
  } = useRoute<DepartmentModalRouteProp>();

  useLayoutEffect(() => {
    setOptions({
      headerTitle: departmentDetailData.objectName,
    });
  }, [setOptions, departmentDetailData]);

  useEffect(() => {
    let stored: iScreenData[] = [];

    const keysArray = Object.keys(departmentDetailData);

    keysArray.forEach(key => {
      const value = departmentDetailData[key as keyof iItem];
      if (typeof value === 'string' && value.length > 0) {
        const splitCamel = splitCamelCase(key);
        stored.push({title: splitCamel, value: value});
      }
    });
    setScreenData(stored);
  }, [departmentDetailData]);

  console.log({screenData});

  return (
    <SafeAreaView style={styles.container}>
      <BlurredImage source={departmentDetailData.primaryImageSmall} />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {screenData?.map((item, i) => (
          <View style={styles.textContainer} key={i}>
            <BaseText bold center>
              {item.title}
            </BaseText>
            <BaseText center>{item.value}</BaseText>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 20,
  },
  scrollViewContainer: {
    marginTop: 20,
    paddingBottom: 20,
  },
  imageBackgroundStyle: {
    width: 300,
    overflow: 'hidden',
    borderRadius: 10,
  },

  textContainer: {
    borderColor: 'grey',
    borderTopWidth: 1,
    paddingVertical: 5,
  },
});
export default DepartmentDetail;
