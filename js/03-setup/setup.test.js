let animals = ["zebra", "elephant", "bear", "tiger"];

//this will run only ONCE before all the testing

beforeAll(() => {
  console.log("before all");
});

//this will run before each testing
beforeEach(() => {
  animals = ["zebra", "elephant", "bear", "tiger"];
});

//run after each testing

afterEach(() => {
  animals = ["zebra", "elephant", "bear", "tiger"];
});

//this will run only ONCE after all the testing
afterAll(() => {
  console.log("After All");
});

describe("animals array", () => {
  it("should add an animal to end of array", () => {
    animals.push("alligator");
    expect(animals.slice(-1)[0]).toBe("alligator");
  });

  it("should add an animal to the beginning of the array", () => {
    animals.unshift("monkey");
    expect(animals[0]).toBe("monkey");
  });

  it("should have initial length of 4", () => {
    expect(animals.length).toBe(4);
  });
});

describe("testing something else", () => {
  it.only("true should be truthy", () => {
    expect(true).toBeTruthy();
  });
});
