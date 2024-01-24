import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window")

const COLORS = {
  green: "#9b9a4c",
  greenLight: "#bcbc77",
  secondary: "#312651",
  secondaryLight: "#444262",
  orange: "#FF7754",
  gray: "#83829A",
  lightGray: "#f8f6f7",

  white: "#FFFFFF",
  lightWhite: "#F3F4F8",

  red: '#FF0000',

  textBlack: '#313131',
  textGray: '#919191',
  borderGray: '#E4E4E4'

};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};



export { COLORS, FONT, SIZES, SHADOWS, SCREEN_WIDTH, SCREEN_HEIGHT };
