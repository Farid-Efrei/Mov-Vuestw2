import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const options = {
  position: 'top-right',
  autoClose: 3000,
  closeOnClick: true,
  draggable: true
}
const toast = {
  install: (app) => {
    app.use(Vue3Toastify, { options })
    // return {
    //   provide: { toast }
    // }
  }
}
export default toast
