import { defineStore } from 'pinia'
import shstorage from '@/helpers/ShStorage.js'
import apis from '@/helpers/ShApis.js'
import moment from 'moment'
import ShStorage from '@/helpers/ShStorage.js'
import shRepo from '@/helpers/ShRepo.js'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    user: null,
    role: null,
    permissions: null,
    menus: [],
    loggedOut: false
  }),
  actions: {
    setUser (){
      let user = null
      try {
         user = shstorage.getItem('user') ? shstorage.getItem('user') : null
      } catch (error) {
        user= null
      }
      this.user = user
      apis.doGet('auth/user').then(res => {
        let user = res.data.user
        if (typeof(user) === 'undefined') {
           user = res.data
        }
        shstorage.setItem('user',user)
        user.signOut = this.signOut
        user.logout = this.signOut
        user.logOut = this.signOut
        this.user = user
      }).catch((reason) => {
        if (reason.response && reason.response.status) {
          if(reason.response.status === 401) {
            shstorage.setItem('user',null)
            this.user = null
          }
          this.loggedOut = true
        }
      })
      const timeNow = moment().toISOString()
      ShStorage.setItem('session_start',timeNow)
    },
    signOut () {
      shRepo.signOutUser()
    },
    logOut () {
      this.signOut()
    },
    getUser () {
      this.setUser()
    },
    setAccessToken (accessToken) {
      shstorage.setItem('access_token', accessToken)
      this.setUser()
    }
  },
  getters: {
    userId (state) {
      return state.user === null ? null:state.user.id
    }
  }
})
