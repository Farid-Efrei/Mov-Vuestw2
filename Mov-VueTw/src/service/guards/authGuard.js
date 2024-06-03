// import { useFacticeUserStore } from "@/stores/facticeUserStore";

import { useUserStore } from '@/stores/user'

// export function authGuard(to, from, next) {
//     const userStore = useFacticeUserStore();
//     if (to.meta.requiresAuth && !userStore.currentUser) {
//         next({name : 'login'})
//     } else {
//         next();
//     }
// }

export function authGuard(to, from, next) {
  console.log('Navigation de', from.name, 'vers', to.name)
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    console.log('Authentification requise, redirection...')
    next({ name: 'login' })
  } else {
    next()
  }
}
