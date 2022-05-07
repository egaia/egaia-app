import { StyleSheet, Text } from 'react-native';

import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {TabsParamList} from "../services/types";
import {useSelector} from "react-redux";
import {User} from "../models/User";

export default function CollectPointsScreen({navigation}: NativeStackScreenProps<TabsParamList, "CollectPoints">) {

  const user = useSelector((state: User|null) => state)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Points de collecte</Text>
      <Text style={styles.title}>{ user !== null ? user.name : null}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
