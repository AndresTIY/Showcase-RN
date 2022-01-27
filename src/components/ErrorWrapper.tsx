import React, {useEffect, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {hideError} from '../store/actions/actions';
import {useAppDispatch, useAppSelector} from '../types/hooks';
import {BaseText} from '.';

const ErrorWrapper = () => {
  const {errorMessage} = useAppSelector(state => state);

  const dispatch = useAppDispatch();

  const timerRef = useRef<NodeJS.Timer>();

  const handleHideError = () => {
    dispatch(hideError());
  };

  useEffect(() => {
    if (errorMessage) {
      timerRef?.current && clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        dispatch(hideError());
      }, 5000);
    }
  }, [errorMessage, dispatch]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <View>
      {!!errorMessage && (
        <TouchableOpacity onPress={handleHideError} style={styles.container}>
          <BaseText fontSize="mediumPlus" error>
            {errorMessage}
          </BaseText>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 30,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    alignSelf: 'center',
    bottom: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    minHeight: 80,
  },
});

export default ErrorWrapper;
