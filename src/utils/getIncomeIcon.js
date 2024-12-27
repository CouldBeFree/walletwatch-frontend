export default (incomeName) => {
  switch (incomeName) {
    case "Заробітна плата":
      return "mdi-cash-100";
    case "Фріланс":
      return "mdi-laptop-account";
    case "Дивиденти":
      return "mdi-book-plus-outline";
    case "Додатковий дохід":
      return "mdi-currency-usd";
  }
};
