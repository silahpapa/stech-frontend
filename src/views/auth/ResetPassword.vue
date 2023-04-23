<template>
<auth-layout>
      <div class="pb-0 card-header text-start">
        <h4 class="font-weight-bolder">Reset password</h4>
        <p class="mb-0">Enter new password to reset</p>
      </div>
      <div class="card-body mb-3">
                    <sh-form
                        :fields="['current_password','new_password','new_password_confirmation']"
                        success-callback="passwordResetSuccess"
                        @passwordResetSuccess="passwordResetSuccess"
                        :action="'auth/reset-password/'+this.$route.params.token"
                        :placeholders="{ new_password:'Enter new password',new_password_confirmation:'Confirm password'}"
                    ></sh-form>
                </div>
  </auth-layout>
</template>

<script>
import AuthLayout from '@/views/auth/AuthLayout.vue'
import ShForm from '@/components/ShForm.vue'
import shRepo from '@/helpers/ShRepo.js'
export default {
  name: "reset password",
  inject: ['global'],
  components: {
    AuthLayout,
    ShForm,
  },
  methods: {
    passwordResetSuccess: function (response) {
      shRepo.showToast('password was reset successfully!', 'success')
      this.$router.push('/login')
    }
  }
};
</script>
