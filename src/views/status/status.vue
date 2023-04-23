<script setup>
import ShForm from '@/components/ShForm.vue'
import ShModal from '@/components/ShModal.vue'
import ShTable from '@/components/ShTable.vue'
import shRepo from '@/helpers/ShRepo.js'
import {ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'

const route = useRoute()
const router = useRouter()

const reload = ref(0)
const editBtn = ref(null)
function deleteStatus (status) {
  const id = status.id
  shRepo.runPlainRequest('status/delete/'+id,'Are you sure you want to delete this status?')
      .then(res=>{
        if (res.isConfirmed) {
          reload.value +=1
          shRepo.showToast('status deleted successfully')
        }
      }).catch(err=>console.log(err))
}
function statusSaved (res) {
  shRepo.showToast('status saved successfully', 'success')
  reload.value +=1
}

</script>
<template>
  <a href="#status_modal" ref="editBtn" data-bs-toggle="modal" class="btn btn-primary"><i class="fa fa-plus"></i> Add  Status</a>
  <ShModal modal-id="status_modal" modal-title="Status Form">
    <ShForm
            :success-callback="statusSaved"
            @statusSaved="statusSaved"
            :labels="{name:'Enter name of status'}"
            :fields="['name']"
            action="status"
    ></ShForm>
  </ShModal>
  <sh-table
      :headers="['id','name']"
      :reload="reload"
      :end-point="'status'"
      :actions="{
        label: 'Actions',
        actions:[

             {
               label: 'Edit',
              icon: 'bi-eye',
              class: 'btn w-75  btn-outline-primary btn-sm me-1',
              type: 'emmit',
              path: 'status/details/{id}'
            },
            {
               label: 'Delete',
              icon: 'bi-eye',
              class: 'btn w-75  btn-outline-danger btn-sm me-1',
              type: 'emmiter',
              emits: deleteStatus,
            },
        ]
      }"
  ></sh-table>
</template>

<style scoped>

</style>
