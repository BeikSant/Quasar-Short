import { defineStore } from 'pinia';
import { api } from 'src/boot/axios'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore("auth", () => {

    const login = async (email, password) => {
        try {
            await api.post("/auth/login", {
                email: email,
                password: password
            });
        } catch (e) {
            return new Exception(e);
        }
    }

    return {
        login,
    }

});