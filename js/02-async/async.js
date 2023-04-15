const axios = require("axios");

const fetchData = async (id) => {
  const results = await axios.get(
    `https://jsonplaceholder.typicode.com/todo/${id}`
  );

  console.log(results);
  return results;
};
fetchData(1);
module.exports = fetchData;
