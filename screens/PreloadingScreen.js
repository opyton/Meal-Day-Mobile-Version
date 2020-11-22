import * as React from "react";
import { Image, View } from "react-native";
import * as Animatable from "react-native-animatable";
import styles from "../styles";
import { ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <>
      <View style={styles.loadingScreen}>
        <Animatable.View
          animation="pulse"
          easing="ease-out"
          iterationCount="infinite"
          style={{ textAlign: "center" }}
        >
          <Image
            source={require("../images/Mealday-small-logo.png")}
            style={{ width: 150, height: 150 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </Animatable.View>
      </View>
    </>
  );
};

export default LoadingScreen;
