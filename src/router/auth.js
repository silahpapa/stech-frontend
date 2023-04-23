import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import Registration from '@/views/auth/Registration.vue'
import Signin from '@/views/auth/Signin.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
const router =[
    {
        name: 'login',
        path: '/login',
        component: Signin

    },
    {
        name: 'registration',
        path: '/registration',
        component: Registration
    },
    {
        name: 'forgot-password',
        path: '/forgot-password',
        component: ForgotPassword
    },
    {
        path: '/auth/reset-password/:token?',
        name: 'reset-password',
        component: ResetPassword
    }
]
export default router
