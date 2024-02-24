export const nameRules = [
  (v) => !!v || 'Name is required',
  (v) => (v && v.length >= 4) || 'Name must be less than 4 characters',
];

export const emailRules = [
  (v) => !!v || 'E-mail is required',
  (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
];

export const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => v.length > 4 || 'Password should be at least 4 characters long',
];

export const amountRules = [
  (v) => !!v || 'Amount is required'
]
