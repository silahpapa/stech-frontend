<template>
    <div class="row" v-if="!hideSearch">
      <div class="col-12 mb-3">
        <div class="sh-search-bar d-flex justify-content-start align-items-lg-start col-10">
          <template class="item col-2" v-if="addSection">
            <a @click="addSection.click(null)" :href="'#'+addSection.href" data-bs-toggle="modal" class="btn me-3 btn-sm btn-primary text-capitalize">
              <i class="bi-plus-lg"></i> Add {{ addSection.modal }}</a>
          </template>
          <div class="search d-none col-6">
            <input @keydown="userTyping" @keyup="userTyping" type="search" v-on:change="reloadData(1)" v-model="filter_value"
                   :placeholder="searchPlaceholder ? searchPlaceholder : 'Search'" class="form-control sh-search-input">
          </div>
        </div>
        <div class="d-flex  d-none justify-content-end me-4">
          <div class="dropdown">
            <a class="btn fw-bolder btn-info btn-sm" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              Filter Cases
            </a>
            <ul class="dropdown-menu search" aria-labelledby="dropdownMenuLink">
              <input @keydown="userTyping" @keyup="userTyping" type="search" v-on:change="reloadData(1)" v-model="filter_value"
                     :placeholder="searchPlaceholder ? searchPlaceholder : 'Type to Search '" class="form-control col-5 sh-search-input">
            </ul>
          </div>

        </div>
      </div>
    </div>
    <template v-if="hasDefaultSlot">
      <div class="text-center" v-if="loading === 'loading'">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else-if="loading === 'error'" class="alert alert-danger">
      <span :colspan="2">
        {{ loading_error }}
      </span>
      </div>
      <template v-if="loading === 'done'">
        <template v-for="record in records" :key="record.id">
          <slot :record="record"></slot>
        </template>
      </template>
    </template>
    <template v-else-if="hasRecordsSlot">
      <div class="text-center" v-if="loading === 'loading'">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div v-else-if="loading === 'error'" class="alert alert-danger">
      <span :colspan="2">
        {{ loading_error }}
      </span>
      </div>
      <template v-if="loading === 'done'">
        <slot name="records" :records="records"></slot>
      </template>
    </template>
    <div :class="tableHover ? 'table-hover':''" v-else-if="windowWidth > 700" class="card">
    <div class="card-header pb-0">
    </div>
    <div class="card-body px-0 pt-0 pb-2">
      <div class="table-responsive p-0">
        <table class="table align-items-center mb-0">
          <thead>
          <tr>
            <th v-for="title in tableHeaders" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
              <template class="text-capitalize" v-on:click="changeKey('order_by',title)"
                        v-if="typeof title === 'string'">{{ title.replace(/_/g, ' ') }}</template>
              <template class="text-capitalize" v-on:click="changeKey('order_by',title(null))"
                        v-else-if="typeof title === 'function'">{{ title(null).replace(/_/g, ' ') }}</template>
              <template class="text-capitalize" v-else-if="typeof title !== 'undefined'" v-on:click="changeKey('order_by',title)" >{{ title.replace(/_/g, ' ') }}</template>
            </th>
            <th v-if="actions" class="text-secondary opacity-7">
              {{ actions.label }}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="text-center" v-if="loading === 'loading'">
            <td :colspan="tableHeaders.length">
              <div class="text-center">
                <div class="loader-demo-box">
                  <div class="jumping-dots-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr class="text-center alert alert-danger" v-else-if="loading === 'error'">
            <td :colspan="tableHeaders.length">
              {{ loading_error }}
            </td>
          </tr>
          <tr class="text-center alert alert-info no_records" v-else-if="records.length === 0">
            <td :colspan="actions ? tableHeaders.length + 1 : tableHeaders.length">
              <i class="bi-info-circle"></i> No records found
            </td>
          </tr>
          <tr class="ms-2" v-else-if="loading === 'done'" v-for="(record, index) in records" :key="record.id">
            <td class="text-sm" v-for="key in tableHeaders" :key="key">
              <router-link v-if="typeof key === 'string' && links && links[key]" :target="links[key].target ? '_blank':''" :to="replaceLinkUrl(links[key],record)"
                           :class="getLinkClass(links[key])" v-html="record[key]"></router-link>
              <span v-else-if="getFieldType(key) === 'numeric'">{{ Intl.NumberFormat().format(record[key]) }}</span>
              <span v-else-if="getFieldType(key) === 'money'"
                    class="text-success fw-bold">{{ Intl.NumberFormat().format(record[key]) }}</span>
              <span v-else-if="getFieldType(key) === 'date'">{{ formatDate(record[key]) }}</span>
              <span v-else-if="typeof key === 'string'" v-html="record[key]"></span>
              <span v-else-if="typeof key === 'function'" v-html="key(record, index)"></span>
              <span v-else v-html="record[key[0]]"></span>
            </td>
            <td class="align-middle" v-if="actions" >
              <button class="btn btn-link text-secondary mb-0"  data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-ellipsis-v text-xs" aria-hidden="true"></i>
              </button>
              <ul class="dropdown-menu">
                <template v-for="act in actions.actions" :key="act.path">
                    <template v-if="!act.validator || act.validator(record)">
                      <template v-if="act.validations">
                        <div class="mt-2 mb-1 ms-3" v-if="act.validations[Object.keys(act.validations)[0]] === record[Object.keys(act.validations)[0]]">
                          <button :title="act.title" :class="act.class ? act.class:'btn w-75 btn-block btn-default'" v-if="act.emits"
                                  @click="doEmitAction(act.emits,record)">
                            <span v-if="act.icon" :class="act.icon"></span>
                            {{ act.label }}
                          </button>
                          <router-link v-else-if="!act.emits" :title="act.title" :to="replaceActionUrl(act.path,record)"
                                       :class="act.class" class="btn-block w-75">
                            <span v-if="act.icon" :class="act.icon"></span>
                            {{ act.label }}
                          </router-link>
                        </div>
                      </template>
                      <template v-else>
                        <div class="mt-2 mb-1 ms-3">
                          <button  :title="act.title" :class="act.class ? act.class:'btn w-75 btn-default'" v-if="act.emits"
                                   @click="doEmitAction(act.emits,record)">
                            <span v-if="act.icon" :class="act.icon"></span>
                            {{ act.label }}
                          </button>
                          <router-link v-else-if="!act.emits" :title="act.title" :to="replaceActionUrl(act.path,record)"
                                       :class="act.class" class="btn-block w-75">
                            <span v-if="act.icon" :class="act.icon"></span>
                            {{ act.label }}
                          </router-link>
                        </div>

                      </template>
                    </template>
                </template>
              </ul>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
    <div v-else>
      <div class="text-center" v-if="loading === 'loading'">
        <div class="text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
      <div v-else-if="loading === 'error'">
      <span>
        {{ loading_error }}
      </span>
      </div>
      <div class="mobile-list-items" v-else-if="loading === 'done'">
        <template v-for="(record,index) in records" :key="record.id">
          <div class="single-mobile-req bg-light p-3" @click="rowSelected(record)">
            <template v-for="key in tableHeaders" :key="key[0]">
              <p class="mb-1 font-weight-bold text-capitalize profile-form-title" v-if="typeof key === 'string' ">
                {{ key.replace(/_/g, ' ') }}</p>
              <p class="mb-1 font-weight-bold text-capitalize profile-form-title" v-else-if="typeof key === 'function'">
                {{ key(null).replace(/_/g, ' ') }}</p>
              <p class="mb-1 font-weight-bold text-capitalize profile-form-title" v-else>{{
                  key[1].replace(/_/g, ' ')
                }}</p>
              <span>
                <router-link v-if="typeof key === 'string' && links && links[key]"
                             :to="replaceLinkUrl(links[key],record)" :class="getLinkClass(links[key])"
                             v-html="record[key]"></router-link>
                <span v-else-if="getFieldType(key) === 'numeric'">{{ Intl.NumberFormat().format(record[key]) }}</span>
                <span v-else-if="getFieldType(key) === 'money'"
                      class="text-primary fw-bold">KES {{ Intl.NumberFormat().format(record[key]) }}</span>
                <span v-else-if="getFieldType(key) === 'date'">{{ formatDate(record[key]) }}</span>
                <span v-else-if="typeof key    === 'string'" v-html="record[key]"></span>
                <span v-else-if="typeof key === 'function'" v-html="key(record, index )"></span>
                <span v-else v-html="record[key[0]]"></span>
              </span>
              <hr class="my-2">
            </template>
            <td v-if="actions" style="white-space:nowrap;" class="align-middle">
              <template v-for="act in actions.actions" :key="act.path">
                <template v-if="!act.permission || user.isAllowedTo(act.permission)">
                  <template v-if="!act.validator || act.validator(record)">
                    <template v-if="act.validations">
                      <template v-if="act.validations[Object.keys(act.validations)[0]] === record[Object.keys(act.validations)[0]]">
                        <button :title="act.title" :class="act.class ? act.class:'btn btn-default'" v-if="act.emits"
                                @click="doEmitAction(act.emits,record)">
                          <span v-if="act.icon" :class="act.icon"></span>
                          {{ act.label }}
                        </button>
                        <router-link v-else-if="!act.emits" :title="act.title" :to="replaceActionUrl(act.path,record)"
                                     :class="act.class">
                          <span v-if="act.icon" :class="act.icon"></span>
                          {{ act.label }}
                        </router-link>
                      </template>
                    </template>
                    <template v-else>
                      <button :title="act.title" :class="act.class ? act.class:'btn btn-default'" v-if="act.emits"
                              @click="doEmitAction(act.emits,record)">
                        <span v-if="act.icon" :class="act.icon"></span>
                        {{ act.label }}
                      </button>
                      <router-link v-else-if="!act.emits" :title="act.title" :to="replaceActionUrl(act.path,record)"
                                   :class="act.class">
                        <span v-if="act.icon" :class="act.icon"></span>
                        {{ act.label }}
                      </router-link>
                    </template>
                  </template>
                </template>
              </template>
            </td>
          </div>
        </template>
      </div>
    </div>
    <template class="d-flex justify-content-end">
      <pagination  v-if="pagination_data" @loadMoreRecords="loadMoreRecords" :hide-load-more="hideLoadMore"
                   :hide-count="hideCount" :pagination_data="pagination_data" v-on:changeKey="changeKey"
                   :pagination-style="pageStyle"></pagination>
    </template>
    <template v-if="actions">
      <template v-for="action in actions.actions" :key="action.label">
        <sh-canvas @offcanvasClosed="canvasClosed" v-if="action.canvasId" :position="action.canvasPosition"
                   :canvas-size="action.canvasSize" :canvas-title="action.canvasTitle" :canvas-id="action.canvasId">
          <component @recordUpdated="reloadData" v-if="selectedRecord" v-bind="cleanCanvasProps(action)" :record="selectedRecord"
                     :is="action.canvasComponent"/>
        </sh-canvas>
      </template>
    </template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Filter Case</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <input @keydown="userTyping" @keyup="userTyping" type="search" v-on:change="reloadData(1)" v-model="filter_value"
                 :placeholder="searchPlaceholder ? searchPlaceholder : 'Search the entire table'" class="form-control sh-search-input">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apis from '@/helpers/ShApis.js'
