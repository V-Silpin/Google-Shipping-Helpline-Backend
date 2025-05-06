import React from 'react';
import { View, Text } from 'react-native';

const RouteSummaryCard = ({ route }) => (
  <View>
    <Text>{route.name}</Text>
    <Text>Cost: {route.cost}</Text>
    <Text>Time: {route.time}</Text>
  </View>
);

export default RouteSummaryCard;