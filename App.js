import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import { colors, width } from './src/constants/constants';


//screen imports
import Home from './src/screens/home';
import Login from './src/screens/login';
import Register from './src/screens/register';
import Mobile from './src/screens/mobile';
import Otp from './src/screens/otp';
import Scratch from './src/screens/scratch';
import Team from './src/screens/team';
import Plan from './src/screens/plan';
import Rewards from './src/screens/rewards';
import Utilities from './src/screens/utilties';
import Sidebar from './src/components/sidebar';
import Profile from './src/screens/profile';
import Parent from './src/screens/parent';
import Contact from './src/screens/contact';
import Transfer from './src/screens/transfer';
import Balance from './src/screens/balance';
import Statements from './src/screens/statements';
import Change from './src/screens/change';
import Editprofile from './src/screens/editprofile';
import Purchase from './src/screens/purchase';
import Donation from './src/screens/donation';
import Insurance from './src/screens/insurance';
import Loan from './src/screens/loan';
import persisted from './src/reducer';
import Splash from './src/screens/splash';
import Success from './src/screens/success';
import ResetOtp from './src/screens/resetotp';
import Bankdetails from './src/screens/bankdetails';
import Slideone from './src/screens/slideone';
import Slidetwo from './src/screens/slidetwo';
import Slidethree from './src/screens/slidethree';
import Slide from './src/screens/slide';
import Activate from './src/screens/activate';
import Web from './src/screens/web';
import Premium from './src/screens/premium';
import Subutility from './src/screens/subutility';
import BussinessLoan from './src/screens/bussineslead';
import Development from './src/screens/development';
import Leadform from './src/screens/leadform';
import HousingLoan from './src/screens/housingloan';
import Salaried from './src/screens/salaried';
import Devlead from './src/screens/devlead';
import Methods from './src/screens/methods';
import Upload from './src/screens/upload';


//navigators
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator();


//store creation
const middlewares = [];

//flipper middleware
if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
  // require('react-native').unstable_enableLogBox();
}

const store = createStore(persisted, applyMiddleware(...middlewares))
const persist = persistStore(store)

const Drawernav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      drawerStyle={{
        width: width * .7,
      }}
      drawerContentOptions={{
        activeTintColor: colors.primary,
      }}
      drawerContent={(props) => <Sidebar {...props} />}
    >
      <Drawer.Screen options={{ headerShown: false }} name="main" component={Home} />
      <Drawer.Screen options={{ headerShown: false }} name="contact" component={Contact} />
      <Drawer.Screen options={{ headerShown: false }} name="transfer" component={Transfer} />
      <Drawer.Screen options={{ headerShown: false }} name="balance" component={Balance} />
      <Drawer.Screen options={{ headerShown: false }} name="change" component={Change} />
      <Drawer.Screen options={{ headerShown: false }} name="editprofile" component={Editprofile} />
      <Drawer.Screen options={{ headerShown: false }} name="purchase" component={Purchase} />
    </Drawer.Navigator>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persist}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none" initialRouteName="splash">
            <Stack.Screen name="home" component={Drawernav} />
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="register" component={Register} />
            <Stack.Screen name="mobile" component={Mobile} />
            <Stack.Screen name="otp" component={Otp} />
            <Stack.Screen name="scratch" component={Scratch} />
            <Stack.Screen name="team" component={Team} />
            <Stack.Screen name="plan" component={Plan} />
            <Stack.Screen name="rewards" component={Rewards} />
            <Stack.Screen name="utilities" component={Utilities} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="parent" component={Parent} />
            <Stack.Screen name="statements" component={Statements} />
            <Stack.Screen name="donation" component={Donation} />
            <Stack.Screen name="insurance" component={Insurance} />
            <Stack.Screen name="loan" component={Loan} />
            <Stack.Screen name="splash" component={Splash} />
            <Stack.Screen name="success" component={Success} />
            <Stack.Screen name="resetotp" component={ResetOtp} />
            <Stack.Screen name="bankdetails" component={Bankdetails} />
            <Stack.Screen name="slideone" component={Slideone} />
            <Stack.Screen name="slidetwo" component={Slidetwo} />
            <Stack.Screen name="slidethree" component={Slidethree} />
            <Stack.Screen name="slide" component={Slide} />
            <Stack.Screen name="activate" component={Activate} />
            <Stack.Screen name="web" component={Web} />
            <Stack.Screen name="premium" component={Premium} />
            <Stack.Screen name="subutility" component={Subutility} />
            <Stack.Screen name="bussinessloan" component={BussinessLoan} />
            <Stack.Screen name="housingloan" component={HousingLoan} />
            <Stack.Screen name="development" component={Development} />
            <Stack.Screen name="leadform" component={Leadform} />
            <Stack.Screen name="salaried" component={Salaried} />
            <Stack.Screen name="devlead" component={Devlead} />
            <Stack.Screen name="methods" component={Methods} />
            <Stack.Screen name="upload" component={Upload} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
};

export default App;
