<script setup>

import ShCard from '@/components/ShCard.vue'
import {useUserStore} from '@/stores/ShUser.js'
import ShForm from '@/components/ShForm.vue'
import shRepo from '@/helpers/ShRepo.js'
import {storeToRefs} from 'pinia'
import {onBeforeMount} from 'vue'

let userStore = useUserStore()
userStore.setUser()
const { user } = storeToRefs(userStore)

function profileUpdated(res) {
  shRepo.showToast('password updated successfully')
}

</script>
<template>
  <main>
    <div class="py-2 container-fluid">
      <div class="row">
        <div class="col-md-8">
          <div class="card">
            <div class="card-body">
              <div class="card-body pt-3">
                <ul class="nav nav-tabs nav-tabs-bordered">
                  <li class="nav-item">
                    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-edit">My Details</button>
                  </li>
                  <li class="nav-item">
                    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                  </li>
                </ul>
                <div class="tab-content pt-2" >
                  <div class="tab-pane fade show active profile-edit pt-3" id="profile-edit">
                    <div class="row mb-3" >
                      <sh-card v-if="user" :record="user"/>
                    </div>
                  </div>
                  <div class="tab-pane fade pt-3" id="profile-change-password">
                    <sh-form  :fields="['current_password','password','password_confirmation']"
                             action="auth/update/password"
                             :success-callback="profileUpdated"
                             @passwordUpdated="profileUpdated"></sh-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>

</style>
