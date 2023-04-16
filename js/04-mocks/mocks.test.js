const forEach = (items, callback) => {
  for (let i = 0; i < items.length; i++) {
    callback(items[i]);
  }
};

it("mock callback", () => {
  //jest.fn() creates a mock function
  const mockCalledback = jest.fn((x) => x + 42);
  forEach([0, 1], mockCalledback);

  //each callback has this .mock property has a bunch of data that associated to that mockCalledback
  expect(mockCalledback.mock.calls.length).toBe(2);

  //[ call1 , call2 ]
  expect(mockCalledback.mock.calls[0][0]).toBe(0);
});
