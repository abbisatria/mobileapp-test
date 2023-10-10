import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FeedScreen from './screens/FeedScreen';
import PostDetailScreen from './screens/PostDetailScreen';
import {RootStackParamType, routesEnum} from './types/rootStackParam';
import GlobalProvider from './contexts/GlobalState';

const Stack = createNativeStackNavigator<RootStackParamType>();

function App() {
  return (
    <GlobalProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={routesEnum.FEED_PAGE}>
          <Stack.Screen
            name={routesEnum.FEED_PAGE}
            component={FeedScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={routesEnum.POST_DETAIL_PAGE}
            component={PostDetailScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalProvider>
  );
}

export default App;
