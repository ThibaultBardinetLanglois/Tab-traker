import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('user/register', credentials)
  },
  login (credentials) {
    return Api().post('user/login', credentials)
  },
  checkToken (token) {
    return Api().get(`user/checkToken/${token}`)
  }
}

// AuthenticationService.register({
// email: 'testing@gmail.com',
// password: '123456'
// })
