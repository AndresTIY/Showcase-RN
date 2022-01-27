import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';

import {BaseText, BlurredImage} from '../../components';
import {iItem} from '../../store/reducers/reducer';
import {colors} from '../../styles';
import {useRoute, useNavigation} from '@react-navigation/native';
import {
  DepartmentScreenRouteProp,
  DepartmentScreenNavigationProp,
} from '../../navigation/navigation';

const Department = () => {
  const [screenData, setScreenData] = useState<iItem[] | undefined>(undefined);

  const {
    params: {departmentData, departmentTitle},
  } = useRoute<DepartmentScreenRouteProp>();
  const {navigate} = useNavigation<DepartmentScreenNavigationProp>();

  useEffect(() => {
    if (departmentData) {
      setScreenData(departmentData);
    }
  }, [departmentData]);

  const renderItem: ListRenderItem<iItem> = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigate('DepartmentModal', {departmentDetailData: item})
        }
        style={styles.cardStyle}>
        <BlurredImage source={item.primaryImageSmall} />
        <View style={styles.textContainer}>
          <BaseText bold>{item.title}</BaseText>
          {!!item.artistDisplayName && (
            <BaseText>Artist: {item.artistDisplayName}</BaseText>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  const header = (
    <BaseText center fontSize="large">
      {departmentTitle}
    </BaseText>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={screenData}
        renderItem={renderItem}
        ListHeaderComponent={header}
        keyExtractor={item => item.objectID.toString()}
      />
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
  flatListContainer: {
    marginTop: 20,
  },
  cardStyle: {
    backgroundColor: colors.WHITE,
    borderColor: 'grey',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  textContainer: {
    paddingVertical: 10,
    justifyContent: 'center',
    width: '100%',
  },
});
export default Department;
