import { StyleSheet, Text } from 'react-native';

import {SafeAreaView} from "react-native-safe-area-context";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {TabsParamList} from "../services/types";
import {useSelector} from "react-redux";
import {UserProviderState} from "../store/configureStore";

export default function CollectPointsScreen({navigation}: NativeStackScreenProps<TabsParamList, "CollectPoints">) {

  const userProvider = useSelector((state: UserProviderState) => state.userProvider)
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Points de collecte</Text>
      <Text style={styles.title}>{userProvider.user.name}</Text>
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
