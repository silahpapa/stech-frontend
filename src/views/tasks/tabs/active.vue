<script setup>
import {ref} from 'vue'
import ShTable from '@/components/ShTable.vue'
import ShRepo from '@/helpers/ShRepo.js'

const reload = ref(0)

function deleteTask (task) {
  const id = task.id
  ShRepo.runPlainRequest('tasks/delete/'+id,'Are you sure you want to delete this task?')
      .then(res=>{
        if(res.isConfirmed){
          ShRepo.showToast('Task deleted successfully', 'success')
          reload.value++
        }
      })
      .catch(err=>console.log(err))
}
</script>
<template>
  <sh-table
      :headers="['id','name','description','created_at']"
      :dates="['created_at']"
      :reload="reload"
      :end-point="'tasks/list/active'"
      :actions="{
        label: 'Actions',
        actions:[
             {
               label: 'Edit',
              icon: 'bi-eye',
              class: 'btn w-75  btn-outline-primary btn-sm me-1',
              type: 'emmit',
              path: 'tasks/details/{id}'
            },
            {
               label: 'Assign',
              icon: 'bi-marker',
              class: 'btn w-75  btn-outline-danger btn-sm me-1',
              type: 'emmit',
              path: 'tasks/assign/{id}'
            },
            {
               label: 'Delete',
              icon: 'bi-eye',
              class: 'btn w-75  btn-outline-danger btn-sm me-1',
              type: 'emmiter',
              emits: deleteTask,
            },
        ]
      }"
  ></sh-table>


</template>

<style scoped>

</style>
