<template>
<!--  <v-main>-->
<!--    <v-container>-->
<!--      <router-view />-->
<!--    </v-container>-->
<!--  </v-main>-->
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center">
        <v-row>
          <v-col sm="4" offset="4">
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
