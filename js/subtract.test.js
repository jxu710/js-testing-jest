const subtract = require("./subtract");

test("function to subtract 2 numbers", () => {
  expect(subtract(1, 2)).toBe(-1);
});
