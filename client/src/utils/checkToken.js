import store from '@/store/store'
import AuthenticationService from '@/services/AuthenticationService'

export default async () => {
  const token = JSON.parse(localStorage.getItem('vuex')).token
  console.log('TOKEN ACTUEL DANS LE LOCAL STORAGE =>', token)
  if (token) {
    await AuthenticationService.checkToken(token)
      .then(response => {
        console.log('RESPONSE STATUS =>', response.status)
        console.log('RESPONSE TOKEN DATA =>', response.data.token)
        console.log('RESPONSE USER DATA =>', response.data.user)
        store.dispatch('setToken', response.data.token)
        store.dispatch('setUser', response.data.user)
      })
      .catch(error => {
        console.log('ERROR =>', error)
        console.log('NOT TOKEN HERE!!')
        console.log('TOKEN IS EXPIRED!')
        store.dispatch('setToken', null)
        store.dispatch('setUser', null)
      })
  }
}
