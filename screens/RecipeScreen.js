import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "../styles";
import _ from "lodash";
import Axios from "axios";
import { RefreshControl } from "react-native";

const RecipeScreen = ({ navigation, route }) => {
  const displayInstructions = (rando) => {
    try {
      return rando.analyzedInstructions[0].steps.map((n, index) => (
        <Text key={index}>
          {n.step}
          {"\n"}
        </Text>
      ));
    } catch {
      return <Text>Sorry Error</Text>;
    }
  };
  const IngredientsList = (rando) =>
    rando.extendedIngredients.map((n, index) => (
      <View key={index} style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Text>{_.capitalize(n.name)}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text>
            {_.round(n.amount, 2)} {n.unit}
          </Text>
        </View>
      </View>
    ));

  const getCalories = (rando) => {
    return parseInt("40");
    // return rando.summary
    //   .substring(0, rando.summary.indexOf("<a"))
    //   .replaceAll("<b>", "")
    //   .replaceAll("</b>", "")
    //   .replaceAll(".", "")
    //   .replaceAll(",", "")
    //   .split(" ")[
    //   rando.summary
    //     .substring(0, rando.summary.indexOf("<a"))
    //     .replaceAll("<b>", "")
    //     .replaceAll("</b>", "")
    //     .replaceAll(".", "")
    //     .replaceAll(",", "")
    //     .split(" ")
    //     .indexOf("calories") - 1
    // ];
  };
  const DisplayAllData = (rando) => (
    <>
      <Text style={styles.modalTitle}>{rando.title}</Text>

      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          style={{
            height: 200,
            width: 200,
          }}
          source={{ uri: rando.image }}
        />
      </View>
      <Text>
        Sample Summary
        {/* {rando.summary
                  .substring(0, rando.summary.indexOf("<a"))
                  .replaceAll("<b>", "")
                  .replaceAll("</b>", "")
                  .replace("spoonacular", "Meal Day")} */}
        {"\n"}
      </Text>
      <Text>Serving Size: {rando.servings}</Text>
      <Text>Calories per Serving: {getCalories(rando)}</Text>
      <Text>
        Ready In: {rando.readyInMinutes} minutes {"\n"}
      </Text>

      <Text style={styles.leftModalColumnTitleStyling}>Ingredients</Text>
      {IngredientsList(rando)}
      <Text>{"\n"}</Text>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Directions</Text>
      <View>{displayInstructions(rando)}</View>
    </>
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    Axios.get("https://mealday.herokuapp.com/recipes/random")
      .then((res) => {
        setRefreshing(false);
        navigation.navigate("Surprise Me!", {
          recipeData: res.data,
        });
      })
      .catch((err) => console.log(err));
  }, []);
  try {
    if (route.params.recipeData) {
      return (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ flex: 1, margin: 15 }}
        >
          {DisplayAllData(route.params.recipeData)}
        </ScrollView>
      );
    }
  } catch (err) {
    console.log(err);
    return (
      <View>
        <Text style={styles.errorStyling}>
          There was an error in showing the recipe. Please reload and try again
        </Text>
      </View>
    );
  }
};

export default RecipeScreen;
