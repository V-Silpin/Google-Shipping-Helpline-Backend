abstract class TransportPlannerEvent {}

class FetchRouteEvent extends TransportPlannerEvent {
  final String origin;
  final String destination;

  FetchRouteEvent(this.origin, this.destination);
}
