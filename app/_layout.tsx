import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack 
    screenOptions = {{ 
      headerStyle: {
        backgroundColor: "#383431", 
      }, 
      headerTintColor: "#fff", 
      headerTitleStyle:{
        fontWeight: "bold", 
        fontSize: 20,
      }, 
      headerTitleAlign: "center",
      title: "PartyChess"
    }}
  />;
}
