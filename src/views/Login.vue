<template>
  <p class="text-h3 text-center mb-6">З поверненням!</p>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
    <v-text-field
      v-model="user.email"
      :rules="emailValidation"
      label="Імейл"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.password"
      :rules="passwordValidation"
      label="Пароль"
      :append-icon="icon"
      required
      :type="passwordFieldType"
      @click:append="onIconClick"
    ></v-text-field>

    <div class="d-flex flex-column">
      <v-btn
        color="primary"
        type="submit"
        @click="submit"
        :disabled="loading"
        :loading="loading"
      >
        Увійти
      </v-btn>
      <p class="mt-2 d-flex justify-end">
        <router-link to="/auth/registration">У мене немає акаунту</router-link>
      </p>
    </div>
    <v-alert v-if="error" class="mt-5 text-capitalize" type="error">{{
      error
    }}</v-alert>
  </v-form>
</template>

<script setup>
// TODO: refactor https://vuetifyjs.com/en/components/text-fields/#login-form
import { computed, reactive, ref } from "vue";
import { emailRules, passwordRules } from "@/settings/validationRules";
import AuthService from "@/service/apiService/AuthService";
import router from "@/router";
import getErrorMessage from "@/utils/getErrorMessage";
import useFormStatusHandler from "@/composable/useFormStatusHandler";
import { TEXT_TYPE, PASSWORD_TYPE, LOCAL_STORAGE_TOKEN_NAME } from "@/constants";

const emailValidation = ref(emailRules);
const passwordValidation = ref(passwordRules);

const { loading, error, valid } = useFormStatusHandler();

const user = reactive({
  email: "",
  password: "",
});

const passwordFieldType = ref(PASSWORD_TYPE);

const icon = computed(() =>
  passwordFieldType.value === PASSWORD_TYPE
    ? "mdi-eye-off-outline"
    : "mdi-eye-outline",
);

const onIconClick = () => {
  passwordFieldType.value === PASSWORD_TYPE
    ? (passwordFieldType.value = TEXT_TYPE)
    : (passwordFieldType.value = PASSWORD_TYPE);
};

const submit = async () => {
  if (!valid.value) return;
  try {
    loading.value = true;
    const { data } = await AuthService.loginUser(user);
    localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, data.token);
    error.value = null;
    await router.push("/dashboard");
  } catch (e) {
    error.value = getErrorMessage(e);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
