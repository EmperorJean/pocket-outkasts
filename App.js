import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomNav from './components/BottomNav';

const App = () => {
  return (
    <NavigationContainer>
      <BottomNav />
    </NavigationContainer>
  );

};

export default App;