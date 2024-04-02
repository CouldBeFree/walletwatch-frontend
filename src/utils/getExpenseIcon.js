export default (expenseName) => {
  switch (expenseName) {
    case "Car":
      return "mdi-car-back";
    case "Pets":
      return "mdi-paw";
    case "Grocery":
      return "mdi-cart";
    case "Utilities":
      return "mdi-archive-eye-outline";
    case "Rent":
      return "mdi-home-city";
    case "Donates":
      return "mdi-gift-outline";
    case "Cafe and restaurants":
      return "mdi-coffee-to-go-outline";
    case "Credits payment":
      return "mdi-credit-card-outline";
    case "Medicine":
      return "mdi-medical-bag";
    case "Self education":
      return "mdi-cast-education";
  }
};
