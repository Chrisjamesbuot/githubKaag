import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import firebase from "firebase/app";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyBBOHNuFcDbSprMbzUMu3jQpyo5aGxBvyg",
  authDomain: "kaag-1aa02.firebaseapp.com",
  projectId: "kaag-1aa02",
  storageBucket: "kaag-1aa02.appspot.com",
  messagingSenderId: "192145880916",
  appId: "1:192145880916:web:fef684f7c8cb0b6e6abac1",
  measurementId: "G-E8PYDQP5LT",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

import SplashScreen from "./Splash";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import MainScreen from "./components/Main";
import Landing from "./components/auth/Landing";
import ContributionScreen from "./components/main/Contribution";
import VocabularyScreen from "./components/main/Vocabulary";
import GrammarScreen from "./components/main/Grammar";
import WordScreen from "./components/main/Word";
import SaveScreen from "./components/main/Save";

const Stack = createStackNavigator();

// import { LogBox } from "react-native";

// LogBox.ignoreLogs(["Setting a timer"]);
export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        });
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        });
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text> Loading </Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen
              name="Splash"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="MainContribution"
              component={ContributionScreen}
              navigation={this.props.navigation}
              options={{
                title: "Post",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#8E2835",
                },
              }}
            />
            <Stack.Screen
              name="Vocabulary"
              component={VocabularyScreen}
              options={{
                title: "Vocabulary",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#8E2835",
                },
              }}
            />
            <Stack.Screen
              name="Grammar"
              component={GrammarScreen}
              options={{
                title: "Grammar",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#8E2835",
                },
              }}
            />
            <Stack.Screen
              name="Word"
              component={WordScreen}
              options={{
                title: "",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#8E2835",
                },
              }}
            />
            <Stack.Screen
              name="Save"
              component={SaveScreen}
              navigation={this.props.navigation}
              options={{
                title: "Post",
                headerTintColor: "#fff",
                headerStyle: {
                  backgroundColor: "#8E2835",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;
