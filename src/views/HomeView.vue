<script setup>
import {useRoute, useRouter} from 'vue-router'
import {useUserStore} from '@/stores/ShUser.js'
import {storeToRefs} from 'pinia'
import {onMounted} from 'vue'

const userStore = useUserStore()
userStore.setUser()
const {user} = storeToRefs(userStore)
const route = useRoute()
const router = useRouter()
onMounted(async ()=>{
  if(user.value) {
    router.push('/dashboard')
  } else {
    router.push('/login')
  }
})
</script>

<template>


</template>
