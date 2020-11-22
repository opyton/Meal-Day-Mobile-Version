import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  errorStyling: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#f05e22",
  },
  leftModalColumnTitleStyling: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#f05e22",
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tinyLogo: {
    // boxShadow: "10px 10px 4px #222222",
    width: 250,
    height: 200,
    margin: 15,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#37b34a",
  },
  centerTexts: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    // transform: "translate(-50%, -50%)",
  },
  burgerIcon: {
    marginLeft: 20,
    color: "white",
  },
  refreshIcon: {
    marginRight: 20,
    color: "white",
  },
});
export default styles;
