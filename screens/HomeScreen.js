import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../styles";
import Axios from "axios";

export default function HomeScreen({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View>
        <Image
          style={styles.tinyLogo}
          source={require("../images/ByIngredient.jpg")}
        ></Image>
        <Text
          onPress={() => navigation.navigate("Pick My Ingredients")}
          style={styles.centerTexts}
        >
          RECIPES {"\n"}
          FIND BY INGREDIENTS
        </Text>
      </View>
      <View>
        <Image
          style={styles.tinyLogo}
          source={require("../images/Surprise.jpg")}
        ></Image>
        <Text
          onPress={() => {
            Axios.get("https://mealday.herokuapp.com/recipes/random")
              .then((res) => {
                navigation.navigate("Surprise Me!", {
                  recipeData: res.data,
                });
              })
              .catch((err) => console.log(err));
          }}
          style={styles.centerTexts}
        >
          SURPRISE ME! {"\n"} RECIPE OF THE DAY
        </Text>
      </View>
    </View>
  );
}
