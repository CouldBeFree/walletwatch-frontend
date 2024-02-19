<template>
  <v-layout>
    <v-navigation-drawer
      expand-on-hover
      rail
    >
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/19.jpg"
          title="Sandra Adams"
          subtitle="sandra_a88@gmailcom"
        ></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item :link="true" exact :to="'/dashboard/applications'" prepend-icon="mdi-ansible" title="Applications" value="Applications"></v-list-item>
        <v-list-item :link="true" exact :to="'/dashboard/users'" prepend-icon="mdi-text-account" title="Users" value="Users"></v-list-item>
        <v-list-item :link="true" exact :to="'/dashboard/languages'" prepend-icon="mdi-translate" title="Languages" value="Languages"></v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item @click="onToggle" prepend-icon="mdi-theme-light-dark" title="Switch theme" value="Logout"></v-list-item>
        <v-list-item @click="onLogout" prepend-icon="mdi-exit-to-app" title="Logout" value="Switch theme"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="fill-height">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-layout>

</template>

<script setup>
  import { useTheme } from 'vuetify'
  const theme = useTheme()

  const onToggle = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }

  const onLogout = () => {};
</script>
