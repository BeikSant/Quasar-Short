import { defineStore } from 'pinia';
import { api } from 'src/boot/axios'
import { ref } from 'vue'

export const useAuthStore = defineStore("auth", () => {

    const user = ref(null);
    const token = ref(null);
    const expiresIn = ref(null);

    const login = async (email, password) => {
        try {
            const res = await api.post("/auth/login", {
                email: email,
                password: password
            });
            token.value = res.data.token;
            expiresIn.value = res.data.expiresIn;
            sessionStorage.setItem("user", true);
            setTime();
        } catch (e) {
            return new Exception(e);
        }
    }

    const setTime = () => {
        setTimeout(() => {
            refreshToken();
        }, expiresIn.value * 1000 - 6000);
    };

    const refreshToken = async () => {
        try {
            const res = await api.get("/auth/refresh");
            token.value = res.data.token;
            expiresIn.value = res.data.expiresIn;
            setTime();
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        try {
            await api.get("/auth/logout");
        } catch (error) {
            console.log(error);
        } finally {
            resetStore();
        }
    };

    const resetStore = () => {
        user.value = null;
        token.value = null;
        expiresIn.value = null;
        sessionStorage.removeItem("user");
    };

    return {
        login,
        user,
        token,
        expiresIn,
        refreshToken,
        logout,
    }

});