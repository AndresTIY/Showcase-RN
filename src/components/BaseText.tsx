import React, {ReactNode} from 'react';
import {colors, typography} from '../styles';
import {Text, TextStyle} from 'react-native';

interface iBaseText {
  children: ReactNode;
  center?: boolean;
  style?: TextStyle;
  color?: string;
  error?: boolean;
  // can we use typoegraphy object keys to create a type?
  fontSize?: 'small' | 'medium' | 'mediumPlus' | 'large' | 'larger';
  bold?: boolean;
}

const BaseText: React.FC<iBaseText> = ({
  error,
  style,
  color,
  children,
  bold,
  fontSize,
  center,
}) => {
  const baseTextStyle: TextStyle = {
    color: error ? colors.ERROR_TEXT : color ? color : colors.PRIMARY_TEXT,
    fontSize: fontSize ? typography[fontSize] : typography.medium,
    ...(bold && {fontWeight: 'bold'}),
    ...(center && {textAlign: 'center'}),
  };

  return <Text style={[baseTextStyle, style]}>{children}</Text>;
};

export default BaseText;
