<script setup>
import ShTable from '@/components/ShTable.vue'


</script>
<template>
  <sh-table
      :headers="['id','name','description','remarks']"
      :dates="['created_at']"
      :reload="reload"
      :end-point="'tasks/list/approved'"
  ></sh-table>
</template>
<style scoped>

</style>
