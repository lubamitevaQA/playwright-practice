import { test, expect } from "@playwright/test";

test("api test - get specific post", async ({ request }) => {
  const response = await request.get("/posts/1");
  const parsedResponse = await response.json();

  expect(response.status()).toBe(200);
  expect(parsedResponse.userId).toBe(1);
  expect(parsedResponse.id).toBe(1);
  expect(parsedResponse.title).toContain("provident occaecati");
});

test("api test - get all posts", async ({ request }) => {
  const response = await request.get("/posts");
  const parsedResponse = await response.json();

  expect(response.status()).toBe(200);
  expect(Array.isArray(parsedResponse)).toBe(true);
  expect(parsedResponse.length).toBe(100);
  expect(parsedResponse[0].userId).toBeDefined();
  expect(parsedResponse[0].id).toBeDefined();
  expect(parsedResponse[0].title).toBeDefined();
  expect(parsedResponse[0].body).toBeDefined();
});

test("api test - create a post", async ({ request }) => {
  const response = await request.post("/posts", {
    data: {
      userId: 1,
      title: "my test post",
      body: "this is the body of my test post",
    },
  });

  const parsedResponse = await response.json();

  expect(response.status()).toBe(201);
  expect(parsedResponse.userId).toBe(1);
  expect(parsedResponse.id).toBeDefined();
  expect(parsedResponse.title).toContain("my test post");
  expect(parsedResponse.body).toContain("my test post");
});

test("api test - get specific user", async ({ request }) => {
  const response = await request.get("/users/1");
  const parsedResponse = await response.json();

  expect(response.status()).toBe(200);
  expect(parsedResponse.id).toBe(1);
  expect(parsedResponse.name).toBeDefined();
  expect(parsedResponse.username).toBeDefined();
  expect(parsedResponse.email).toBeDefined();
  expect(parsedResponse.address.city).toBeDefined();
  expect(parsedResponse.phone).toBeDefined();
  expect(parsedResponse.website).toBeDefined();
  expect(parsedResponse.company).toBeDefined();
});

test("api test - delete specific post", async ({ request }) => {
  const response = await request.delete("/posts/1");
  const parsedResponse = await response.json();

  expect(response.status()).toBe(200);
  expect(parsedResponse).toEqual({});
});
