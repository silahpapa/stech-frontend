<script setup>
  import {useUserStore} from '@/stores/ShUser.js'
import {storeToRefs} from 'pinia'
  import {inject, ref, onMounted, capitalize} from 'vue'
import {useRoute} from 'vue-router'
import  adminMenus from '../../menus/adminMenus.js'
import  usersMenu from '../../menus/usersMenus.js'

let userStore = useUserStore()
userStore.setUser()
let menus = ref([])
let usersMenus = ref([])
const route = useRoute()
const {user} = storeToRefs(userStore)
const global = inject('global')
function logout(){
  global.logoutUser();
}
function setMenus(){
    menus.value = adminMenus
  usersMenus.value = usersMenu
}
onMounted(() => {
  setMenus()
})
</script>
<template>
  <aside class="my-3 overflow-auto border-0 sidenav navbar navbar-vertical navbar-expand-xs border-radius-xl fixed-start ms-3
      bg-white" id="sidenav-main">
    <div class="sidenav-header"><i class="top-0 p-3 cursor-pointer fas fa-times text-secondary opacity-5 position-absolute end-0 d-none d-xl-none" aria-hidden="true" id="iconSidenav">
    </i>
      <router-link to="/" class="m-0 navbar-brand">
        <img src="../../assets/img/logo-ct-dark.png" class="navbar-brand-img h-100" alt="main_logo">
        <span class="ms-2 font-weight-bold me-2">
          {{capitalize(user.role)}}
        Dashboard</span></router-link>
    </div>
    <hr class="mt-0 horizontal dark">
    <div class="collapse navbar-collapse w-auto h-auto h-100" id="sidenav-collapse-main">
      <ul class="navbar-nav">
        <template v-if="user.role==='admin'" v-for="menu in menus" :key="menu.slug">
           <li class="nav-item" v-if="menu.type === 'single'">
          <router-link   class="nav-link"  :class="route.fullPath == menu.path ? 'active' : ''"  :to="menu.path" aria-current="page">
            <div class="icon-sm icon text-center d-flex align-items-center justify-content-center" :class="menu.shape">
              <i class="ni text-sm opacity-10" :class="menu.icon"></i>
            </div>
            <span class="nav-link-text ms-1">{{ menu.label }}</span>
          </router-link>
        </li>
        </template>
        <template v-if="user.role==='user'" v-for="menu in usersMenus" :key="menu.slug">
           <li class="nav-item" v-if="menu.type === 'single'">
          <router-link   class="nav-link"  :class="route.fullPath == menu.path ? 'active' : ''"  :to="menu.path" aria-current="page">
            <div class="icon-sm icon text-center d-flex align-items-center justify-content-center" :class="menu.shape">
              <i class="ni text-sm opacity-10" :class="menu.icon"></i>
            </div>
            <span class="nav-link-text ms-1">{{ menu.label }}</span>
          </router-link>
        </li>
        </template>
      </ul>
    </div>
  </aside>
</template>

<style scoped>

</style>