import pagination from './list_templates/Pagination.vue'
import moment from 'moment'
import helpers from '@/helpers/ShRepo.js'
import ShCanvas from './ShCanvas.vue'
import shRepo from '@/helpers/ShRepo.js'
export default {
  name: 'sh-table',
  props: ['endPoint','dates', 'validations','addSection', 'headers','query', 'pageCount', 'actions', 'hideCount', 'hideLoadMore', 'links', 'reload', 'hideSearch', 'sharedData', 'searchPlaceholder', 'event', 'displayMore', 'displayMoreBtnClass', 'moreDetailsColumns', 'moreDetailsFields', 'hasDownload', 'downloadFields', 'tableHover', 'hideIds', 'paginationStyle'],
  inject: ['channel'],
  data () {
    return {
      order_by: '',
      order_method: '',
      per_page: shRepo.getShConfig('tablePerPage',10),
      page: 1,
      filter_value: '',
      loading: 'loading',
      loading_error: '',
      records: [],
      total: 0,
      pagination_data: null,
      moreDetailsId: null,
      moreDetailsModel: null,
      downloading: false,
      appUrl: window.VITE_APP_API_URL,
      hasCanvas: 0,
      selectedRecord: null,
      timeOut: null,
      tableHeaders: [],
      pageStyle: this.paginationStyle
    }
  },
  mounted () {
    if(this.headers){
      this.tableHeaders = this.headers
    }
    if (this.event) {
      // this.channel.listen(this.event, this.newRecordAdded)
    }
    if (this.actions && this.actions.actions) {
      this.actions.actions.forEach(action => {
        if (action.canvasComponent) {
          this.hasCanvas = true
        }
      })
    }
  },
  methods: {
    userTyping: function(){
      if (this.timeOut){
        clearTimeout(this.timeOut)
      }
      const self = this
      this.timeOut = setTimeout(()=>{
        self.reloadData(1)
      },800)
    },
    cleanCanvasProps: function (actions) {
      let replaced = actions
      replaced.class = null
      return replaced
    },
    newRecordAdded: function (ev) {
      const record = ev.log
      if (record.user) {
        record.user = record.user.name
      }
      this.records.unshift(record)
    },
    canvasClosed: function () {
      this.selectedRecord = null
    },
    rowSelected: function (row) {
      this.selectedRecord = null
      const self = this
      setTimeout(() => {
        this.selectedRecord = row
        this.$emit('rowSelected', row)
      }, 100)
    },
    changeKey: function (key, value) {
      this[key] = value
      if (key === 'order_by') {
        this.order_method = (this.order_method === 'desc') ? 'asc' : 'desc'
      }
      if (key === 'per_page') {
        this.page = 1
      }
      this.reloadData()
    },
    getLinkClass: function (config) {
      if (typeof config === 'object') {
        return config.class
      }
      return ''
    },
    reloadNotifications: function () {
      this.reloadData()
    },
    replaceActionUrl: function (path, obj) {
      if (path) {
        var matches = path.match(/\{(.*?)\}/g)
        try {
          matches.forEach(key => {
            key = key.replace('{', '')
            key = key.replace('}', '')
            path = path.replace(`{${key}}`, obj[key])
          })
          return path
        } catch (e) {
          return path
        }
      }
      return ''
    },
    doEmitAction: function (action, data) {
      if (typeof action === 'function') {
        action(data)
      } else {
        this.$emit(action, data)
      }
    },
    getFieldType: function (field) {
      const numbers = ['age', 'interest_rate_pa']
      const moneys = ['amount', 'paid_amount', 'total_paid', 'total', 'monthly_fee', 'share_cost', 'min_contribution', 'min_membership_contribution']
      let dates = ['invoice_date', 'free_tier_days', 'updated_at', 'created_at', 'end_time']
      if (this.dates) {
        this.dates.map(res=> dates.push(res))
      }
      if (numbers.includes(field)) {
        return 'numeric'
      }
      if (moneys.includes(field)) {
        return 'money'
      }
      if (dates.includes(field)) {
        return 'date'
      }
      return 'string'
    },
    replaceLinkUrl: function (path, obj) {
      if (typeof path === 'object') {
        path = path.link ?? path.url
      }
      var matches = path.match(/\{(.*?)\}/g)
      matches && matches.forEach(key => {
        key = key.replace('{', '')
        key = key.replace('}', '')
        path = path.replace(`{${key}}`, obj[key])
      })
      return path
    },
    formatDate: function (date) {
      return moment(date).format('lll')
    },
    setMoreDetailsModel: function (row) {
      this.moreDetailsModel = null
      this.moreDetailsModel = row
    },
    loadMoreRecords: function () {
      this.reloadData(this.page + 1, 1)
    },
    exportData: function (template) {
      this.downloading = true
      const headers = []
      const fields = this.downloadFields ? this.downloadFields : this.headers
      fields.forEach(header => {
        if (typeof header === 'string') {
          headers.push(header)
        }
      })
      const data = {
        titles: headers,
        export: 1
      }
      apis.doPost(this.endPoint, data).then(res => {
        this.downloading = false
        if (res.data.file) {
          const url = this.appUrl + 'external-download?file=' + res.data.file + '&name=' + res.data.name;
          window.location.href = url
          // window.open('https://facebook.com')
          // window.open(this.appUrl + 'external-download?file=' + res.data.file + '&name=' + res.data.name, '_blank').focus()
        }
      }).catch(reason => {
        this.downloading = false
        const error = (typeof reason.response === 'undefined') ? 'Error getting data from backend' : `${reason.response.status}:${reason.response.statusText}`
        helpers.swalError('Error', error)
      })
    },
    reloadData: function (page, append) {
      if (typeof page !== 'undefined') {
        this.page = page
      }
      if (!append) {
        this.loading = 'loading'
      }
      const data = {
        order_by: this.order_by,
        order_method: this.order_method,
        per_page: this.per_page,
        page: this.page,
        filter_value: this.filter_value,
        paginated: true,
        current_page: this.page
      }
      if (this.pagination_data) {
        this.pagination_data.loading = 1
      }
      let endPoint = this.endPoint
      if(!this.endPoint && this.query){
        endPoint = 'sh-ql'
        data.query = this.query
      }
      apis.doGet(endPoint, data).then(req => {
        this.$emit('dataReloaded', this.pagination_data)
        this.loading = 'done'
        const response = req.data.data
        this.pagination_data = {
          current: response.current_page,
          start: response.from,
          end: response.last_page,
          record_count: response.total,
          per_page: response.per_page,
          loading: 0,
          displayCount: response.total > response.per_page ? response.per_page : response.total
        }
        if(!this.headers && response.total > 0){
          this.tableHeaders = Object.keys(response.data[0])
        }
        if (append) {
          this.records.push(...response.data)
          let totalShown = response.total > response.per_page ? response.per_page * response.current_page : response.total
          if (totalShown > response.total) {
            totalShown = response.total
          }
          this.pagination_data.displayCount = totalShown
          const scrollingElement = (document.scrollingElement || document.body)
          scrollingElement.scrollTop = scrollingElement.scrollHeight
        } else {
          this.records = response.data
        }
      }).catch(reason => {
        const error = (typeof reason.response === 'undefined') ? 'Error getting data from backend' : `${reason.response.status}:${reason.response.statusText} (${this.endPoint})`
     console.log(reason)
        this.loading_error = error
        this.loading = 'error'
      })
    }
  },
  watch: {
    hideIds: {
      handler(newValue) {
        this.records = this.records.filter(record => !newValue.includes(record.id) && record)
      },
      deep: true
    },
    reload () {
      this.reloadData()
    },
    endPoint() {
      this.reloadData()
    }
  },
  created () {
    this.reloadData()
  },
  components: {
    ShCanvas,
    pagination
  },
  computed: {
    windowWidth: function () {
      return window.innerWidth
    },
    user () {
      return null
    },
    hasDefaultSlot () {
      return !!this.$slots.default
    },
    hasRecordsSlot () {
      return !!this.$slots.records
    }
  }
}
</script>
<style>
.colored-toast.swal2-icon-success {
  background-color: #a5dc86 !important;
}

