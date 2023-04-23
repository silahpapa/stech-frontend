<script setup>
import ShTable from '@/components/ShTable.vue'
</script>
<template>
  <sh-table
      :headers="['id','name','description','remarks','deleted_at']"
      :dates="['deleted_at']"
      :end-point="'tasks/list/deleted'"
  ></sh-table>
</template>
<style scoped>

</style>
