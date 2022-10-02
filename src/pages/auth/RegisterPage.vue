<template>

    <q-card class="my-card absolute-center">

        <div class="q-pa-md" style="min-width: 300px">
            <img class="text-center" src="https://unl.edu.ec/sites/default/files/inline-images/unl_0.png">
            <p class="text-rigth">Ya posees una cuenta
                <a href="/login">Ingresar</a>
            </p>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input class="q-pt-md" filled v-model="email" label="Email *" lazy-rules
                    :rules="[val => val && val.length > 0 || 'El campo se encuentra vacio']" />

                <q-input filled type="password" v-model="password" label="Contraseña *" lazy-rules
                    :rules="[val => val && val.length > 0 || 'El campo se encuentra vacio']" />

                <q-input filled type="password" v-model="repassword" label="Repita Contraseña *" lazy-rules
                    :rules="[val => val && val.length > 0 || 'El campo se encuentra vacio']" />

                <div>
                    <q-btn label="Registrar" type="submit" color="primary" />
                    <q-btn label="Resetear" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>

        </div>
    </q-card>
</template>
  
<script setup>
import { useQuasar } from 'quasar'
import { api } from 'src/boot/axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const email = ref(null)
const password = ref(null)
const repassword = ref(null);
const router = useRouter()

const onSubmit = async () => {
    try {
        const res = await api.post("/auth/register", {
            email: email.value,
            password: password.value,
            repassword: repassword.value
        });
        router.push({ path: '/login' });
        //token.value = res.data.token;
        //expiresIn.value = res.data.expiresIn;
    } catch (e) {
        console.log(e.response.data.errors[0].msg);
        return $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: e.response.data.errors[0].msg
        })
    }
};

const onReset = () => {
    email.value = null
    password.value = null
    repassword.value = null;
}

</script>
  
<style lang="scss">
h6 {
    text-align: center;
}

p {
    font-size: 0.7rem;
    margin-bottom: 20px;
    text-align: right;
    ;
}

a {
    text-decoration: none;

    &:visited {
        color: $primary;
    }
}

img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 70%;
}

.my-card {
    padding: 20px;
}

body {
    background-color: $light-blue-1;
}
</style>