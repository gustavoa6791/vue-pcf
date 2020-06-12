<template>
  <v-card class="elevation-10 conteiner">
    <!-- titulo -->
    <v-card-title>
      <h1 class="titleinf">Catalogo de Documentos</h1>
    </v-card-title>
    <!-- filtros -->
    <div class="filters-org row-left">
      <v-select v-model="filterState" :items="keys" label="Estado" clearable hide-details></v-select>
      <v-autocomplete
        v-model="filterDocument"
        v-bind="lang"
        :items="documentType"
        label="Tipo de Documento"
        clearable
      ></v-autocomplete>
      <v-text-field
        v-model="filterSearch"
        append-icon="mdi-magnify"
        label="Nombre"
        single-line
        hide-details
        clearable
      ></v-text-field>
      <v-text-field
        v-model="filterPrefix"
        append-icon="mdi-magnify"
        label="Prefijo"
        single-line
        hide-details
        clearable
      ></v-text-field>
      <v-text-field
        v-model="filterSufix"
        append-icon="mdi-magnify"
        label="Sufijo"
        single-line
        hide-details
        clearable
      ></v-text-field>
    </div>
    <!-- tabla -->
    <v-data-table
      v-bind="lang"
      :headers="headers"
      :items="catalogDocument"
      :items-per-page="5"
      class="elevation-2"
    >
      <template v-slot:item.gbl_status_id="{ item }">
        <div class="act" v-if="item.gbl_status_id=='1'">
          <v-icon medium color="success">mdi-checkbox-blank-circle</v-icon>
        </div>

        <div class="act" v-if="item.gbl_status_id=='0'">
          <v-icon medium>mdi-checkbox-blank-circle</v-icon>
        </div>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="act">
          <v-icon @click="openShowItem(item)" large>mdi-eye</v-icon>
        </div>
      </template>

      <template v-slot:no-data>
        <h5>No se encontraron datos</h5>
      </template>
    </v-data-table>

    <template class="btn-create">
      <v-btn @click="openCreateItem" fab class="primary">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>

    <!-- detalles y crear -->
    <template class="modal-show">
      <v-dialog v-model="show" persistent max-width="600px">
        <v-stepper v-model="pag">
          <v-stepper-items>
            <!-- mostrar detalles -->
            <v-stepper-content step="1">
              <v-card class="show-text">
                <v-card-title>
                  <h3 class="titleinf slot">Informacion General</h3>
                </v-card-title>
                <br />
                <v-card-text class="show-catalog">
                  <div class="title-slot">
                    <h4>{{showedItem.description}}</h4>

                    <div class="controls-slot">
                      <v-switch
                        v-model="showedItem.gbl_status_id"
                        color="success"
                        true-value="1"
                        false-value="0"
                        @change="createEditItem()"
                        hide-details
                      ></v-switch>

                      <v-btn width="25" height="25" icon>
                        <v-icon @click="openEditItem()" medium>mdi-pencil</v-icon>
                      </v-btn>

                      <v-btn width="25" height="25" icon>
                        <v-icon @click="openDeleteItem()" medium>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <br />
                  <p>
                    <b class="text-slot">Tipo:</b>
                    {{showedItem.gbl_document_type_name }}
                  </p>
                  <p>
                    <b class="text-slot">Prefijo:</b>
                    {{showedItem.prefix}}
                  </p>
                  <p>
                    <b class="text-slot">Sufijo:</b>
                    {{showedItem.suffix}}
                  </p>
                  <p>
                    <b class="text-slot">Numero de digitos:</b>
                    {{showedItem.num_digits}}
                  </p>
                  <v-divider></v-divider>
                  <div class="title-slot">
                    <h6>Impresion</h6>
                  </div>
                  <br />
                  <p>
                    <b class="text-slot">Tipo:</b>
                    {{showedItem.type }}
                  </p>
                  <p>
                    <b class="text-slot">Nombre:</b>
                    {{showedItem.method}}
                  </p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">Regresar</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>

            <!-- crear editar-->
            <v-stepper-content step="2">
              <v-card>
                <form action @submit="createEditItem(editedItem)">
                  <v-card-title>
                    <span class="headline">{{formTitle}}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-col>
                        <v-row>
                          <v-autocomplete
                            v-model="editedItem.gbl_document_type_id"
                            :items="documentTypeList"
                            item-text="gbl_document_type_name"
                            item-value="gbl_document_type_id"
                            label="Tipo de documento"
                            hint
                            @change="changeDocumentType"
                          ></v-autocomplete>
                        </v-row>

                        <v-row>
                          <v-text-field v-model="editedItem.description" label="Nombre" hint></v-text-field>
                        </v-row>

                        <v-row>
                          <v-text-field v-model="editedItem.prefix" label="Prefijo" hint></v-text-field>
                        </v-row>

                        <v-row>
                          <v-text-field v-model="editedItem.suffix" label="Sufijo" hint></v-text-field>
                        </v-row>

                        <v-row>
                          <v-text-field
                            v-model="editedItem.num_digits"
                            label="Numero de digitos"
                            type="number"
                            hint
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-switch
                            v-model="editedItem.gbl_status_id"
                            true-value="1"
                            false-value="0"
                            color="success"
                            :label="`Estado: ${editedItem.gbl_status_id=='1'?'Activo':'No activo'}`"
                          ></v-switch>
                        </v-row>
                      </v-col>
                      <v-divider></v-divider>
                      <h6>Datos de impresion</h6>

                      <v-col>
                        <v-row>
                          <v-autocomplete
                            v-model="editedItem.type"
                            :items="typeList"
                            label="Tipo"
                            hint
                          ></v-autocomplete>
                        </v-row>
                        <v-row>
                          <v-text-field v-model="editedItem.method" label="Nombre" hint></v-text-field>
                        </v-row>
                      </v-col>
                    </v-container>
                    <small>*estos campos son requeridos</small>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="editedItem.id? pag=1: close()"
                    >Cancelar</v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click.prevent="createEditItem(editedItem)"
                    >Guardar</v-btn>
                  </v-card-actions>
                </form>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-dialog>
    </template>
  </v-card>
