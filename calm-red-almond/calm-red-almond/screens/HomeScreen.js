import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => (
  <View>
    <Text>Welcome to Google Maps for Shipping</Text>
    <Button title="Compare Routes" onPress={() => navigation.navigate('Route Comparison')} />
    <Button title="Optimize" onPress={() => navigation.navigate('Optimization Engine')} />
    <Button title="Disruption Modeling" onPress={() => navigation.navigate('Disruption Modeling')} />
    <Button title="Transport Cost" onPress={() => navigation.navigate('Transport Cost')} />
  </View>
);

export default HomeScreen;