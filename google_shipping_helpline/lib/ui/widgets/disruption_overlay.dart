import 'package:flutter/material.dart';

class DisruptionOverlay extends StatelessWidget {
  const DisruptionOverlay({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      color: Colors.red.withOpacity(0.5),
      child: const Center(
        child: Text(
          'Disruption Alert!',
          style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
        ),
      ),
    );
  }
}
