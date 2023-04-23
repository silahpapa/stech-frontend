<script setup>
import ShForm from '@/components/ShForm.vue'
import shRepo from '@/helpers/ShRepo.js'
import shApis from '@/helpers/ShApis.js'
import { onBeforeMount, ref} from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const tasks = ref(null)
const users = ref(null)
const task_id = route.params.id
function gettasks() {
  shApis.doGet('tasks/get/'+task_id)
      .then(res=>{
        console.log(res.data)
        tasks.value = res.data.data
      })
      .catch(err=>console.log(err))
}
function getUsers() {
  shApis.doGet('users')
      .then(res => {
        users.value = res.data.data
      })
      .catch(err => console.log(err))
}
function assignedUser (res) {
  shRepo.showToast('tasks details update successfully', 'success')
}
onBeforeMount(()=>{
  gettasks()
  getUsers()
})

</script>
<template>
  <ShForm
      :success-callback="assignedUser"
      @assignedUser="assignedUser"
      :labels="{user_id:'Select User'}"
      :fields="['user_id','start_time','end_time','remarks']"
      :datePickers="['start_time','end_time']"
      :text-areas ="['remarks']"
      :action="'tasks/assign/'+task_id"
      v-if="users"
      :fill-selects="{
            user_id: {
               suggest: true,
              data: users
               }
            }"
  ></ShForm>
</template>

<style scoped>

</style>
