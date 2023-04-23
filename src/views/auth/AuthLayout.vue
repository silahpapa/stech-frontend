<script setup>
import { onBeforeMount } from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()
onBeforeMount(()=>{
  const token = JSON.stringify(localStorage.getItem('access_token'))
  const user = JSON.stringify(localStorage.getItem('current_user'))
})
</script>
<template>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
               <slot />
              </div>
            </div>
            <div
                class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column"
            >
              <div
                  class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden"
                  style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
          background-size: cover;"
              >
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4
                    class="mt-5 text-white font-weight-bolder position-relative"
                >Logins for Admin</h4>
                <h6 class="text-white position-relative">
                  username: silakosy@gmail.com
                </h6>
                <h6 class="text-white position-relative">
                  password: password
                </h6>
                <h4
                    class="mt-5 text-white font-weight-bolder position-relative"
                >Logins for user</h4>
                <h6 class="text-white position-relative">
                  username: test@gmail.com
                </h6>
                <h6 class="text-white position-relative">
                  password: password
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>

</style>
