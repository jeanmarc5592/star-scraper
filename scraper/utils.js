const splitArray = (arr) => {
  let i = 0;
  const result = [];
  let sequence;
  while (i < 12) {
    sequence = arr.slice(i, i + 1);
    result.push(sequence);
    i = i + 1;
  }
  return result;
};

module.exports = { splitArray };
