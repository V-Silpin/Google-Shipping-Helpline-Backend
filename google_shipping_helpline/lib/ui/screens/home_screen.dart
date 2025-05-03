import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Transport Planner'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/routeComparison');
              },
              child: const Text('Route Comparison'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/optimizationEngine');
              },
              child: const Text('Optimization Engine'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/disruptionModeling');
              },
              child: const Text('Disruption Modeling'),
            ),
            ElevatedButton(
              onPressed: () {
                Navigator.pushNamed(context, '/transportCost');
              },
              child: const Text('Transport Cost Benchmarks'),
            ),
          ],
        ),
      ),
    );
  }
}
