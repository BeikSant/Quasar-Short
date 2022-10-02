<template>
  <q-page padding>
    <q-btn @click="logout">Logout</q-btn>
    {{ token }} - {{ expiresIn}}
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from "vue"
import { Cookies } from 'quasar'
import { useAuthStore } from 'src/stores/auth-stores'
import { useRouter } from "vue-router"

const token = ref("")
const expiresIn = ref("")
const auth = useAuthStore();
const router = useRouter();

const cookies = Cookies.getAll()
console.log(cookies);

const logout = async () => {
  await auth.logout();
  return router.push({ path: '/login' });
}


</script>
