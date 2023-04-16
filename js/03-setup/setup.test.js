let animals = ["zebra", "elephant", "bear", "tiger"];

describe("animals array", () => {
  it("should add an animal to end of array", () => {
    animals.push("alligator");
    expect(animals.slice(-1)[0]).toBe("alligator");
  });

  it("should add an animal to the beginning of the array", () => {
    animals.unshift("monkey");
    expect(animals[0]).toBe("monkey");
  });
});
