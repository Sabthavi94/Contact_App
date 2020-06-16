import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddNewContactScreen from './screens/AddNewContactScreen';
import EditContactScreen from './screens/EditContactScreen';
import ViewContactScreen from './screens/ViewContactScreen';
import { HeaderBackButton } from '@react-navigation/stack';


const Stack = createStackNavigator();

export default class App extends React.Component {
  
  render(){
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Home" 
      screenOptions={{
        headerTintColor:"#fff",
        headerStyle:{
          backgroundColor:"#b83227"
        },
        headerTitleStyle:{
          color:"#fff"
        }
      }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{title:"Contact App"}} />
        <Stack.Screen name="AddNewContact" component={AddNewContactScreen} options={{title:"Contact App" }} />
        <Stack.Screen name="EditContact" component={EditContactScreen} options={{title:"Edit Contact"}} />
        <Stack.Screen name="ViewContact" component={ViewContactScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
