<template>
  <p class="text-h3 text-center mb-6">Welcome back</p>
  <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent
  >
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
      required
      type="password"
    ></v-text-field>

    <div class="d-flex flex-column">
        <v-btn
          color="primary"
          type="submit"
          @click="submit"
          :disabled="loading"
          :loading="loading"
        >
          Login
        </v-btn>
        <p class="mt-2 d-flex justify-end">
          <router-link to="/auth/registration">I don't have account</router-link>
        </p>
    </div>
    <v-alert v-if="error" class="mt-5 text-capitalize" type="error">{{error}}</v-alert>
  </v-form>
</template>

<script setup>
import {reactive, ref} from "vue";
import {emailRules, passwordRules} from '@/settings/validationRules';
import AuthService from "@/service/apiService/authService";
import router from "@/router";

const valid = ref(false);
const emailValidation = ref(emailRules);
const passwordValidation = ref(passwordRules);
const loading = ref(false);
const error = ref(null);

const user = reactive({
  email: '',
  password: ''
});

const submit = async () => {
  if (!valid.value) return;
  try {
    loading.value = true;
    await AuthService.loginUser(user);
    error.value = null;
    await router.push('/dashboard')
  } catch (e) {
    error.value = e.response?.data?.message;
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>

</style>
