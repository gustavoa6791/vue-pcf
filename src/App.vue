<template>
<div id="app">
  h
  <v-app id="inspire">

    <v-navigation-drawer  v-model="drawer" clipped  class="elevation-10" app>
      <v-list dense>

        <template v-for="item in items">
            <router-link :to="{name: item.page }" :key="item.text" >
          <v-list-item  link>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          </router-link> 
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar clipped-left class="elevation-10" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-img
        src="https://oplus.pacificmedicalsuite.com/pacific-saas/images/home/pms-logo.png"
        position="start"
        height="35px"
        contain
      ></v-img>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon x-large>mdi-account-circle</v-icon>
      </v-btn>
    </v-app-bar>


     <v-content >
      <router-view/>
    </v-content>

  </v-app>
</div>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    items: [
      { icon: "mdi-contacts", text: "Tipos de perfiles", page : "profiletype"},
      { icon: "mdi-microscope", text: "Tipos de consulta" , page : "slottype"},
      { icon: "mdi-file-tree", text: "Estructura organizacional" , page : "orgstructure"},
       { icon: "mdi-file-document", text: "Catalogo de documentos" , page : "catalogdocument"},
  
    ]
  })
};
</script>

 
    <!-- modal 

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
  -->