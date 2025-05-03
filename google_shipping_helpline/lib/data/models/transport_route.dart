class TransportRoute {
  final String origin;
  final String destination;
  final double cost;
  final double time;
  final double carbonFootprint;

  TransportRoute({
    required this.origin,
    required this.destination,
    required this.cost,
    required this.time,
    required this.carbonFootprint,
  });
}
