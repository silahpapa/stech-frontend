<template>
<auth-layout>
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body mb-3">
                    <sh-form
                        :fields="['email','password']"
                        action="auth/login"
                        success-callback="loginSuccessful"
                        @loginSuccessful="loginSuccessful"
                        :placeholders="{ email:'Enter email address',password:'Enter password'}"
                    ></sh-form>
                </div>
                    <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <router-link to="registration"
                        href="#"
                        class="text-success text-gradient font-weight-bold"
                    >Sign up</router-link>
                  </p>
                      <p class="mx-auto mt-3 text-sm"><router-link to="/forgot-password" >forgot password?</router-link></p>
                    </div>
</auth-layout>
</template>
<script>
import AuthLayout from '@/views/auth/AuthLayout.vue'
import ShForm from '@/components/ShForm.vue'
import shRepo from '@/helpers/ShRepo.js'
const body = document.getElementsByTagName("body")[0];

export default {
  name: "signin",
  inject: ['global'],
  components: {
    ShForm,
    AuthLayout
  },
  methods: {
    loginSuccessful: function (response) {
      const accessToken = response.access_token
      console.log(response.user)
      if (response.user.state !== 'active') {
        window.location.href='/not-verified'
      }else {
        localStorage.setItem('access_token', accessToken)
        this.global.setLoggedInUser(accessToken, response.user)
        window.location.href = 'dashboard'
      }
      shRepo.showToast('Login was successfully!', 'success')
    }
  }
};
</script>
