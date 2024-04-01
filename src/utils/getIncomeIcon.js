export default (incomeName) => {
  switch (incomeName){
    case 'Salary':
      return 'mdi-cash-100';
    case 'Freelance':
      return 'mdi-laptop-account';
    case 'Dividents':
      return 'mdi-book-plus-outline';
    case 'Enterprise income':
      return 'mdi-currency-usd';
  }
}
