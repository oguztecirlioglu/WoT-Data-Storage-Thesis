const { rest } = require("msw");
const { setupServer } = require("msw/node");
const { sendData } = require("../virtualDevice");
const { generateRandomData } = require("../utils");

const server = setupServer(
  // Define a request handler for your POST endpoint
  rest.post("http://localhost:7500/api/dataInput", (req, res, ctx) => {
    return res(
      // Respond with a 200 status and a JSON response
      ctx.status(200),
      ctx.body("success")
    );
  })
);

// Start the mock server before running tests
beforeAll(() => server.listen());

// Clean up the mock server after tests
afterAll(() => server.close());

describe("sendData method works", () => {
  it("should make a successful POST request", async () => {
    // Call the async function and wait for the response
    const response = await sendData("/api/dataInput", 7500, { someData: "someData" });

    // Assertions
    expect(response).toEqual("success");
  });
});

describe("generateRandomData works", () => {
  it("should return an object with the valid fields", () => {
    const data = generateRandomData(0, "test_device_name");
    const expectedFields = [
      "time",
      "deviceName",
      "temperature",
      "relative_humidity",
      "pm_2_5",
      "pm_10",
      "tvoc",
      "ozone",
      "nitrogen_dioxide",
      "sulfur_dioxide",
      "carbon_monoxide",
    ];

    for (const field of expectedFields) {
      expect(data).toHaveProperty(field);
    }
    expect(data.deviceName).toEqual("test_device_name");
  });
});
