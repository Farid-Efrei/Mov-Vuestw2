
import { useFacticeUserStore } from "@/stores/facticeUserStore";

export function authGuard(to, from, next) {
    const userStore = useFacticeUserStore();
    if (to.meta.requiresAuth && !userStore.isAuthentificated){
        next({name : 'login'})
    } else {
        next();
    }
}