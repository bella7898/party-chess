import { useRouter } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

import { GLOBAL_STYLES } from "../constants/styles";

export default function Home() {
  const router = useRouter();

  return (
    <View style={[GLOBAL_STYLES.container, GLOBAL_STYLES.centered]}>
      <Image style={GLOBAL_STYLES.icon} source={require('../assets/images/icon.png')} />
      <Text style={GLOBAL_STYLES.title}>Welcome to PartyChess</Text>
      <Pressable style={GLOBAL_STYLES.button} onPress={() => router.push("/chess")}>
        <Text style={GLOBAL_STYLES.text}>Play</Text>
      </Pressable>
    </View>
  );
}