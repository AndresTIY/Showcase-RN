import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ListRenderItem,
  Image,
  ImageBackground,
} from 'react-native';

import {BaseText} from '../../components';
import {iItem} from '../../store/reducers/reducer';
import {colors} from '../../styles';
import {useRoute} from '@react-navigation/native';
import {DepartmentScreenRouteProp} from '../../navigation/navigation';

const Department = () => {
  const [screenData, setScreenData] = useState<iItem[] | undefined>(undefined);

  const route = useRoute<DepartmentScreenRouteProp>();

  useEffect(() => {
    if (route.params?.departmentData) {
      setScreenData(route.params.departmentData);
    }
  }, [route.params]);

  const renderItem: ListRenderItem<iItem> = ({item}) => {
    return (
      <View style={styles.cardStyle}>
        <ImageBackground
          source={{uri: item.primaryImageSmall}}
          blurRadius={30}
          resizeMode="cover"
          style={styles.imageBackgroundStyle}>
          <Image
            source={{uri: item.primaryImageSmall}}
            resizeMode="contain"
            style={styles.cardImageStyle}
          />
        </ImageBackground>
        <View style={styles.textContainer}>
          <BaseText bold>{item.title}</BaseText>
          {!!item.artistDisplayName && (
            <BaseText>Artist: {item.artistDisplayName}</BaseText>
          )}
        </View>
      </View>
    );
  };
  const header = (
    <BaseText center fontSize="large">
      {route.params?.departmentTitle}
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
    // flex: 1,
  },
  imageBackgroundStyle: {
    width: 300,
    overflow: 'hidden',
    borderRadius: 10,
  },
  cardImageStyle: {
    width: 300,
    height: 300,
    alignSelf: 'center',
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
    // height: 40,
    paddingVertical: 10,
    justifyContent: 'center',
    width: '100%',
    // alignItems: 'center',
  },
});
export default Department;
