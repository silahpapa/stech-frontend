<script setup>
import ShForm from '@/components/ShForm.vue'
import shRepo from '@/helpers/ShRepo.js'
import shApis from '@/helpers/ShApis.js'
import {onBeforeMount,ref,reactive} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

const tasks = ref(null)
const task_id = route.params.id
function gettasks() {
  shApis.doGet('tasks/get/'+task_id)
      .then(res=>{
        console.log(res.data)
        tasks.value = res.data.data
      })
      .catch(err=>console.log(err))
}
function updatetasks (res) {
  shRepo.showToast('tasks details update successfully', 'success')
}
onBeforeMount(()=>{
  gettasks()
})

</script>
<template>
  <ShForm
      :success-callback="updatetasks"
      @updatetasks="updatetasks"
      :current-data="tasks"
      :labels="{status_id:'Select Status'}"
      :fields="['name','due_date','description']"
      :action="'tasks/store/'+task_id"
      :fill-selects="{
            status_id: {
              data: [
                  {
                    id: 1,
                     name: 'Pending'
                  },
                  {
                    id: 2,
                    name: 'Active'
                   }
                ]
               }
            }"
      :datePickers="['due_date']"
  ></ShForm>
</template>

<style scoped>

</style>
