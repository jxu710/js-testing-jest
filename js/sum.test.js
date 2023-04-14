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

describe("numbers", () => {
  it("two plus two", () => {
    const value = 2 + 2;
    expect(value).toBe(4);
    expect(value).toBeGreaterThanOrEqual(3);
  });

  it("adding floats", () => {
    const value = 0.2 + 0.1;
    expect(value).toBeCloseTo(0.3);
  });
});

describe("strings", () => {
  it("there is no I in team", () => {
    expect("team").not.toMatch(/I/);
    // expect("team").toMatch("am");
  });
});

describe("arrays", () => {
  const shoppingList = ["apple", "banana", "pears", "berry"];

  expect(shoppingList).toContain("berry");
});

//exception example
function compileAndroidCode() {
  throw new Error("u are using the wrong the JDK");
}
describe("exceptions", () => {
  it("compling andriod goes as expected", () => {
    expect(() => compileAndroidCode().toThrow("u are using the wrong the JDK"));
    //toThrow(Error) or toThrow() both works
  });
});
