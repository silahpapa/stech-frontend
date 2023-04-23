<script setup>
import shRepo from '@/helpers/ShRepo.js'
import shApis from '@/helpers/ShApis.js'
import {onBeforeMount,ref} from 'vue'
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
onBeforeMount(()=>{
  gettasks()
})

</script>
<template>
  <div class="container" v-if="tasks">
    <div class="row">
      <div class="col-10 mx-auto">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{tasks.name}}</h5>
            <table class="table">
              <thead class="thead-light">
              <tr>
                <th scope="col">Name</th>
                <td>{{ tasks.name }}</td>
              </tr>
              <tr>
                <th scope="col">Description</th>
                <td>{{ tasks.description }}</td>
              </tr>
              <tr>
                <th scope="col">Created at</th>
                <td>{{ tasks.created_at }}</td>
              </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
