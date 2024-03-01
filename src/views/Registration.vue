<template>
  <v-form ref="form" v-model="valid" lazy-validation @submit.prevent>
    <v-text-field
      v-model="user.username"
      :rules="nameValidation"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.email"
      :rules="emailValidation"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field
      v-model="user.password"
      :rules="passwordValidation"
      label="Password"
      type="password"
      required
    ></v-text-field>

    <div class="d-flex flex-column">
      <v-btn
        color="primary"
        type="submit"
        @click="submit"
        :disabled="loading"
        :loading="loading"
      >
        Register
      </v-btn>
      <p class="mt-2 d-flex justify-end">
        <router-link to="/auth/login">I already have account</router-link>
      </p>
    </div>
    <v-alert v-if="error" class="mt-5" type="error">{{ error }}</v-alert>
    <v-alert v-if="success" class="mt-5" type="success">
      You have been successfully registered. No you can
      <router-link to="/auth/login">Login</router-link>
    </v-alert>
  </v-form>
</template>

<script setup>
import { reactive, ref } from "vue";
import AuthService from "@/service/apiService/AuthService";
import {
  emailRules,
  nameRules,
  passwordRules,
} from "@/settings/validationRules";
import getErrorMessage from "@/utils/getErrorMessage";
import useFormStatusHandler from "@/composable/useFormStatusHandler";

const user = reactive({
  email: "",
  password: "",
  username: "",
});

const { loading, error, valid, success } = useFormStatusHandler();

const form = ref();

const nameValidation = ref(nameRules);
const emailValidation = ref(emailRules);
const passwordValidation = ref(passwordRules);

const submit = async () => {
  if (!valid.value) return;
  success.value = false;
  loading.value = true;
  try {
    await AuthService.registerUser(user);
    error.value = null;
    success.value = true;
    form.value.reset();
  } catch (e) {
    error.value = getErrorMessage(e);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped></style>
