import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export const COLORS = {
  lightSquare: "#ebebd6",
  darkSquare: "#749354",
  selected: "#ffeb3b",
  legalDot: "rgba(0,0,0,0.4)",
  legalRing: "rgba(0,0,0,0.3)",
};

export const GLOBAL_STYLES = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#423E3B",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 16, 
    color: "#FFFFFF",
  },
  icon:{
    height: 100, 
    width: 100, 
    margin: 10, 
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: "#FFFFFF",
  },
  button:{
    fontSize: 18, 
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: COLORS.darkSquare,
    padding: 10, 
    width: width * 0.9,
  }, 
  modalBackground:{
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center', 
  }, 
  popupContainer: {
    backgroundColor: 'white',
    padding: 10,
    height: height * 0.5,
    width: width * 0.8,
    borderRadius: 5,
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  popupButton:{
    width: width * 0.6,
    fontSize: 18, 
    borderRadius: 10,
    justifyContent: "center",
    backgroundColor: COLORS.darkSquare,
    paddingBottom: 10, 
  },
  popupText:{
    fontSize: 20,
    textAlign: "center",
    paddingTop: 10,
  }
});