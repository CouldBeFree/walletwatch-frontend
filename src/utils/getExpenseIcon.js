export default (expenseName) => {
  switch (expenseName) {
    case "Машина":
      return "mdi-car-back";
    case "Домашні улюбленці":
      return "mdi-paw";
    case "Продукти":
      return "mdi-cart";
    case "Комуналка":
      return "mdi-archive-eye-outline";
    case "Оренда":
      return "mdi-home-city";
    case "Донати":
      return "mdi-gift-outline";
    case "Кафешка":
      return "mdi-coffee-to-go-outline";
    case "Кредит":
      return "mdi-credit-card-outline";
    case "Медицина":
      return "mdi-bottle-tonic-plus-outline";
    case "Самоосвіта":
      return "mdi-cast-education";
    case "Shopping":
      return "mdi-shopping-outline";
    case "Savings":
      return "mdi-sack-percent"
  }
};
