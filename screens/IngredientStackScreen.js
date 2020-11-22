import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Axios from "axios";
import Modal from "react-native-modal";
import {
  ScrollView,
  // Modal,
  View,
  Text,
  Button,
  TouchableHighlight,
  Image,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { useForm, Controller, useFieldArray } from "react-hook-form";

const IngredientStackScreen = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [queryMade, setQueryMade] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const { control, handleSubmit } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const DisplayRecipes = () => {
    if (recipes.length === 0 && queryMade) {
      return (
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            color: "red",
            fontWeight: "bold",
          }}
        >
          No recipes found: please select different ingredients!
        </Text>
      );
    } else if (recipes.length > 0) {
      return <Text>Items Found</Text>;
    } else {
      return (
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            color: "#37b34a",
            fontWeight: "bold",
          }}
        >
          Tap Pick My Ingredients To Begin
        </Text>
      );
    }
  };

  const onSubmit = async (data) => {
    let datum;
    try {
      datum = await data.ingredients;
      datum.push({ ingredient: data.ingredient });
    } catch {
      datum = await [{ ingredient: data.ingredient }];
    } finally {
      setLoading(true);
      setModalVisible(false);
      console.log(datum);
      Axios.post("https://mealday.herokuapp.com/recipes/byIngredient", datum)
        .then((res) => {
          setRecipes(res.data);
        })
        .then(() => {
          setQueryMade(true);
          setLoading(false);
        });
    }
  };
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#37b34a" />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1 }}>
        {/* <View> */}
        <View style={{ flex: 1 }}>
          <Modal
            // animationType="slide"
            // transparent={true}
            isVisible={modalVisible}
            onBackButtonPress={() => {
              setModalVisible(false);
            }}
            backdropOpacity={100}
            backdropColor={"white"}
            onSwipeComplete={() => setModalVisible(false)}
            swipeDirection="down"
            // onRequestClose={() => {
            //   setModalVisible(false);
            // }}
          >
            <ScrollView style={{ flex: 1 }}>
              <View style={{ alignItems: "center" }}>
                <Image source={require("../images/Mealday-logo.png")} />
                <Text style={{ fontSize: 22, color: "#37b34a" }}>
                  Enter Ingredients!{"\n"}
                </Text>
              </View>

              <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}></View>
                    <View
                      style={{
                        flex: 3,
                        flexDirection: "row",
                        justifyContent: "center",
                        padding: 10,
                        border: 3,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: "#37b34a",
                        alignItems: "center",
                      }}
                    >
                      <TextInput
                        onBlur={onBlur}
                        onChangeText={(value) => {
                          onChange(value);
                          !fields[0] ? append({ ingredient: "" }) : null;
                        }}
                        value={value}
                      />
                      <View
                        style={{
                          position: "absolute",
                          right: 10,
                        }}
                      >
                        <MaterialIcons
                          name="close"
                          size={24}
                          color="black"
                          onPress={() => onChange("")}
                        />
                      </View>

                      {/* <Button title="Delete" onPress={() => onChange("")} /> */}
                    </View>
                    <View style={{ flex: 1 }}></View>
                  </View>
                )}
                name="ingredient"
                defaultValue="test"
              />
              <View style={{ height: 5 }}></View>
              {fields.map((item, index) => (
                <View key={item.id}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}></View>
                    <View
                      style={{
                        flex: 3,
                        flexDirection: "row",
                        justifyContent: "center",
                        padding: 10,
                        border: 3,
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: "#37b34a",
                        alignItems: "center",
                      }}
                    >
                      <Controller
                        control={control}
                        render={({ onChange, onBlur, value }) => (
                          <>
                            <TextInput
                              onBlur={onBlur}
                              onChangeText={(value) => {
                                onChange(value);
                                !fields[index + 1]
                                  ? append({ ingredient: "" })
                                  : null;
                              }}
                              value={value}
                            />
                            <View
                              style={{
                                position: "absolute",
                                right: 10,
                              }}
                            >
                              <MaterialIcons
                                name="close"
                                size={24}
                                color="black"
                                onPress={() => remove(index)}
                              />
                            </View>
                            {/* <Button title="Delete" onPress={() => remove(index)} /> */}
                          </>
                        )}
                        name={`ingredients[${index}].ingredient`}
                        // rules={{ required: true }}
                        defaultValue={item.ingredient}
                      />
                    </View>
                    <View style={{ flex: 1 }}></View>
                  </View>
                  <View style={{ height: 5 }}></View>
                </View>
              ))}
              {/* <Button
                title="Append"
                onPress={() => append({ ingredient: "" })}
              /> */}
              <View style={{ flexDirection: "row", flex: 1 }}>
                <View style={{ flex: 1 }}></View>
                <View style={{ flex: 3 }}>
                  <Button
                    color="#37b34a"
                    title="Find My Recipes"
                    onPress={handleSubmit(onSubmit)}
                  />
                </View>
                <View style={{ flex: 1 }}></View>
              </View>
            </ScrollView>
          </Modal>
        </View>
        <ScrollView>{DisplayRecipes()}</ScrollView>
        <TouchableHighlight
          underlayColor="#DDDDDD"
          style={{
            justifyContent: "flex-end",
            alignItems: "center",
            bottom: 15,
          }}
        >
          <Button
            title={"Show Modal"}
            onPress={() => {
              setModalVisible(true);
            }}
          ></Button>
        </TouchableHighlight>
        {/* <Button
          title="See My Recipes"
          onPress={() => {
            Axios.get("https://mealday.herokuapp.com/recipes/random")
              .then((res) => {
                navigation.push("Recipe", {
                  recipeData: res.data,
                });
              })
              .catch((err) => console.log(err));
          }}
        ></Button> */}
      </View>
    );
  }
};

export default IngredientStackScreen;
