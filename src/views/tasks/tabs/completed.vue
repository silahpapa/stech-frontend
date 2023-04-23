<script setup>
import {ref} from 'vue'
import ShTable from '@/components/ShTable.vue'
import ShRepo from '@/helpers/ShRepo.js'
import {onBeforeMount} from 'vue'
import {useUserStore} from '@/stores/ShUser.js'
import {storeToRefs} from 'pinia'

const userStore = useUserStore()
userStore.setUser()
const { user } = storeToRefs(userStore)

const reload = ref(0)
const actions = ref([])
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
function markComplete (task) {
  const id = task.id
  ShRepo.runPlainRequest('tasks/mark-complete/'+id ,'Are you sure you want to mark this task as complete?')
      .then(res=>{
        if(res.isConfirmed){
          ShRepo.showToast('Task marked as complete successfully', 'success')
          reload.value++
        }
      })
      .catch(err=>console.log(err))
}
onBeforeMount(()=>{
  actions.value  = user.value.role === 'admin'
      ?
      [
        {
          label: 'Edit',
          icon: 'bi-eye',
          class: 'btn w-75  btn-outline-primary btn-sm me-1',
          type: 'emmit',
          path: 'tasks/details/{id}'
        },
        {
          label: 'Approve',
          icon: 'bi-marker',
          class: 'btn w-75  btn-outline-danger btn-sm me-1',
          type: 'emmit',
          path: 'tasks/approve/{id}'
        }
      ]
      : [
        {
          label: 'View Task',
          icon: 'bi-marker',
          class: 'btn w-75  btn-outline-danger btn-sm me-1',
          type: 'emmit',
          path: 'tasks/view/{id}'
        }
      ];
})
</script>
<template>
  <sh-table
      :headers="['id','name','description','created_at']"
      :dates="['created_at']"
      :reload="reload"
      :end-point="'tasks/list/completed'"
      :actions="{
        label: 'Actions',
        actions: actions
      }"
  ></sh-table>
</template>
<style scoped>

</style>
