abstract class TransportPlannerState {}

class TransportPlannerInitial extends TransportPlannerState {}

class RouteFetchedState extends TransportPlannerState {
  final String routeDetails;

  RouteFetchedState(this.routeDetails);
}
