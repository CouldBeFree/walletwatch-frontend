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
    case "Кредити":
      return "mdi-credit-card-outline";
    case "Медицина":
      return "mdi-bottle-tonic-plus-outline";
    case "Веб сервіси":
      return "mdi-web-check";
    case "Самоосвіта":
      return "mdi-cast-education";
    case "Дім та ремонт":
      return "mdi-home-analytics";
    case "Shopping":
      return "mdi-shopping-outline";
    case "Savings":
      return "mdi-sack-percent";
    case "Краса і здоров'я":
      return "mdi-cart-heart";
  }
};