.colored-toast.swal2-icon-error {
  background-color: #f27474 !important;
}

.colored-toast.swal2-icon-warning {
  background-color: #f8bb86 !important;
}

.colored-toast.swal2-icon-info {
  background-color: #3fc3ee !important;
}

.colored-toast.swal2-icon-question {
  background-color: #87adbd !important;
}

.colored-toast .swal2-title {
  color: white;
}

.colored-toast .swal2-close {
  color: white;
}

.colored-toast .swal2-html-container {
  color: white;
}

/*spinner*/
body {
  background-color: #f9f9fa
}

.flex {
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto
}
.search{
  min-width: 500px !important;
}
@media (max-width:991.98px) {
  .padding {
    padding: 1.5rem
  }
}

@media (max-width:767.98px) {
  .padding {
    padding: 1rem
  }
}

.padding {
  padding: 5rem
}

.card {
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  -ms-box-shadow: none
}

.jumping-dots-loader {
  width: 100px;
  height: 70px;
  border-radius: 100%;
  position: relative;
  margin: 0 auto;
}

.jumping-dots-loader span {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  background-color: rgba(21, 8, 210, 0.9);
  margin: 25px 5px;
}

.jumping-dots-loader span:nth-child(1) {
  animation: bounce 1s ease-in-out infinite;
}

.jumping-dots-loader span:nth-child(2) {
  animation: bounce 1s ease-in-out 0.33s infinite;
}

.jumping-dots-loader span:nth-child(3) {
  animation: bounce 1s ease-in-out 0.66s infinite;
}
.table thead th {
   padding: 0.1rem 0.5rem !important;
}
@keyframes bounce {
  0%, 75%, 100% {
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    -o-transform: translateY(0);
    transform: translateY(0);
  }
  25% {
    -webkit-transform: translateY(-20px);
    -ms-transform: translateY(-20px);
    -o-transform: translateY(-20px);
    transform: translateY(-20px);
  }
}
.btn{
  margin-bottom: -4px !important;
}
</style>
