<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center">
        <v-row>
          <v-col cols="3" sm="4" offset-sm="4">
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>

</template>

<script setup>
</script>

<style scoped>

</style>
