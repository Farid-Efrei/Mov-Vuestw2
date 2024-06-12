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
//Promesse avant le garde on attend l'authentication:
export async function authGuard(to, from, next) {
  const userStore = useUserStore()
  console.log('Navigation de', from.name, 'vers', to.name)
  // Attendre que l'utilisateur soit authentifié avant de continuer
  await userStore.checkAuthStatus()
  console.log('Utilisateur authentifié:', userStore.isAuthenticated)
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    console.log('Authentification requise, redirection...')
    next({ name: 'login' })
  } else {
    next()
  }
}
