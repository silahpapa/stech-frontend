<script setup>
import useUserStore from '@/stores/ShUser.js'
import {storeToRefs} from 'pinia'

let userStore = useUserStore()
userStore.setUser()
const {user} = storeToRefs(userStore)

</script>
<template>
  <div class="row">
    <div class="card p-2">
      <div class="card col-3 shadow">
        <div class="card-body">
          <h5>{{ user.name }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
