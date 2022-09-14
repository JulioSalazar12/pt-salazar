<template>
  <div class="datatableview">
    <h1 class="my-8">FRONT END - PRUEBA TECNICA</h1>

    <v-hover>    
      <template v-slot:default="{ hover }">
        <v-card :class="`elevation-${hover ? 24 : 0}`" class="transition-swing mx-auto pa-5" elevation="10" width="850px">        
          <v-card-title>
            Peliculas
            <v-spacer></v-spacer>
            <v-text-field
              class="mb-6"
              v-model="search"
              append-icon="mdi-magnify"
              label="Titulo, Director, Año o Puntaje"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn
              elevation="0"
              :loading="loading4"
              :disabled="loading4"
              color="indigo accent-4"
              class="white--text font-weight-bold mr-5"
              @click="loader = 'loading4'">
              Reload
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="filmsList"
            :search="search"
          ></v-data-table>
        </v-card>
      </template>
    </v-hover>

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
