import {createNativeStackNavigator} from "@react-navigation/native-stack";
import GoodPlansScreen from "../screens/goodPlans/GoodPlansScreen";
import GoodPlanScreen from "../screens/goodPlans/GoodPlanScreen";
import {Colors} from "../services/constants";

const GoodPlansStack = createNativeStackNavigator()

const GoodPlansStackNavigator = () => {
    return (
        <GoodPlansStack.Navigator initialRouteName="GoodPlans">
            <GoodPlansStack.Screen name="GoodPlans" component={GoodPlansScreen} options={{headerShown: false}} />
            <GoodPlansStack.Screen name="GoodPlan" component={GoodPlanScreen} options={{
                headerTransparent: true,
                headerTitle: '',
                headerBackTitleVisible: false,
                headerTintColor: Colors.primary
            }} />
        </GoodPlansStack.Navigator>
    )
}

export default GoodPlansStackNavigator
