const createTechnicalData = () => {
  return {
    // created_by: undefined,
    // updated_by: undefined,
    created_at: "Wed Jun 16 2021 13:46:56 GMT+0300 (Moscow Standard Time)",
    updated_at: "Wed Jun 16 2021 13:46:56 GMT+0300 (Moscow Standard Time)",
  };
};

const get = (items, findValue, findKey, all = false) => {
  const arr = items.filter((i) => i[findKey] === findValue);
  if (arr.length && !all) {
    return arr[0];
  } else if (all) {
    return arr;
  } else {
    return {};
  }
};

module.exports = { createTechnicalData, get };
