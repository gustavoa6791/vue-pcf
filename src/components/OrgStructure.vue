<template >
  <v-card class="elevation-10 conteiner" max-width="1000">
    <v-spacer></v-spacer>
    <br />
    <v-card-title>
      <div>
        <v-row>
          <v-col>
            <h1 class="titleinf">Estructura Organizacional</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <div class="filters-org row-left">
              <v-select v-model="filterState" :items="keys" label="Estado" clearable hide-details></v-select>
              <v-autocomplete
                v-model="filterSede"
                v-bind="lang"
                :items="orgStructure"
                item-text="name"
                label="Sede"
                clearable
              ></v-autocomplete>
              <v-autocomplete
                v-model="filterAdmision"
                v-bind="lang"
                :items="admissionPoints"
                item-text="name"
                @change="expandcontent"
                label="Punto de Admision"
                clearable
              ></v-autocomplete>

              <v-text-field
                v-model="filterSearch"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
                clearable
              ></v-text-field>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <div class="row-left">
            <v-btn small v-if="!isExpand" @click="all" color="primary">Expandir</v-btn>
            <v-btn small v-else @click="none" color="primary">Contraer</v-btn>
          </div>
        </v-row>
      </div>
    </v-card-title>

    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel v-for="(item,i) in filterOrgStructure" :key="i">
        <v-expansion-panel-header>
          <template v-slot:default="{ open }">
            <div>
              <v-fade-transition>
                <div v-if="open">
                  <v-row>
                    <v-col>Sede</v-col>
                    <v-col>Punto de Admision</v-col>
                    <v-col>Punto de Atencion</v-col>
                    <br />
                  </v-row>
                </div>
              </v-fade-transition>

              <v-row>
                <v-col>
                  <div class="headStructure">
                    <div v-if="item.gbl_status_id=='1'" height="35px">
                      <v-icon medium color="success">mdi-checkbox-blank-circle</v-icon>
                    </div>
                    <div v-if="item.gbl_status_id=='0'">
                      <v-icon medium>mdi-checkbox-blank-circle</v-icon>
                    </div>
                    <v-btn @click="showItem('Sede','sede', item )" large icon>
                      <v-icon medium>mdi-eye</v-icon>
                    </v-btn>
                    <div>{{item.name}}</div>
                    <div></div>
                  </div>
                </v-col>
              </v-row>
            </div>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-data-table
            :headers="headers"
            :items="item.admission"
            show-expand
            hide-default-footer
            class="table-structure"
            :expanded="panelAdm"
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
                <v-btn large icon>
                  <v-icon @click="showItem('Punto de Admision','admision', item )" medium>mdi-eye</v-icon>
                </v-btn>
              </div>
            </template>
            <template v-slot:no-data>
              <v-btn x-small class="primary" fab>
                <v-icon @click="openAdmission('Crear Punto de Admision',null,item)" small>mdi-plus</v-icon>
              </v-btn>
            </template>

            <template v-slot:expanded-item="{ headers, item }">
              <td class="tab-structure" :colspan="headers.length">
                <v-data-table
                  :headers="headersAtt"
                  :items="item.attention"
                  hide-default-footer
                  class="table-structure"
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
                      <v-btn large icon>
                        <v-icon
                          @click="showItem('Punto de Atención','atencion', item )"
                          medium
                        >mdi-eye</v-icon>
                      </v-btn>
                    </div>
                  </template>
                  <template v-slot:no-data>
                    <v-btn x-small class="primary" fab>
                      <v-icon
                        @click="openAttention('Crear Punto de Atenciòn',null, item)"
                        small
                      >mdi-plus</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </td>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <template class="btn-create">
      <v-btn @click="openSede('Crear Sede')" class="primary" fab>
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </template>

    <!-- modal -->
    <template class="modal-createEdit">
      <v-dialog v-model="createEdit" persistent max-width="600px">
        <v-card>
          <form action @submit="createSede(editedItem)">
            <v-card-title>
              <span class="headline">{{formTitle}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-col>
                  <v-row>
                    <v-text-field
                      :error-messages="codeErrors"
                      v-model="editedItem.code"
                      label="Codigo *"
                      hint="Agrega un Codigo"
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-text-field
                      :error-messages="nameErrors"
                      v-model="editedItem.name"
                      label="Nombre *"
                      hint="Agrega un Nombre"
                    ></v-text-field>
                  </v-row>
                  <v-row>
                    <v-textarea
                      :error-messages="descriptionErrors"
                      v-model="editedItem.description"
                      label="Descripciòn"
                      hint="Agrega una Descripciòn"
                    ></v-textarea>
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
              </v-container>
              <small>*estos campos son requeridos</small>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" text @click.prevent="createSede(editedItem)">Guardar</v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>
    </template>
    <!--  -->
    <!-- modal -->
    <template class="modal-show">
      <v-dialog v-model="show" persistent max-width="600px">
        <v-stepper v-model="pag">
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-card class="show-text">
                <v-card-title>
                  <h3 class="titleinf slot">{{formTitle}}</h3>
                </v-card-title>
                <br />
                <v-card-text class="show-text">
                  <div class="title-slot">
                    <h4>{{type=='sede'? showedItem.code + " - ":""}}{{showedItem.name}}</h4>
                    <div class="controls-slot">
                      <v-switch
                        v-model="showedItem.gbl_status_id"
                        color="success"
                        true-value="1"
                        false-value="0"
                        @change="type=='sede'? createSede(showedItem, true):createAdmOrAtt(showedItem , true)"
                        hide-details
                      ></v-switch>
                      <v-btn v-if="type=='sede'" width="25" height="25" icon>
                        <v-icon @click="openSede('Editar Sede',showedItem)" medium>mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn v-if="type=='admision'" width="25" height="25" icon>
                        <v-icon
                          @click="openAdmission('Editar Punto de Admision',showedItem)"
                          medium
                        >mdi-pencil</v-icon>
                      </v-btn>
                      <v-btn v-if="type=='atencion'" width="25" height="25" icon>
                        <v-icon
                          @click="openAttention('Editar Punto de Atencion',showedItem)"
                          medium
                        >mdi-pencil</v-icon>
                      </v-btn>

                      <v-btn width="25" height="25" icon>
                        <v-icon @click="openDelete(showedItem, type)" medium>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <p>
                    <br />
                    <b class="text-slot">Descripcion:</b>
                    {{showedItem.description}}
                    <br />
                  </p>
                  <div v-if="type=='sede'">
                    <div class="d-flex mx-5 mb-3 justify-content-between">
                      <div>
                        <h6>Permisos:</h6>
                      </div>
                      <div>
                        <v-btn right small class="primary" fab>
                          <v-icon @click="openPermission" dark>mdi-plus</v-icon>
                        </v-btn>
                      </div>
                    </div>

                    <v-data-table
                      v-bind="lang"
                      :headers="headersPermission"
                      :items="showedItem.permission"
                      dense
                      :items-per-page="5"
                      class="elevation-2"
                    ></v-data-table>
                    <v-btn
                      color="primary"
                      @click="openAdmission('Crear Punto de Admision',null,showedItem)"
                      dark
                    >Agregar punto de Admision</v-btn>
                  </div>
                  <div v-if="type=='admision'">
                    <br />
                    <v-divider></v-divider>
                    <br />
                    <br />

                    <v-btn
                      color="primary"
                      @click="openAttention('Crear Punto de Atencion',null,showedItem)"
                      dark
                    >Agregar punto de Atenciòn</v-btn>
                  </div>
                  <div v-if="type=='atencion'">
                    <br />
                    <v-divider></v-divider>
                    <br />
                    <br />
                    <br />
                  </div>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" @click="close" text>Regresar</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card>
                <form action @submit="createAdmOrAtt(editedItem)">
                  <v-card-title>
                    <span class="headline">{{formTitle}}</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container>
                      <v-col>
                        <v-row>
                          <v-text-field
                            :error-messages="nameErrors"
                            v-model="editedItem.name"
                            label="Nombre *"
                            hint="Agrega un Nombre"
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-textarea
                            :error-messages="descriptionErrors"
                            v-model="editedItem.description"
                            label="Descripciòn"
                            hint="Agrega una Descripciòn"
                          ></v-textarea>
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
                    </v-container>
                    <small>*estos campos son requeridos</small>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">Cancelar</v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click.prevent="createAdmOrAtt(editedItem)"
                    >Guardar</v-btn>
                  </v-card-actions>
                </form>
              </v-card>
            </v-stepper-content>
            <v-stepper-content step="3">
              <v-card>
                <v-card-title primary-title>Seleccione Permisos</v-card-title>
                <div class="filters-org show" style="margin-bottom: 15px">
                  <v-text-field
                    v-model="filterUsername"
                    append-icon="mdi-magnify"
                    label="Usuario"
                    clearable
                    hide-details
                    dense
                  ></v-text-field>
                  <v-text-field
                    v-model="filterEntity"
                    append-icon="mdi-magnify"
                    label="Entidad"
                    clearable
                    hide-details
                    dense
                  ></v-text-field>
                </div>
                <v-data-table
                  v-bind="lang"
                  :headers="headersPermission"
                  :items="permissionList"
                  dense
                  :items-per-page="5"
                  class="elevation-2"
                ></v-data-table>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" @click="close" text>Regresar</v-btn>
                  <v-btn color="blue darken-1" @click="close" text>Guardar</v-btn>
                </v-card-actions>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-dialog>
    </template>
    <!--  -->
    <template class="modal-delete">
      <v-dialog v-model="alertdelete" persistent max-width="400px">
        <v-card>
          <v-card-title>
            <span class="headline">Borrar?</span>
          </v-card-title>

          <div class="ver">
            <v-card-text>
              ¿Estas seguro de borrar&nbsp;
              <span v-if="deleteItem.type=='sede'">esta sede ?</span>
              <span v-if="deleteItem.type=='admision'">este Punto de Admision ?</span>
              <span v-if="deleteItem.type=='atencion'">este Punto de Atención ?</span>
            </v-card-text>
          </div>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="alertdelete= false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="deletePoint">Borrar</v-btn>
          </v-card-actions>
        </v-card>
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
    createEdit: false,
    show: false,
    alertdelete: false,
    filterSearch: "",
    filterState: undefined,
    filterSede: "",
    filterAdmision: "",
    filterUsername: "",
    filterEntity: "",
    erroresFormulario: [],
    panel: [],
    panelAdm: [],
    permissionList: [],
    expand: false,
    editedItem: {},
    showedItem: {},
    deleteItem: {},
    formTitle: "",
    type: "",
    pag: 0
  }),

  mounted() {
    this.$store.dispatch("fetchOrgStructure");
  },

  methods: {
    openSede(title, item) {
      this.erroresFormulario = [];
      this.editedItem = {
        id: item ? item.id : -1,
        code: item ? item.code : "",
        name: item ? item.name : "",
        description: item ? item.description : "",
        gbl_status_id: item ? item.gbl_status_id : "1",
        lang: item ? item.lang : "es_CO",
        admission: item ? item.admission : []
      };
      this.formTitle = title;
      this.createEdit = true;
    },
    createSede(item, isStatus) {
      this.erroresFormulario = [];
      if (item.id == -1) {
        this.$store.dispatch("createOrgStructure", item).then(data => {
          if (data != undefined) {
            this.erroresFormulario = data;
          }
          if (this.erroresFormulario.length == 0) {
            this.close();
          }
        });
      } else {
        this.$store.dispatch("editOrgStructure", item).then(data => {
          if (data != undefined) {
            this.erroresFormulario = data;
          }
          if (this.erroresFormulario.length == 0) {
            isStatus ? "" : this.close();
          }
        });
      }
    },
    openAdmission(title, item, itemFt) {
      this.erroresFormulario = [];
      this.editedItem = {
        gbl_org_structure_id: item
          ? item.gbl_org_structure_id
          : itemFt.gbl_org_structure_id || itemFt.id,
        id: item ? item.id : -1,
        name: item ? item.name : "",
        description: item ? item.description : "",
        gbl_status_id: item ? item.gbl_status_id : "1",
        lang: item ? item.lang : "es_CO",
        attention: item ? item.attention : []
      };
      this.formTitle = title;
      this.pag = 2;
      this.show = true;
    },
    openAttention(title, item, itemFt) {
      this.editedItem = {
        gbl_org_structure_id: item
          ? item.gbl_org_structure_id
          : itemFt.gbl_org_structure_id,
        gbl_admission_point_id: item
          ? item.gbl_admission_point_id
          : itemFt.gbl_admission_point_id || itemFt.id,
        id: item ? item.id : -1,
        name: item ? item.name : "",
        description: item ? item.description : "",
        gbl_status_id: item ? item.gbl_status_id : "1",
        lang: item ? item.lang : "es_CO"
      };
      this.formTitle = title;
      this.pag = 2;
      this.show = true;
    },
    createAdmOrAtt(item, isStatus) {
      var createAction = "";
      var editAction = "";

      item.gbl_admission_point_id
        ? (createAction = "createAttention")
        : (createAction = "createAdmission");
      item.gbl_admission_point_id
        ? (editAction = "editAttention")
        : (editAction = "editAdmission");

      this.erroresFormulario = [];
      if (item.id == -1) {
        this.$store.dispatch(createAction, item).then(data => {
          if (data != undefined) {
            this.erroresFormulario = data;
          }
          if (this.erroresFormulario.length == 0) {
            this.close();
          }
        });
      } else {
        this.$store.dispatch(editAction, item).then(data => {
          if (data != undefined) {
            this.erroresFormulario = data;
          }
          if (this.erroresFormulario.length == 0) {
            isStatus ? "" : this.close();
          }
        });
      }
    },
    openDelete(item, type) {
      this.deleteItem = item;
      this.deleteItem.type = type;
      this.alertdelete = true;
    },
    deletePoint() {
      switch (this.deleteItem.type) {
        case "sede":
          this.$store.dispatch("deleteOrgStructure", this.deleteItem);
          this.close();

          break;
        case "admision":
          this.$store.dispatch("deleteAdmission", this.deleteItem);
          this.close();
          break;
        case "atencion":
          this.$store.dispatch("deleteAttention", this.deleteItem);
          this.close();
          break;
      }
    },
    showItem(title, type, item) {
      this.pag = 1;
      this.type = type;
      this.showedItem = item;
      this.formTitle = title;
      this.show = true;
    },
    openPermission() {
      this.$store.dispatch("fetchPermission").then(data => {
        this.permissionList = data;
      });
      this.pag = 3;
    },
    close() {
      this.alertdelete = false;
      this.createEdit = false;
      this.show = false;
      this.pag = 0;
    },
    all() {
      this.orgStructure.forEach((e, i) => {
        this.panel.push(i);
      });

      this.orgStructure.forEach(os => {
        os.admission.forEach(ad => {
          this.panelAdm.push(ad);
        });
      });
    },
    none() {
      this.panel = [];
      this.panelAdm = [];
    },
    expandcontent() {
      this.panel = [];
      var result = [...this.admissionPoints];
      if (this.filterAdmision) {
        result = result.filter(item => item.name == this.filterAdmision);
        result.forEach(item => {
          this.panel.push(item.indexsede);
        });
      }
    },
    filterSearchFunction(value) {
      if (!this.filterSearch) {
        return true;
      }
      return value.toLowerCase().includes(this.filterSearch.toLowerCase());
    },
    filterAdmissionFunction(value) {
      if (!this.filterAdmision) {
        return true;
      }
      return value.toLowerCase().includes(this.filterAdmision.toLowerCase());
    },
    filterStateFunction(value) {
      if (!this.filterState) {
        return true;
      }
      return value === this.filterState;
    },
    filterUsernameFunction(value) {
      if (!this.filterUsername) {
        return true;
      }
      return value.toLowerCase().includes(this.filterUsername.toLowerCase());
    },
    filterEntityFunction(value) {
      if (!this.filterEntity) {
        return true;
      }
      return value.toLowerCase().includes(this.filterEntity.toLowerCase());
    }
  },

  computed: {
    ...mapGetters(["orgStructure"]),

    filterOrgStructure() {
      var result = [...this.orgStructure];
      if (this.filterState != null && this.filterState != undefined) {
        result = result.filter(item => item.gbl_status_id == this.filterState);
      }
      if (this.filterSede) {
        result = result.filter(item => item.name == this.filterSede);
      }
      if (this.filterSearch) {
        var filtro = this.filterSearch.toLowerCase();
        result = result.filter(item =>
          item.name.toLowerCase().includes(filtro)
        );
      }
      return result;
    },
    isExpand() {
      return this.panel.length == 0 ? false : true;
    },
    headers() {
      return [
        { text: "", sortable: false, width: "25%" },
        {
          text: "",
          sortable: false,
          value: "gbl_status_id",
          width: "35px",
          filter: this.filterStateFunction
        },
        {
          text: "",
          sortable: false,
          value: "actions",
          width: "50px",
          align: "center"
        },
        {
          text: "",
          sortable: false,
          value: "name",
          width: "150px",
          filter: this.filterAdmissionFunction
        },

        {
          text: "",
          sortable: false,
          value: "data-table-expand",
          width: "30%",
          align: "end"
        }
      ];
    },
    headersAtt() {
      return [
        { text: "", sortable: false, width: "55%" },
        {
          text: "",
          sortable: false,
          value: "gbl_status_id",
          width: "35px",
          filter: this.filterStateFunction
        },
        {
          text: "",
          sortable: false,
          value: "actions",
          width: "50px",
          align: "center"
        },
        { text: "", sortable: false, value: "name", width: "150px" }
      ];
    },
    headersPermission() {
      return [
        {
          text: "Usuario",
          sortable: true,
          value: "username",
          width: "30%",
          filter: this.filterUsernameFunction
        },
        {
          text: "Entidad",
          sortable: true,
          value: "entity_name",
          width: "70%",
          filter: this.filterEntityFunction
        }
      ];
    },
    admissionPoints() {
      var attentionPointsList = [];
      this.orgStructure.forEach((os, index) => {
        os.admission.forEach(ad => {
          ad.sede = os.name;
          ad.indexsede = index;
          if (this.filterSede == "" || this.filterSede == undefined) {
            attentionPointsList.push(ad);
          } else {
            if (ad.sede == this.filterSede) {
              attentionPointsList.push(ad);
            }
          }
        });
      });
      return attentionPointsList;
    },
    codeErrors() {
      var e = [];
      if (this.erroresFormulario.code != undefined) {
        var json = JSON.parse(JSON.stringify(this.erroresFormulario.code));
        json.forEach(element => {
          console.log(element);
          switch (element) {
            case "The code has already been taken.":
              e.push("El Codigo ya existe");
              break;
            case "The code field is required.":
              e.push("El campo Codigo es requerido");
              break;
            case "The code may not be greater than 10 characters.":
              e.push("El Codigo no puede tener más de 10 caracteres.");
              break;
            default:
              e.push("ha ocurrido un error");
              break;
          }
        });
      }
      return e;
    },
    nameErrors() {
      var e = [];
      if (this.erroresFormulario.name != undefined) {
        var json = JSON.parse(JSON.stringify(this.erroresFormulario.name));
        json.forEach(element => {
          console.log(element);
          switch (element) {
            case "The name has already been taken.":
              e.push("El nombre ya existe");
              break;
            case "The name field is required.":
              e.push("El campo nombre es requerido");
              break;
            case "The name may not be greater than 50 characters.":
              e.push("El nombre no puede tener más de 50 caracteres.");
              break;
            default:
              e.push("ha ocurrido un error");
              break;
          }
        });
      }
      return e;
    },
    descriptionErrors() {
      var e = [];
      if (this.erroresFormulario.description != undefined) {
        var json = JSON.parse(
          JSON.stringify(this.erroresFormulario.description)
        );
        json.forEach(element => {
          console.log(element);
          switch (element) {
            case "The description field is required.":
              e.push("El campo descripciòn es requerido");
              break;
            case "The description may not be greater than 250 characters.":
              e.push("El descripciòn no puede tener más de 250 caracteres.");
              break;
            default:
              e.push("ha ocurrido un error");
              break;
          }
        });
      }
      return e;
    }
  }
};
</script>