import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import ProgramViewScreen from './src/screens/ProgramViewScreen';
import CreateProgramScreen from './src/screens/CreateProgramScreen';
import DayViewScreen from './src/screens/DayViewScreen';
import {Provider as ProgramProvider} from './src/context/ProgramContext';
import { setNavigator } from './src/navigationRef';

const stackNavigator = createStackNavigator(
  {
  Home: HomeScreen,
  ProgramView: ProgramViewScreen,
  CreateProgram: CreateProgramScreen,
  DayView: DayViewScreen
},
{
  defaultNavigationOptions: {
    title: 'My Training Log'
  }
});

const App = createAppContainer(stackNavigator);

export default () => {
  return (
    <ProgramProvider>
      <App ref={(navigator) => {setNavigator(navigator)}}/>
    </ProgramProvider>
  );
};