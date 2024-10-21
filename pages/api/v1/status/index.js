import database from "infra/database.js";

async function status(request, response) {
  const databaseServerVersionResult = await database.query(
    "SHOW SERVER_VERSION;",
  );
  const databaseServerVersionValue =
    databaseServerVersionResult.rows[0].server_version;

  const databaseName = process.env.POSTGRES_DB;
  const databaseOpennedConnectionsResult = await database.query({
    text: "SELECT COUNT(*)::INT FROM PG_STAT_ACTIVITY WHERE datname=$1",
    values: [databaseName],
  });
  const databaseOpennedConnectionsValue =
    databaseOpennedConnectionsResult.rows[0].count;

  const databaseMaxConnectionsResult = await database.query(
    "SHOW MAX_CONNECTIONS;",
  );
  const databaseMaxConnectionsValue =
    databaseMaxConnectionsResult.rows[0].max_connections;

  const updateAt = new Date().toISOString();
  return response.status(200).json({
    update_at: updateAt,
    dependencies: {
      version: databaseServerVersionValue,
      opened_connections: parseInt(databaseOpennedConnectionsValue),
      max_connections: parseInt(databaseMaxConnectionsValue),
    },
  });
}

export default status;
