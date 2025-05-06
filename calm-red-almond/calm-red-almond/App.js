import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RouteComparisonScreen from './screens/RouteComparisonScreen';
import OptimizationEngineScreen from './screens/OptimizationEngineScreen';
import DisruptionModelingScreen from './screens/DisruptionModelingScreen';
import TransportCostScreen from './screens/TransportCostScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="Route Comparison"
          component={RouteComparisonScreen}
        />
        <Stack.Screen
          name="Optimization Engine"
          component={OptimizationEngineScreen}
        />
        <Stack.Screen
          name="Disruption Modeling"
          component={DisruptionModelingScreen}
        />
        <Stack.Screen name="Transport Cost" component={TransportCostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
