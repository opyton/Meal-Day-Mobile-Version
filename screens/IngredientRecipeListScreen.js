import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IngredientScreen from "./IngredientStackScreen";
import RecipeScreen from "./RecipeScreen";

const IngredientRecipeListScreen = ({ route, navigation }) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Ingredients" component={IngredientScreen} />
      <Stack.Screen name="Recipe" component={RecipeScreen} />
    </Stack.Navigator>
  );
};

export default IngredientRecipeListScreen;
