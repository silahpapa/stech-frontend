<script setup>
import ShRoutePopups  from '@/components/popups/ShRoutePopups.vue'
import {useUserStore} from '@/stores/ShUser.js'
import Layout from '@/views/layouts/Layout.vue'
import {onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const notFoundLayout = ref(false)
const { user } = storeToRefs(userStore)
onMounted(() => {
  userStore.setUser()
})
</script>

<template>
  <div v-if="user" >
    <Layout />
  </div>
  <div v-else>
    <router-view />
  </div>
  <sh-route-popups/>
</template>

<style scoped>
</style>
