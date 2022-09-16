<template>
  <q-page padding>
    <q-btn @click="access">Login</q-btn>
    <q-btn @click="crearLink">Link</q-btn>
    {{ token }} - {{ expiresIn}}
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from "vue"
import { Cookies } from 'quasar'




const token = ref("")
const expiresIn = ref("")

const cookies = Cookies.getAll()
console.log(cookies);


const refreshToken = async () => {
  try {
    const res = await api.get("/auth/refresh");
    console.log(res.data);
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
  } catch (e) {
    console.log(e);

  }
};

</script>
