async function handler({ action, disruption }) {
  if (action === "create") {
    const result = await sql`
      INSERT INTO disruptions (
        location, 
        type, 
        severity, 
        start_time, 
        description
      ) VALUES (
        ${disruption.location},
        ${disruption.type},
        ${disruption.severity},
        ${disruption.startTime},
        ${disruption.description}
      ) RETURNING *`;
    return { disruption: result[0] };
  }

  if (action === "update") {
    const result = await sql`
      UPDATE disruptions 
      SET location = ${disruption.location},
          type = ${disruption.type},
          severity = ${disruption.severity},
          description = ${disruption.description},
          end_time = ${disruption.endTime},
          active = ${disruption.active}
      WHERE id = ${disruption.id}
      RETURNING *`;
    return { disruption: result[0] };
  }

  if (action === "list") {
    const disruptions = await sql`
      SELECT * FROM disruptions 
      WHERE active = true 
      ORDER BY start_time DESC`;
    return { disruptions };
  }

  if (action === "resolve") {
    const result = await sql`
      UPDATE disruptions 
      SET active = false,
          end_time = CURRENT_TIMESTAMP
      WHERE id = ${disruption.id}
      RETURNING *`;
    return { disruption: result[0] };
  }

  return { error: "Invalid action" };
}
export async function POST(request) {
  return handler(await request.json());
}