<template>
  <main class="main-content mt-0">
    <div
        class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
        style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg'); background-position: top;"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-8 col-lg-8 col-md-8 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center">
              <h5>Register</h5>
            </div>
            <div class="card-body">
              <form role="form">
                <sh-form
                    :fields="['name','email','password','password_confirmation']"
                    action="auth/register"
                    :columns="2"
                    :files="['photo']"
                    success-callback="registrationSuccess"
                    :labels="{dob:'Date Of Birth'}"
                    :placeholders="{ email:'Enter email',password:'Enter password',password_confirmation:'confirm your password'}"
                    @registrationSuccess="registrationSuccess"
                ></sh-form>
                <p class="text-sm mt-3 mb-0">
                  Already have an account?
                  <router-link to="login"
                      href="#"
                      class="text-dark font-weight-bolder"
                  >Sign in</router-link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
const body = document.getElementsByTagName("body")[0];
import ShForm from '@/components/ShForm.vue'
import shRepo from '@/helpers/ShRepo.js'
export default {
  name: "signin",
  components: {
    ShForm
  },
  inject: ['global'],
  methods: {
    registrationSuccess: function (response) {
      const accessToken = response.access_token
      if (response.user.verified == 0) {
        window.location.href='/not-verified'
      }else {
        localStorage.setItem('access_token', accessToken)
        this.global.setLoggedInUser(accessToken,  response.user)
        this.$router.push('/')
      }
      shRepo.showToast('registration was successfully', 'success')
    }
  }
};
</script>
