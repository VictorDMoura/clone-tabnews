import database from "infra/database";

import orquestrator from "tests/orquestrator.js";

beforeAll(async () => {
  await orquestrator.waitForAllServices();
  await database.query("drop schema public cascade; create schema public;");
});

test("POST to /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(201);

  const response1Body = await response1.json();

  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const response2Body = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2Body.status).toBe(200);

  const response2BodyBody = await response2Body.json();

  expect(Array.isArray(response2BodyBody)).toBe(true);
  expect(response2BodyBody.length).toBe(0);
});

test("Another method to /api/v1/migrations should return 405", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "PUT",
  });

  const expected = "Method PUT not allowed";

  const responseBody = await response.json();
  expect(response.status).toBe(405);
  expect(responseBody.error).toBe(expected);
});
