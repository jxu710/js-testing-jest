const axios = require("axios");

const fetchData = async (id) => {
  const results = await axios.get(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );

  return results.data;
};

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

  expect(mockCalledback.mock.results[0].value).toBe(42);
});

it("mock return", () => {
  const mock = jest.fn();
  mock.mockReturnValueOnce(true);
  const results = mock();
  expect(results).toBe(true);
});

it("mock axios", async () => {
  jest.spyOn(axios, "get").mockReturnValueOnce({
    data: {
      id: 1,
      todo: "to get grocery",
    },
  });
  const results = await fetchData();
});
