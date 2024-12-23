import orquestrator from "tests/orquestrator.js";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
});

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  expect(responseBody.update_at).toBeDefined();

  const parsedUpdateAt = new Date(responseBody.update_at).toISOString();
  expect(responseBody.update_at).toBe(parsedUpdateAt);

  const version = responseBody.dependencies.version;
  expect(version).toBeDefined();
  expect(version).toBe("16.1");

  const openedConnexions = responseBody.dependencies.opened_connections;
  expect(openedConnexions).toBeDefined();
  expect(openedConnexions).toBe(1);

  const maxConnections = responseBody.dependencies.max_connections;
  expect(maxConnections).toBeDefined();
  expect(maxConnections).toBeGreaterThan(0);
  expect(maxConnections).toBe(100);
});
