<template>
  <div class="datatableview">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-card
          :class="`elevation-${hover ? 24 : 0}`"
          class="transition-swing mx-auto my-5 pa-5"
          elevation="10"
          width="850px"
        >
          <v-card-title>
            <span class="font-weight-bold ml-5">Películas</span>
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
              :loading="loadingA"
              :disabled="loadingA"
              color="indigo accent-4"
              class="white--text font-weight-bold mr-5"
              @click="loader = 'loadingA'"
            >
              Recargar
              <template v-slot:loader>
                <span class="custom-loader">
                  <v-icon light>mdi-cached</v-icon>
                </span>
              </template>
            </v-btn>
          </v-card-title>
          <v-data-table :headers="headers" :items="films" :search="search">
            <template v-slot:top>
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Imagen</span>
                  </v-card-title>

                  <v-img
                    class="mx-auto"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    max-height="720px"
                    max-width="480px"
                    :src="dataItem.image"
                    :alt="dataItem.title"
                  ></v-img>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                      Cerrar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                outlined
                color="indigo accent-4"
                class="white--text font-weight-bold ml-2"
                @click="selectItem(item)"
              >
                <v-icon left> mdi-panorama-variant-outline </v-icon>
                Imagen
              </v-btn>
            </template>
            <template v-slot:no-data>
              <v-btn color="primary" @click="getAllFilms">
                Recargar datos
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </template>
    </v-hover>
  </div>
</template>

<script>
import DataTableService from "@/components/DataTable.Service";
export default {
  data: () => ({
    loader: null,
    loading: false,
    loadingA: false,
    dialog: false,
    search: "",
    headers: [
      { text: "Imagen", value: "actions", sortable: false },
      { text: "Titulo", value: "title" },
      { text: "Director", value: "director" },
      { text: "Año", value: "release_date" },
      { text: "Puntaje", value: "rt_score" },
    ],
    films: [],
    dataIndex: -1,
    dataItem: {},
    defaultItem: {},
  }),
  watch: {
    dialog(val) {
      val || this.close();
    },
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => (this[l] = false), 1000);
      this.getAllFilms();
      this.loader = null;
    },
  },

  created() {
    this.getAllFilms();
  },

  methods: {
    getAllFilms() {
      DataTableService.getAll()
        .then((response) => {
          this.films = response.data.map(this.displayFilm);
          console.log("Lista peliculas:", response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    displayFilm(sampleFilm) {
      return {
        title: sampleFilm.title,
        director: sampleFilm.director,
        release_date: sampleFilm.release_date,
        rt_score: sampleFilm.rt_score,
        image: sampleFilm.image,
      };
    },

    selectItem(item) {
      this.dataIndex = this.films.indexOf(item);
      this.dataItem = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.dataItem = Object.assign({}, this.defaultItem);
        this.dataIndex = -1;
      });
    },
  },
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>