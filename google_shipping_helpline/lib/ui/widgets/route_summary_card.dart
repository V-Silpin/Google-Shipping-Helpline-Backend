import 'package:flutter/material.dart';

class RouteSummaryCard extends StatelessWidget {
  final String title;
  final String subtitle;

  const RouteSummaryCard(
      {super.key, required this.title, required this.subtitle});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(title),
        subtitle: Text(subtitle),
      ),
    );
  }
}
