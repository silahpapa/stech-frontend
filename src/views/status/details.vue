<script setup>
import ShForm from '@/components/ShForm.vue'
import shRepo from '@/helpers/ShRepo.js'
import shApis from '@/helpers/ShApis.js'
import {onBeforeMount,ref,reactive} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

const status = ref(null)
const status_id = route.params.id
function getstatus() {
  shApis.doGet('status/'+route.params.id)
      .then(res=>{
        status.value = res.data
      })
      .catch(err=>console.log(err))
}
function updatestatus (res) {
  shRepo.showToast('status details update successfully', 'success')
}
onBeforeMount(()=>{
  getstatus()
})

</script>
<template>
    <sh-form
        :current-data="status"
        :success-callback="updatestatus"
        :action="'status/'+status_id"
        :fields="['name']"></sh-form>
</template>

<style scoped>
</style>
