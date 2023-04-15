const cloneArray = require("./cloneArray");

test("to correctly clone an array", () => {
  const arr = [1, 2, 3, 4, 5];
  expect(cloneArray(arr)).toEqual(arr);
  expect(cloneArray(arr)).not.toBe(arr);
});
