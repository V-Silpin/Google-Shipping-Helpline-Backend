async function handler({
  origin,
  destination,
  priorities = { cost: 50, time: 50, carbon: 50 },
}) {
  const transportModes = await sql`
    SELECT * FROM transport_modes
  `;

  const activeDisruptions = await sql`
    SELECT * FROM disruptions 
    WHERE active = true 
    AND (
      location ILIKE ${`%${origin}%`} 
      OR location ILIKE ${`%${destination}%`}
    )
  `;

  const baseDistance = 500; // Simplified distance calculation
  const routes = [];

  for (const mode of transportModes) {
    let estimatedTime = baseDistance / mode.speed_mph;
    let estimatedCost = baseDistance * mode.cost_per_mile;
    let carbonFootprint = baseDistance * mode.carbon_per_mile;

    const affectingDisruptions = activeDisruptions.filter((d) =>
      d.type.toLowerCase().includes(mode.mode_name.toLowerCase())
    );

    if (affectingDisruptions.length > 0) {
      const maxSeverity = Math.max(
        ...affectingDisruptions.map((d) => d.severity)
      );
      estimatedTime *= 1 + maxSeverity * 0.2;
      estimatedCost *= 1 + maxSeverity * 0.1;
    }

    const route = await sql`
      INSERT INTO routes (
        origin, 
        destination, 
        transport_mode_id, 
        distance_miles, 
        estimated_time_hours, 
        estimated_cost, 
        carbon_footprint
      ) 
      VALUES (
        ${origin}, 
        ${destination}, 
        ${mode.id}, 
        ${baseDistance}, 
        ${estimatedTime}, 
        ${estimatedCost}, 
        ${carbonFootprint}
      )
      RETURNING *
    `;

    const score =
      (priorities.cost * (1 / estimatedCost) +
        priorities.time * (1 / estimatedTime) +
        priorities.carbon * (1 / carbonFootprint)) /
      (priorities.cost + priorities.time + priorities.carbon);

    routes.push({
      ...route[0],
      score,
      disruptions: affectingDisruptions,
    });
  }

  routes.sort((a, b) => b.score - a.score);

  return {
    routes,
    disruptions: activeDisruptions,
  };
}
export async function POST(request) {
  return handler(await request.json());
}