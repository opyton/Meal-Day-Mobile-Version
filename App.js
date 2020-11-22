import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigators/DrawerNavigator";
import PreloadingScreen from "./screens/PreloadingScreen";
import Axios from "axios";

function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    let isSubscribed = true;
    Axios.get("https://mealday.herokuapp.com/recipes/")
      .then((res) => (isSubscribed ? setLoaded(true) : null))
      .catch((err) => console.log(err));
    return () => (isSubscribed = false);
  }, []);
  if (!loaded) {
    return <PreloadingScreen />;
  } else {
    return (
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    );
  }
}

export default App;
