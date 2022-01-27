import React from 'react';
import {ImageBackground, Image, StyleSheet} from 'react-native';

interface iBlurredImage {
  source: string;
}

const BlurredImage: React.FC<iBlurredImage> = ({source}) => {
  return (
    <ImageBackground
      source={{uri: source}}
      blurRadius={30}
      resizeMode="cover"
      style={styles.imageBackgroundStyle}>
      <Image
        source={{uri: source}}
        resizeMode="contain"
        style={styles.cardImageStyle}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
});

export default BlurredImage;
