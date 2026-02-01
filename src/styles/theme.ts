import type { DefaultTheme } from "styled-components"

export const lightTheme: DefaultTheme = {

  appBackground: '#fff',
  appColor: '#000',
  appDefaultStroke: '#e0e0e0',
  appLogo: 'dnc-logo-black.svg',
  appSkeletonFrom: '#eee',
  appSkeletonTo: '#ccc',

  buttons: {
    alert: '#e80000',
    alertColor: '#fff',
    alertHover: '#d80000',
    disabled: '#ccc',
    disabledColor: '#666',
    primary: '#0c70f2',
    primaryColor: '#fff',
    primaryHover: '#0061de',
  },

  card: {
    alert: '#e80000',
    background: '#fff',
    border: '#e0e0e0',
    success: '#008000',
    warning: '#f7a300',
  },

  textInput: {
    active: '#fff',
    activeColor: '#000',
    borderColor: '#e0e0e0',
    disabled: '#eee',
    disabledColor: '#666',
    disabledBorderColor: '#e0e0e0',
    placeholderColor: '#666',
  },

  typographies: {
    error: '#ff0202',
    subtitle: '#666',
    success: '#008000',
  },
}

export const darkTheme: DefaultTheme = {

  appBackground: '#060b26',
  appColor: '#fff',
  appDefaultStroke: '#21497d',
  appLogo: 'dnc-logo-white.svg',
  appSkeletonFrom: '#060b26',
  appSkeletonTo: '#21497d',

  buttons: {
    alert: '#e80000',
    alertColor: '#fff',
    alertHover: '#d80000',
    disabled: '#313649',
    disabledColor: '#6d7b8e',
    primary: '#0c70f2',
    primaryColor: '#fff',
    primaryHover: '#0061de',
  },

  card: {
    alert: '#e80000',
    background: '#0f1535',
    border: '#21497d',
    success: '#008000',
    warning: '#f7a300',
  },

  textInput: {
    active: '#0f1535',
    activeColor: '#fff',
    borderColor: '#21497d',
    disabled: '#282d49',
    disabledColor: '#58677c',
    disabledBorderColor: '#2e3f55',
    placeholderColor: '#89a7ce',
  },

  typographies: {
    error: '#ff0202',
    subtitle: '#89a7',
    success: '#008000',
  },
}





