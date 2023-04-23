import {onBeforeMount, ref} from 'vue'
import shApis from '@/helpers/ShApis.js'

export function useStatus() {
  const status = ref(null)
  const error = ref(null)
  onBeforeMount(()=>{
      shApis.doGet('status/list/paginate').then((res)=>{
        const data = res.data.data
        let items = []
        data.forEach(function(obj) {
          const item = { id: obj.id,name: obj.name}
          items.push(item)
        });
        status.value = items
      }).catch((err) => ( console.log('error is ' +  err)))
  })
  return { status, error }
}
