<template>
  <v-app>
    <h1 class="my-5">FRONT END - PRUEBA TECNICA</h1>

    <v-main>
      <DataTableView/>
    </v-main>
    <spam class="mt-5 mb-2">Desarrollado por Julio Salazar Zapata</spam>
  </v-app>
</template>

<script>
import DataTableView from '@/components/DataTableView.vue';

export default {
  name: 'App',
  components: {
    DataTableView,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Montserrat, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>