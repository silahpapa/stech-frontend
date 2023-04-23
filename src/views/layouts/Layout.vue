<script setup>
import {inject, onBeforeMount, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import SideBar from "./Sidebar.vue";
import {useUserStore} from '@/stores/ShUser.js'
import {storeToRefs} from 'pinia'
const global = inject('global')
function logout(){
  global.logoutUser();
}
let userStore = useUserStore()
userStore.setUser()
const {user} = storeToRefs(userStore)

const route = useRoute()
const router = useRouter()
let reload = ref(0)
let item = ''
onBeforeMount(()=>{
  const url = window.location.href;
  let firstParam = url.split("/")[3];
  item = firstParam.charAt(0).toUpperCase() + firstParam.slice(1)
})
router.afterEach((to, from) => {
  setTimeout(()=>{
    const url = window.location.href;
    let firstParam = url.split("/")[3];
    item = firstParam.charAt(0).toUpperCase() + firstParam.slice(1)
    reload.value +=1
  },100)
});
</script>
<template>
  <div id="app" class="g-sidenav-show" data-v-app="">
    <div class="landing-bg h-100 bg-gradient-primary position-fixed w-100" style="display: none;"></div>
    <div class="min-height-300 position-absolute w-100 bg-success"></div>
    <side-bar />
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
      <!-- nav -->`
      <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl px-0 mx-4 px-0 mx-4" id="navbarBlur" data-scroll="true">
        <div class="px-3 py-1 container-fluid">
          <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4 me-sm-4" id="navbar">
            <div class="pe-md-3 d-flex align-items-center ms-md-auto">
              <div class="input-group"><span class="input-group-text text-body"><i class="fas fa-search" aria-hidden="true"></i></span><input type="text" class="form-control" placeholder="Type here..."></div>
            </div>
            <ul class="navbar-nav justify-content-end">
              <li class="nav-item d-flex align-items-center">
                <router-link :to="'/user/profile'" class="px-0 nav-link font-weight-bold text-white" >
                  <i class="fa fa-user me-sm-2" aria-hidden="true">
                  </i><span class="d-sm-inline d-none">Profile</span>
                </router-link></li>
              <li class="px-3 nav-item d-flex align-items-center">
                <a class="p-0 nav-link text-white" @click="logout" >
                <i class="cursor-pointer fa fa-sign-out fixed-plugin-button-nav" aria-hidden="true">Logout</i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        <div class=" row">
          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="mb-2" v-if="reload">{{item}} Section</h5>
                 <router-view />
              </div>
            </div>
          </div>
        </div>
    </main>
  </div>
</template>

