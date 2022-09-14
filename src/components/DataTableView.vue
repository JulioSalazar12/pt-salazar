<template>
  <div class="datatableview">
    <h1 class="my-5">FRONT END - PRUEBA TECNICA</h1>

    <v-card>
      <v-card-title>
        Peliculas
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="filmsList"
        :search="search"
      ></v-data-table>
  </v-card>

  </div>
</template>

<script>
  import DataTableService from "@/components/DataTable.Service"

  export default {
    name: 'DataTableView',
    data: () => ({   
      search: '',
      headers: [
        { text: 'Imagen', value: 'actions', sortable: false },
        { text: 'Titulo', value: 'title' },
        { text: 'Director', value: 'director' },
        { text: 'Año', value: 'release_date' },
        { text: 'Puntaje', value: 'rt_score' },
      ],
      filmsList: [],

    }),
    created () {
      this.getAllFilms()
    },
    methods: {
      getAllFilms(){
      DataTableService.getAll()
      .then((response) => {
        this.filmsList = response.data.map(this.displayFilm);
        console.log("Data obtenida:", response.data)
        console.log("List:", this.filmsList)
      })
      .catch(e => {
        console.log(e);
      })
    },
    displayFilm(sampleFilm){
      return {
        title: sampleFilm.title,
        director: sampleFilm.director,        
        release_date: sampleFilm.release_date,        
        rt_score: sampleFilm.rt_score,
        image: sampleFilm.image      
      }
    },

      editItem (item) {
        this.editedIndex = this.filmsList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      }
    }
  }
</script>
