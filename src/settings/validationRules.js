export const nameRules = [
  (v) => !!v || "Введіть ім'я",
  (v) => (v && v.length >= 4) || "Ім'я не має бути коротшим за 4 символи",
];

export const emailRules = [
  (v) => !!v || "Введіть імейл",
  (v) => /.+@.+\..+/.test(v) || "Імейл не валідний",
];

export const passwordRules = [
  (v) => !!v || "Введіть пароль",
  (v) => v.length > 4 || "Пароль має містити мінімум 4",
];

export const amountRules = [(v) => !!v || "Введіть суму"];

export const goalNameRules = [
  (v) => !!v || "Введіть ціль",
  (v) => (v && v.length > 4) || "Ім'я не має бути коротшим за 4 символи",
];
