<script setup>
import ShDynamicTabs from '@/components/ShDynamicTabs.vue'
import ShForm from '@/components/ShForm.vue'
import ShModal from '@/components/ShModal.vue'
import {storeToRefs} from 'pinia'
import {useUserStore} from '@/stores/ShUser.js'
import Pending from '@/views/tasks/tabs/pending.vue'
import Active from '@/views/tasks/tabs/active.vue'
import InProgress from '@/views/tasks/tabs/inProgress.vue'
import Completed from '@/views/tasks/tabs/completed.vue'
import Revision from '@/views/tasks/tabs/revision.vue'
import Deleted from '@/views/tasks/tabs/deleted.vue'
import approved from '@/views/tasks/tabs/approved.vue'
import {computed, onBeforeMount, ref, watch} from 'vue'
import ShRepo from '@/helpers/ShRepo.js'
import { useStatus } from '@/composable/services.js'

const status = useStatus()
const allowedStatus = ['pending', 'active']
const statuses = ref([])
const reload = ref(0)
function getComputedStatuses() {
  if (status.status.value.length > 0) {
    const computedStatuses = status.status.value.filter((status)=> allowedStatus.includes(status.name.toLowerCase()))
    statuses.value = computedStatuses
  }
}

const userStore = useUserStore()
userStore.setUser()
const { user } = storeToRefs(userStore)
const tabs = ref([])
onBeforeMount(() => {
  watch(status.status, () => {
    getComputedStatuses()
  })
  tabs.value = user.value.role === 'admin' ? [
    {
      label: 'Pending',
      component: Pending
    },
    {
      label: 'Active',
      component: Active
    },
    {
      label: 'In Progress',
      component: InProgress
    },
    {
      label: 'Completed',
      component: Completed
    },
    {
      label: 'Approved',
      component: approved
    },
    {
      label: 'Revision',
      component: Revision
    },
    {
      label: 'Deleted',
      component: Deleted
    }
  ]: [
    {
      label: 'In Progress',
      component: InProgress
    },
    {
      label: 'Completed',
      component: Completed
    },
    {
      label: 'Approved',
      component: approved
    },
    {
      label: 'Revision',
      component: Revision
    }
  ]
})
function taskSaved (res) {
  ShRepo.showToast('Task saved successfully', 'success')
  reload.value+=1
}
watch(reload, () => {
  reload.value += 1;
});
</script>
<template>
  <a v-if="user.role =='admin'" href="#task_modal" data-bs-toggle="modal" class="btn btn-primary mb-2"><i class="fa fa-plus"></i> Add Task</a>
  <ShModal modal-id="task_modal" modal-title="Task Form" modal-size="lg">
      <ShForm v-if="statuses.length > 0"
             :success-callback="taskSaved"
              @taskSaved="taskSaved"
              :labels="{status_id:'Select Status'}"
              :fields="['name','due_date', 'status_id','description']"
             action="tasks/store"
             :fill-selects="{
                  status_id: {
                    data: statuses
                        }
              }"
             :datePickers="['due_date']"
      ></ShForm>
  </ShModal>
<ShDynamicTabs
    :tabs="tabs"
    :key="reload"
></ShDynamicTabs>
</template>
<style scoped>

</style>
