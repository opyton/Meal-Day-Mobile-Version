import React from "react";
import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
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
      <TouchableWithoutFeedback
        onPress={() => navigation.navigate("Pick My Ingredients")}
      >
        <View>
          <Image
            style={styles.tinyLogo}
            source={require("../images/ByIngredient.jpg")}
          ></Image>
          <Text style={styles.centerTexts}>
            RECIPES {"\n"}
            FIND BY INGREDIENTS
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          Axios.get("https://mealday.herokuapp.com/recipes/random")
            .then((res) => {
              navigation.navigate("Surprise Me!", {
                recipeData: res.data,
              });
            })
            .catch((err) => console.log(err));
        }}
      >
        <View>
          <Image
            style={styles.tinyLogo}
            source={require("../images/Surprise.jpg")}
          ></Image>
          <Text style={styles.centerTexts}>
            SURPRISE ME! {"\n"} RECIPE OF THE DAY
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
