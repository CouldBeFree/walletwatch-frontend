export default (arr = []) => {
  let count = 0;
  arr?.forEach((item) => {
    count += item.amount_sum;
  });
  return count;
};
