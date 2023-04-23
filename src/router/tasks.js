import tasks from '@/views/tasks/tasks.vue'
import details from '@/views/tasks/details.vue'
import assign from '@/views/tasks/assign.vue'
import approve from '@/views/tasks/approve.vue'
import view from '@/views/tasks/view.vue'
const router = [
    {
        name: 'tasks',
        path: '/tasks',
        component: tasks,
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: "details/:id?",
                name: "tasks",
                component: details,
                 meta: {
                    popup: 'modal',
                    size: 'lg',
                    metaTitle: 'Update Task Details'
                 }
            }, {
                path: "assign/:id?",
                name: "assign",
                component: assign,
                 meta: {
                    popup: 'modal',
                     size: 'lg',
                     metaTitle: 'Select Task User'

                 }
            },
            {
                path: "approve/:id?",
                name: "approve",
                component: approve,
                 meta: {
                    popup: 'modal',
                     metaTitle: 'Remarks on the Task'
                 }
            },
            {
                path: "view/:id?",
                name: "view",
                component: view,
                 meta: {
                    popup: 'canvas',
                 }
            },
        ]

    }
]
export default router
