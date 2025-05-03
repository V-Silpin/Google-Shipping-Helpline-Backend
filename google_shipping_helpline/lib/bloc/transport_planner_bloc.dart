import 'package:flutter_bloc/flutter_bloc.dart';
import 'transport_planner_event.dart';
import 'transport_planner_state.dart';

class TransportPlannerBloc
    extends Bloc<TransportPlannerEvent, TransportPlannerState> {
  TransportPlannerBloc() : super(TransportPlannerInitial());

  @override
  Stream<TransportPlannerState> mapEventToState(
      TransportPlannerEvent event) async* {
    // Handle events
  }
}
