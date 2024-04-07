<template>
  <v-layout>
    <v-navigation-drawer expand-on-hover rail>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/19.jpg"
          :title="user.username"
          :subtitle="user.email"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          :link="true"
          exact
          :to="'/dashboard'"
          prepend-icon="mdi-home-analytics"
          title="Home"
          value="Home"
        ></v-list-item>
        <v-list-item
          :link="true"
          exact
          :to="'/dashboard/incomes'"
          prepend-icon="mdi-cash-fast"
          title="Incomes"
          value="Incomes"
        ></v-list-item>
        <v-list-item
          :link="true"
          exact
          :to="'/dashboard/expenses'"
          prepend-icon="mdi-transfer"
          title="Expenses"
          value="Expenses"
        ></v-list-item>
        <v-list-item
          :link="true"
          exact
          :to="'/dashboard/goals'"
          prepend-icon="mdi-flag-checkered"
          title="Goals"
          value="Goals"
        ></v-list-item>
        <v-list-item
          :link="true"
          exact
          :to="'/dashboard/categories'"
          prepend-icon="mdi-playlist-edit"
          title="Categories"
          value="Categories"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item
          @click="onToggle"
          prepend-icon="mdi-theme-light-dark"
          title="Switch theme"
          value="Logout"
        ></v-list-item>
        <v-list-item
          @click="onLogout"
          prepend-icon="mdi-exit-to-app"
          title="Logout"
          value="Switch theme"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="fill-height">
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-layout>
  <v-snackbar
    v-model="snackState.isOpen"
    :timeout="4000"
    :color="snackState.type"
  >
    {{ snackState.text }}
  </v-snackbar>
</template>

<script setup>
import { useTheme } from "vuetify";
import {
  LOCAL_STORAGE_TOKEN_NAME,
  LIGHT_THEME,
  DARK_THEME,
  FIRE_SNACK,
} from "@/constants";
import AuthService from "@/service/apiService/AuthService";
import router from "@/router";
import { onMounted, onUnmounted, reactive } from "vue";
import proxy from "@/utils/proxy";
import useSnackBar from "@/composable/useSnackBar";
const { snackState, openSnackBar } = useSnackBar();

const theme = useTheme();

const onToggle = () => {
  theme.global.name.value = theme.global.current.value.dark
    ? LIGHT_THEME
    : DARK_THEME;
};

const onLogout = async () => {
  localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  await router.push("/auth/login");
};

let user = reactive({
  email: null,
  username: null,
});

onUnmounted(() => {
  proxy.unsubscribe(FIRE_SNACK);
});

onMounted(async () => {
  proxy.subscribe(FIRE_SNACK, (val) => openSnackBar(val.text, val.type));
  try {
    const { data } = await AuthService.getUser();
    user = {
      ...data,
    };
  } catch (e) {
    console.error(e);
  }
});
</script>
