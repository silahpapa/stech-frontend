<script setup>
import ShForm from '@/components/ShForm.vue'
import shRepo from '@/helpers/ShRepo.js'
import {useRoute,useRouter} from 'vue-router'
import AuthLayout from '@/views/auth/AuthLayout.vue'
const route = useRoute()
const router = useRouter()
 function passwordReset(res) {
  const message = res.data.message
  shRepo.showToast('Check your email for reset link')
   router.push('/login')
}
</script>
<template>
  <auth-layout>
    <div class="pb-0 card-header text-start">
      <h4 class="font-weight-bolder">Forgot Password</h4>
      <p class="mb-0">Enter your email to reset password</p>
    </div>
    <div class="card-body mb-3">
      <sh-form
          :fields="['email']"
          action="auth/forgot-password"
          success-callback="passwordReset"
          @passwordReset="passwordReset"
      >
      </sh-form>
    </div>
    <div class="px-1 pt-0 text-center card-footer px-lg-2">
      <p class="mx-auto mb-4 text-sm">
        Don't have an account?
        <router-link to="login"
                     href="#"
                     class="text-success text-gradient font-weight-bold"
        >Sign in</router-link>
      </p>
    </div>
  </auth-layout>
</template>

<style scoped>

</style>