</template>




<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    lang: {
      "footer-props": {
        "items-per-page-options": [5, 10, 20, -1],
        "items-per-page-text": "Resultado por pagina:",
        "items-per-page-all-text": "Todo",
        "page-text": "{0} - {1} de {2}"
      },
      "no-results-text": "No se encontraron resultados",
      "no-data-text": "No se encontraron datos"
    },
    keys: [
      { text: "Activo", value: "1" },
      { text: "No activo", value: "0" }
    ],
    typeList: ["dompdf", "jasper", "posjava"],
    filterState: undefined,
    filterSearch: "",
    filterDocument: "",
    filterSufix: "",
    filterPrefix: "",
    pag: 0,
    show: false,
    editedItem: {},
    showedItem: {},
    deletedItem: {},
    formTitle: "",
    documentTypeList: [],
    erroresFormulario: []
  }),

  created() {
    this.$store.dispatch("fetchCatalogDocument").then(data => {});
  },

  methods: {
    createEditItem(cd) {
      this.erroresFormulario = [];
      if (!cd.id) {
        this.$store.dispatch("createCatalogDocument", cd).then(data => {
          if (data != undefined) {
            this.erroresFormulario = data;
          }
          if (this.erroresFormulario.length == 0) {
            this.close();
          }
        });
      } else {
        this.$store.dispatch("editCatalogDocument", cd).then(data => {
          if (data != undefined) {
            this.erroresFormulario = data;
          }
          if (this.erroresFormulario.length == 0) {
            this.close();
          }
        });
      }
    },
    deleteItem() {},

    openCreateItem() {
      this.$store.dispatch("fetchDocumentType").then(data => {
        this.documentTypeList = data;
      });
      this.editedItem = {
        gbl_status_id: "1",
        lang:"es_CO"
      };
      this.formTitle = "Crear Catalogo";
      this.pag = 2;
      this.show = true;
    },

    openEditItem() {
      this.$store.dispatch("fetchDocumentType").then(data => {
        this.documentTypeList = data;
      });
      this.editedItem = {
        ...this.showedItem
      };
      this.formTitle = "Editar Catalogo";
      this.pag = 2;
      this.show = true;
    },
    openDeleteItem() {},

    openShowItem(item) {
      this.showedItem = item;
      this.pag = 1;
      this.show = true;
    },

    close() {
      this.show = false;
    },

    changeDocumentType() {
      var index = this.documentTypeList.findIndex(
        item =>
          item.gbl_document_type_id == this.editedItem.gbl_document_type_id
      );
      this.editedItem.gbl_document_type_name = this.documentTypeList[
        index
      ].gbl_document_type_name;
    },

    filterSearchFunction(value) {
      if (!this.filterSearch) {
        return true;
      }
      return value.toLowerCase().includes(this.filterSearch.toLowerCase());
    },
    filterDocumentFunction(value) {
      if (!this.filterDocument) {
        return true;
      }
      return value.toLowerCase().includes(this.filterDocument.toLowerCase());
    },
    filterSufixFunction(value) {
      if (!this.filterSufix) {
        return true;
      }
      return value.toLowerCase().includes(this.filterSufix.toLowerCase());
    },
    filterPrefixFunction(value) {
      if (!this.filterPrefix) {
        return true;
      }
      return value.toLowerCase().includes(this.filterPrefix.toLowerCase());
    },
    filterStateFunction(value) {
      if (!this.filterState) {
        return true;
      }
      return value === this.filterState;
    }
  },

  computed: {
    ...mapGetters(["catalogDocument"]),

    documentType() {
      const data = [];

      this.catalogDocument.forEach(item => {
        data.push(item.gbl_document_type_name);
      });
      return data;
    },
    headers() {
      return [
        {
          text: "Estado",
          align: "start",
          sortable: false,
          value: "gbl_status_id",
          width: "10%",
          filter: this.filterStateFunction
        },

        {
          text: "Nombre",
          align: "start",
          sortable: true,
          value: "description",
          width: "25%",
          filter: this.filterSearchFunction
        },
        {
          text: "Prefijo",
          align: "center",
          sortable: true,
          value: "prefix",
          width: "15%",
          filter: this.filterPrefixFunction
        },
        {
          text: "Sufijo",
          value: "suffix",
          align: "center",
          sortable: true,
          width: "15%",
          filter: this.filterSufixFunction
        },
        {
          text: "Tipo de Documento",
          value: "gbl_document_type_name",
          align: "start",
          sortable: true,
          width: "20%",
          filter: this.filterDocumentFunction
        },
        {
          text: "Acciones",
          value: "actions",
          align: "center",
          sortable: false,
          width: "15%"
        }
      ];
    }
  }
};
</script>