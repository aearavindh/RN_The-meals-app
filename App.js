import React, { useState } from 'react';
import { LogBox } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import MealsNavigator from './navigation/MealsNavigator';
import mealsReducer from './store/reducers/meals';

enableScreens();

const rootReducer = combineReducers({
  meals: mealsReducer
});

const store = createStore(rootReducer);

LogBox.ignoreLogs([
  "Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).",
]);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return <AppLoading
             startAsync={fetchFonts}
             onFinish={() => setFontLoaded(true)}
             onError={()=> console.log("Error occurred")}
           />;
  }

  return <Provider store={store} ><MealsNavigator /></Provider>;
}
