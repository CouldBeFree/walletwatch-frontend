<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center">
        <v-row>
          <v-col
            xs="12"
            sm="6"
            offset-sm="3"
            md="6"
            offset-md="3"
            lg="4"
            offset-lg="4"
            xl="2"
            offset-xl="5"
          >
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup></script>

<style scoped></style>
