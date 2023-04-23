import Axios from 'axios'
import shstorage from '@/helpers/ShStorage.js'
let apiUrl = import.meta.env.VITE_APP_API_URL
// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === 'production') {
  const productionUrl = import.meta.env.VITE_APP_API_PRODUCTION_URL
  if(productionUrl){
    apiUrl = productionUrl
  }
}

const axios = Axios.create({
  baseURL: apiUrl
})
window.shAxionInstance = axios
function doGet (endPoint, data) {
  return axios.get(endPoint, {
    params: data,
    crossOrigin: true,
    headers: {
      Authorization: 'Bearer ' + shstorage.getItem('access_token')
    }
  })
}
function doPost (endPoint, data) {
  const freeEndpoints = [
    'auth/register/client',
    'auth/login'
  ]
  return axios.post(endPoint,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + shstorage.getItem('access_token')
      }
    }
  )
}
function doPut (endPoint, data) {
  const freeEndpoints = [
    'auth/register/client',
    'auth/login'
  ]
  return axios.put(endPoint,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + shstorage.getItem('access_token')
      }
    }
  )
}
function doDelete (endPoint, data) {
  const freeEndpoints = [
    'auth/register/client',
    'auth/login'
  ]
  return axios.delete(endPoint,
    data,
    {
      headers: {
        Authorization: 'Bearer ' + shstorage.getItem('access_token')
      }
    }
  )
}

export default {
  doGet,
  doPost,
  doPut,
  doDelete,
}
