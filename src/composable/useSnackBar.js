import { reactive } from "vue";

export default function useSnackBar() {
  const initialState = {
    isOpen: false,
    text: null,
    type: "",
  };

  const snackState = reactive({ ...initialState });

  const openSnackBar = (text, type) => {
    Object.assign(snackState, { isOpen: true, text, type });
  };

  const closeSnackBar = () => {
    Object.assign(snackState, { ...initialState });
  };

  return { snackState, openSnackBar, closeSnackBar };
}
