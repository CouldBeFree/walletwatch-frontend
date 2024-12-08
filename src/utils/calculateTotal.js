export default (arr = []) => {
  let count = 0;
  arr?.forEach((item) => {
    count += item.totalAmount;
  });
  return count;
};
