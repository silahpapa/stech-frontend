import { reactive } from 'vue'
const state = reactive({
    user: localStorage.getItem('current_user'),
})
const user = localStorage.getItem('current_user')
const setUser = async function () {
    await apis.doGet('auth/user').then(res => {
        if (typeof res.data == 'undefined') {
            this.logoutUser()
        } else {
            localStorage.setItem('current_user', JSON.stringify(res.data.user))
        }
    }).catch(e => {
        console.log(e)
    })
}

const logoutUser = async function () {
    localStorage.removeItem('access_token')
    localStorage.removeItem('current_user')
    localStorage.removeItem('project')
    localStorage.removeItem('user_role')
    state.user = null
    window.location.href = '/';
}
const setLoggedInUser = function (accessToken, user) {
    localStorage.setItem('access_token', accessToken)
    localStorage.setItem('current_user', JSON.stringify(user))
    localStorage.setItem('user_role', user.role)
    this.state.user = user
}

export default { state: state, setUser, setLoggedInUser, logoutUser, user }
