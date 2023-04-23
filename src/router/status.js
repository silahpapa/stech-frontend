import status from '@/views/status/status.vue'
import details from '@/views/status/details.vue'
const router = [
    {
        name: 'status',
        path: '/status',
        component: status,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                name: 'details',
                path: 'details/:id?',
                component: details,
                meta: { popup: 'modal'}
            }
        ]
    }
]
export default router
