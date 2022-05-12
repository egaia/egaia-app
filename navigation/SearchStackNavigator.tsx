import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SearchScreen from "../screens/SearchScreen";
import WasteCategoryScreen from "../screens/WasteCategoryScreen";

const SearchStack = createNativeStackNavigator()

const SearchStackNavigator = () => {
    return (
        <SearchStack.Navigator initialRouteName="Search">
            <SearchStack.Screen name="Search" component={SearchScreen} options={{
                headerShown: false
            }} />
            <SearchStack.Screen name="WasteCategory" component={WasteCategoryScreen} options={{
                headerTransparent: true,
                headerTitle: '',
                headerBackTitleVisible: false
            }} />
        </SearchStack.Navigator>
    )
}

export default SearchStackNavigator
