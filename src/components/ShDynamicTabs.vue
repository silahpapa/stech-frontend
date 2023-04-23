<script setup>
import {onMounted, ref, shallowRef, watch} from 'vue'
import shRepo from '@/helpers/ShRepo.js'
const props = defineProps(['tabs','data'])
const tabs = props.tabs
let currentTab = shallowRef(null)
const generatedId = ref(null)
const isResponsive = ref(null)
onMounted(()=>{
  generatedId.value =  'tab' + Math.random().toString(36).slice(2)
  if(tabs.length > 0) {
    currentTab.value = tabs[0]
  }
})

function setTab(tab){
  currentTab.value = tab
}
</script>
<template>
  <div class="row">
    <div class="d-flex">
      <ul class="nav col-2 nav-tabs d-md-flex flex-md-column" role="tablist" :class="shRepo.getShConfig('tabsClass','sh-tabs nav-tabs-bordered')">
        <li class="nav-item" role="presentation" v-for="tab in tabs">
            <div class="card">
              <template @click="setTab(tab)" class="nav-link d-md-flex justify-content-md-center align-items-center flex-column" :class="currentTab === tab ? 'active':''">
                <i class="fa mb-2" :class="tab.icon" aria-hidden="true"></i>
                {{ tab.label }}
                <template v-if="tab.count || tab.tabCount">
                  <i class="d-none"></i><sup class="sh_tab_count">{{ tab.count ?? tab.tabCount }}</sup>
                </template>
              </template>
            </div>
        </li>
      </ul>
      <div class="tab-content col-9">
        <div class="card ms-3">
          <div class="row justify-content-center">
            <div class="row">
              <div class="row mx-auto mb-3">
              <template v-if="currentTab">
                <component v-bind="currentTab" :is="currentTab.component" />
              </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.nav-tabs-bordered .nav-link.active {
  color: #4154f1;
  border-bottom: 2px solid #4154f1;
}
.nav-link{
  background-color: #fff;
  /*color: #4154f1 !important;*/
}
</style>

