const sum = require("./sum");

describe("truthy or falsy", () => {
  test("function to add 2 numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });
  if ("null") {
    const n = null;
    expect(n).not.toBeTruthy();
  }
});
