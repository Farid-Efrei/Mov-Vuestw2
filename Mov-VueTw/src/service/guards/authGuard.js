
import { useFacticeUserStore } from "@/stores/facticeUserStore";

export function authGuard(to, from, next) {
    const userStore = useFacticeUserStore();
    if (to.meta.requiresAuth && !userStore.currentUser) {
        next({name : 'login'})
    } else {
        next();
    }
}