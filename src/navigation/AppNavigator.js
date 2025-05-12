import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import Screens
import HomeScreen from '../screens/Home';
import ChatScreen from '../screens/Chat';
import NotificationsScreen from '../screens/Notifications';
import ProfileScreen from '../screens/Profile';
import SearchScreen from '../screens/Search';
import CategoriesScreen from '../screens/Categories';
import LibraryScreen from '../screens/Library';
import GroupsScreen from '../screens/Groups';
import CalendarScreen from '../screens/Calendar';
import MyResourcesScreen from '../screens/MyResources';
import SettingsScreen from '../screens/Settings';
import HelpScreen from '../screens/Help';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Categories" component={CategoriesScreen} />
        <Stack.Screen name="Library" component={LibraryScreen} />
        <Stack.Screen name="Groups" component={GroupsScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="MyResources" component={MyResourcesScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

