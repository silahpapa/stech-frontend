<script setup>
import moment from 'moment'
import shRepo from '@/helpers/ShRepo.js'
import { onMounted, ref } from 'vue'


const props = defineProps({
  start: {
    type: Number,
    default: 2023
  },
  selected: {
    type: String,
    default: shRepo.getShConfig('defaultRange', 'This Month')
  }
})

const emit = defineEmits(['rangeSelected'])

const selectedDate = ref(null)
const rangeLabel = ref(null)
const showCustom = ref(false)
const customFrom = ref(null)
const customTo = ref(null)

const applyCustom = ()=>{
  const date = [moment(customFrom.value),moment(customTo.value)]
  setDate(date,'Custom')
}

const dates = ref([
  {
    label: 'Today',
    value: [moment(), moment()]
  },
  {
    label: '7 Days',
    value: [moment().subtract(7, 'days'), moment()]
  },
  {
    label: 'This Month',
    value: [moment().startOf('month'), moment()]
  },
  {
    label: 'Last Month',
    value: [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
  },
  {
    label: '1 Year',
    value: [moment().subtract(12, 'months'), moment()]
  }
])
const  setDate =  (date, label) => {
  selectedDate.value = date
  rangeLabel.value = '<strong>' + label + '</strong><small>(' + date[0].format('MMMM D, YYYY') + ' - ' + date[1].format('MMMM D, YYYY') + ')</small>'
  const from = date[0]
  const to = date[1]
  const period = label.toString().toLowerCase().replaceAll(' ','_')
  emit('rangeSelected', {
    from: from,
    to: to,
    period: period,
    query: `from=${from.format('L')}&to=${to.format('L')}&period=${period}`
  })
}
onMounted(() => {
  let end = parseInt(moment().format('Y'))
  while (end >= props.start) {
    dates.value.push({
      label: end,
      value: [moment('@/' + end).startOf('year'), moment('@/' + end).endOf('year')]
    })
    end--
  }

  dates.value.map(date=>{
    (`${date.label}`.toLowerCase() === props.selected.toLowerCase()) && setDate(date.value, date.label)
  })
})
</script>
<template>
  <div class="sh-range">
    <div class="dropdown">
      <div class="form-control dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown"
           aria-expanded="false">
        <i class="bi-calendar text-dark"></i> <span v-html="rangeLabel"></span>
      </div>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li v-for="date in dates" :key="date.label" @click="setDate(date.value, date.label)">
          <a class="dropdown-item"
             :class="date.value === selectedDate ? 'active' : ''"
             href="#">{{
              date.label
            }}</a>
        </li>
        <li class="border-top">
          <div class="dropdown-item d-flex flex-column">
            <span>Custom</span>
            <div>
              <input v-model="customFrom" type="date">
              <input v-model="customTo" type="date">
            </div>
            <button v-if="customFrom && customTo" class="btn btn-sm btn-info mt-1" @click="applyCustom">Apply</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
</style>
