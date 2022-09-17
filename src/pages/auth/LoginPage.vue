<template>

    <q-card class="my-card absolute-center">

        <div class="q-pa-md" style="max-width: 400px">
            <img class="text-center" src="https://unl.edu.ec/sites/default/files/inline-images/unl_0.png">
            <p class="text-rigth">No tienes una cuenta
                <a href="/register">Registrate</a>
            </p>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input class="q-pt-md" filled v-model="email" label="Email *" lazy-rules
                    :rules="[val => val && val.length > 0 || 'El campo se encuentra vacio']" />

                <q-input filled type="password" v-model="password" label="Contraseña *" lazy-rules
                    :rules="[val => val && val.length > 0 || 'El campo se encuentra vacio']" />

                <div>
                    <q-btn label="Login" type="submit" color="primary" />
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>

        </div>
    </q-card>
</template>
  
<script setup>
import { useQuasar } from 'quasar'
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth-stores'
import { useRouter } from 'vue-router'

const $q = useQuasar()
const email = ref(null)
const password = ref(null)
const auth = useAuthStore();
const router = useRouter()

const onSubmit = async () => {
    try {
        await auth.login(email.value, password.value);
        $q.notify({
            color: 'green-5',
            textColor: 'white',
            icon: 'mdi-check-bold',
            message: 'Sesión Iniciada'
        })
        return router.push({ path: '/' });
    } catch (e) {
        return $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'Credenciales Incorrectas'
        })

    }
};

const onReset = () => {
    email.value = null
    password.value = null
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
    width: 15rem;
    text-align: center;
}
</style>