<script setup>
import Highcharts from 'highcharts'
import shApis from '@/helpers/ShApis.js'
import shRepo from '@/helpers/ShRepo.js'
import ShRange from '@/components/ShRange.vue'
import {onBeforeMount, ref} from 'vue'
let in_progress = ref(0)
let completedTasks = ref(0)
let approvedTasks = ref(0)
let revisionTasks = ref(0)

const rangeSelected = (range) => {
  shApis.doGet(`reports?${range.query}`).then(res=>{
    in_progress.value = res.data.in_progress ?? 0
    completedTasks.value = res.data.completedTasks?? 0
    approvedTasks.value = res.data.approvedTasks?? 0
    revisionTasks.value = res.data.revisionTasks?? 0
    drawGraph(res.data.stats)
  }).catch(ex=>{
    shRepo.showToast(ex.message,'error')
  })
}

const drawGraph = (data) =>{
  Highcharts.chart('stats', {
    chart: {
      zoomType: 'xy'
    },
    title: {
      text: 'All and completed Tasks',
      align: 'left'
    },
    subtitle: {
    },
    xAxis: [{
      categories: data.labels,
      crosshair: true
    }],
    yAxis: [{
      labels: {
        format: '{value}',
        style: {
          color: Highcharts.getOptions().colors[1]
        }
      },
      title: {
        text: 'Tasks',
        style: {
          color: Highcharts.getOptions().colors[0]
        }
      }
    }],
    tooltip: {
      shared: true
    },
    legend: {
      align: 'left',
      x: 80,
      verticalAlign: 'top',
      y: 80,
      floating: true,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || 'rgba(255,255,255,0.25)'
    },
    series: [{
      name: 'Tasks',
      type: 'spline',
      data: data.graph_data.count,
      tooltip: {
        valueSuffix: ''
      }
    }]
  });
}
</script>
<template>
    <div class="row p-3 bg-white">
      <sh-range @rangeSelected="rangeSelected"></sh-range>
      <div class="col-xl-3 col-lg-6">
        <div v-if="completedTasks >= 0" class="card l-bg-cherry">
          <div class="card-statistic-3 p-2">
            <div class="card-icon card-icon-large"><i class="fas fa-shopping-car"></i></div>
            <div class="mb-3 mx-auto">
              <h5 class="card-title text-dark mb-0 p-2">Completed Tasks</h5>
            </div>
            <div class="row align-items-center mb-2 d-flex">
              <div class="col-8">
                <h2 class="d-flex  ms-5 align-items-center mb-0">
                  {{ completedTasks }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-6">
        <div v-if="in_progress >= 0" class="card l-bg-cherry">
          <div class="card-statistic-3 p-2">
            <div class="card-icon card-icon-large"><i class="fas fa-shopping-car"></i></div>
            <div class="mb-3 mx-auto">
              <h5 class="card-title text-dark mb-0 p-2">In Progress</h5>
            </div>
            <div class="row align-items-center mb-2 d-flex">
              <div class="col-8">
                <h2 class="d-flex  ms-5 align-items-center mb-0">
                  {{ in_progress }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-6">
        <div v-if="approvedTasks >= 0" class="card l-bg-cherry">
          <div class="card-statistic-3 p-2">
            <div class="card-icon card-icon-large"><i class="fas fa-shopping-car"></i></div>
            <div class="mb-3 mx-auto">
              <h5 class="card-title text-dark mb-0 p-2">Approved Tasks</h5>
            </div>
            <div class="row align-items-center mb-2 d-flex">
              <div class="col-8">
                <h2 class="d-flex ms-5 align-items-center mb-0">
                  {{approvedTasks }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-3 col-lg-6">
        <div v-if="revisionTasks >= 0" class="card l-bg-cherry">
          <div class="card-statistic-3 p-2">
            <div class="card-icon card-icon-large"><i class="fas fa-shopping-car"></i></div>
            <div class="mb-3 mx-auto">
              <h5 class="card-title text-dark mb-0 p-2"> Revision Task</h5>
            </div>
            <div class="row align-items-center mb-2 d-flex">
              <div class="col-8">
                <h2 class="d-flex ms-5 align-items-center mb-0">
                  {{ revisionTasks }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="stats"></div>
    </div>
</template>
<style scoped>
.card {
  background-color: #fff;
  border-radius: 10px;
  border: none;
  position: relative;
  margin-bottom: 30px;
  box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,0.1), 0 0.9375rem 1.40625rem rgba(90,97,105,0.1), 0 0.25rem 0.53125rem rgba(90,97,105,0.12), 0 0.125rem 0.1875rem rgba(90,97,105,0.1);
}
.card-title {
  padding: 20px 0 15px 0;
  font-size: 19px;
  font-weight: 500;
  color: #fff;
  font-family: "Poppins", sans-serif;
}
</style>
