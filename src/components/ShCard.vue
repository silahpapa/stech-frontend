<script setup>
const {record} = defineProps(['record'])
</script>
<template>
  <div class="card-body">
    <div v-if="!record.role">
      <div class="card">
        <div class="col-12">
          <div class="row p-3">
            <h6 class="mb-3 text-sm">{{record.name}}</h6>
            <div class="p-sm-2 col-md-6">
              <ul class="list-group">

                <li class="list-group-item border-0 d-flex bg-gray-100 border-radius-lg">
                  <div class="d-flex flex-column">
                  <span class="mb-2 text-xs">
               Name:
              <span class="text-dark font-weight-bold ms-sm-2">{{ record.name }}</span>
            </span>
                    <span class="mb-2 text-xs">
              Email Address:
              <span class="text-dark ms-sm-2 font-weight-bold">{{ record.email }}</span>
            </span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="p-sm-2  col-md-6">
              <ul class="list-group">
                <li class="list-group-item border-0 d-flex  bg-gray-100 border-radius-lg">
                  <div class="d-flex flex-column">
                    <span class="mb-2 text-xs">
              Phone:
              <span class="text-dark font-weight-bold ms-sm-2">{{ record.phone }}</span>
            </span>
                    <span class="text-xs mb-2">
              Gender:
              <span class="text-dark ms-sm-2 font-weight-bold">{{ record.gender }}</span>
            </span>
                    <span class="text-xs mb-2">
              Id Number:
              <span class="text-dark ms-sm-2 font-weight-bold">{{ record.id_number }}</span>
            </span>
                    <span class="text-xs mb-2">
              marital status:
              <span class="text-dark ms-sm-2 font-weight-bold">{{ record.marital_status }}</span>
            </span>
                  </div>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <ul class="list-group">
        <li class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bg-gray-100 border-radius-lg">
          <div class="d-flex flex-column">
            <h6 class="mb-3 text-sm">{{record.name}}</h6>
            <span class="mb-2 text-xs">
               Name:
              <span class="text-dark font-weight-bold ms-sm-2">{{ record.name }}</span>
            </span>
            <span class="text-xs mb-2">
              Email:
              <span class="text-dark ms-sm-2 font-weight-bold">{{ record.email }}</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
