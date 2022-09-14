<template>
  <v-app>    
    <v-main>
      <DataTableView/>
    </v-main>
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