import { ref } from "vue";

export default function useFormStatusHandler() {
  const error = ref(null);
  const success = ref(false);
  const valid = ref(false);
  const loading = ref(false);

  return { error, success, valid, loading };
}
