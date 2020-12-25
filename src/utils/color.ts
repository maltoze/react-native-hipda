import Color from 'color';

const rgbHexLength = 7;

export const formatColor = (color: string) => {
  if (color.startsWith('#') && color.length < rgbHexLength) {
    return color.padEnd(rgbHexLength, '0');
  }
  return color.toLowerCase();
};

export const isValidColor = (color: string | number) => {
  try {
    Color(color);
    return true;
  } catch {
    return false;
  }
};
