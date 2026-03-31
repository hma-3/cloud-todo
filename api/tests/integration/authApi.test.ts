import request from "supertest";

import { app } from "../../src/app";

describe("auth API integration", () => {
  beforeEach(() => {
    process.env.API_KEY = "test-key";
  });

  it("returns 401 when api key is missing", async () => {
    const response = await request(app).post("/api/tasks").send({
      title: "Valid task title",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      code: "UNAUTHORIZED",
      message: "Invalid API key.",
      details: [],
    });
  });

  it("returns 401 when api key is invalid", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .set("X-API-Key", "wrong")
      .send({
        title: "Valid task title",
      });

    expect(response.status).toBe(401);
    expect(response.body.code).toBe("UNAUTHORIZED");
  });
});
