import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from  '../views/Home.vue'
import ProfileTypePage from '../views/ProfileTypePage.vue'
import SlotTypePage from '../views/SlotTypePage.vue'
import SlotTypeDetailsPage from '../views/SlotTypeDetailsPage.vue'
import OrgStructurePage from '../views/OrgStructurePage.vue'
import CatalogDocumentPage from '../views/CatalogDocumentPage.vue'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profileType',
      name: 'profiletype',
      component: ProfileTypePage
  },
  {
      path: '/slotType',
      name: 'slottype',
      component: SlotTypePage
  },
  {
      path: '/slotTypeDetails',
      name: 'slottypedetails',
      component: SlotTypeDetailsPage
  },
  {
      path: '/organizationalStructure',
      name: 'orgstructure',
      component: OrgStructurePage
  },  {
    path: '/catalogDocument',
    name: 'catalogdocument',
    component: CatalogDocumentPage
},


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
