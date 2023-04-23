<script setup>
import ShForm from '@/components/ShForm.vue'
import shRepo from '@/helpers/ShRepo.js'
import { useRoute } from 'vue-router'
const route = useRoute()
const task_id = route.params.id

function addRemarks (res) {
  shRepo.showToast('Task approved', 'success')
}

</script>
<template>
  <ShForm
      :success-callback="addRemarks"
      @addRemarks="addRemarks"
      :fields="['remarks']"
      :text-areas ="['remarks']"
      :action="'tasks/approve/'+task_id"
  ></ShForm>
</template>

<style scoped>

</style>
