import 'package:flutter/material.dart';

class TransportCostScreen extends StatelessWidget {
  const TransportCostScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Transport Cost Benchmarks'),
      ),
      body: const Center(
        child: Text('Transport Cost Screen'),
      ),
    );
  }
}
