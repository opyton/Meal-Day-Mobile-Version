import React from "react";
import HomeScreen from "../screens/HomeScreen";
import IngredientDetailScreen from "../screens/IngredientRecipeListScreen";
import RandomScreen from "../screens/RecipeScreen";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "../styles";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import Axios from "axios";

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
      />
      <DrawerItem
        label="Pick My Ingredients"
        onPress={() => props.navigation.navigate("Pick My Ingredients")}
      />
      <DrawerItem
        label="Surprise Me!"
        onPress={() => {
          Axios.get("https://mealday.herokuapp.com/recipes/random")
            .then((res) => {
              props.navigation.navigate("Surprise Me!", {
                recipeData: res.data,
              });
            })
            .catch((err) => console.log(err));
        }}
      />
    </DrawerContentScrollView>
  );
}

const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      edgeWidth={200}
    >
      <Drawer.Screen name="Home" component={HomeScreen} options={homeOptions} />
      <Drawer.Screen
        name="Pick My Ingredients"
        component={IngredientDetailScreen}
        options={homeOptions}
      />
      <Drawer.Screen
        name="Surprise Me!"
        component={RandomScreen}
        options={homeOptions}
      />
    </Drawer.Navigator>
  );
};

const homeOptions = ({ navigation }) => {
  return {
    headerTitle: "Meal Day",
    headerStyle: {
      backgroundColor: "#37b34a",
    },
    headerTintColor: "white",
    headerTitleAlign: "center",
    headerLeft: () => (
      <MaterialIcons
        style={styles.burgerIcon}
        name="menu"
        size={24}
        color="black"
        onPress={() => navigation.openDrawer()}
      />
    ),
  };
};

const otherOptions = ({ navigation }) => {
  return {
    headerTitle: "Meal Day",
    headerStyle: {
      backgroundColor: "#37b34a",
    },
    headerTintColor: "white",
    headerTitleAlign: "center",
    headerLeft: () => (
      <MaterialIcons
        style={styles.burgerIcon}
        name="menu"
        size={24}
        color="black"
        onPress={() => navigation.openDrawer()}
      />
    ),
    headerRight: () => (
      <MaterialIcons
        style={styles.refreshIcon}
        name="refresh"
        size={24}
        color="black"
        onPress={() => {
          Axios.get("https://mealday.herokuapp.com/recipes/random")
            .then((res) => {
              navigation.navigate("Surprise Me!", {
                recipeData: res.data,
              });
            })
            .catch((err) => console.log(err));
        }}
      />
    ),
  };
};

export default DrawerNavigator;
