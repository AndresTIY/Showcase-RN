import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated, ActivityIndicator} from 'react-native';

import {useAppSelector} from '../types/hooks';
import {BaseText} from '.';
import {colors} from '../styles';

const LoadingWrapper = () => {
  const {dataIsLoading} = useAppSelector(state => state);

  const timerRef = useRef<NodeJS.Timer>();
  const opacityValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeIn = () => {
      Animated.timing(opacityValue, {
        toValue: 0.7,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };
    const fadeOut = () => {
      Animated.timing(opacityValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    };

    if (dataIsLoading) {
      fadeIn();
    } else {
      timerRef?.current && clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        fadeOut();
      }, 1000);
    }
  }, [dataIsLoading, opacityValue]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <Animated.View
      pointerEvents={'box-none'}
      style={[styles.container, {opacity: opacityValue}]}>
      <BaseText fontSize="mediumPlus" style={styles.loadingText}>
        Loading...
      </BaseText>
      <ActivityIndicator size="large" color="green" animating={true} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  loadingText: {
    marginBottom: 20,
    color: colors.WHITE,
  },
});

export default LoadingWrapper;
