<template>

    <q-card class="my-card absolute-center">

        <div class="q-pa-md" style="max-width: 400px">
            <h6 class="q-mt-md q-mb-md">Universidad Nacional de Loja</h6>
            <p class="text-rigth">No tienes una cuenta
                <a href="/register">Registrate</a>
            </p>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                <q-input class="q-pt-md" filled v-model="email" label="Email *" lazy-rules
                    :rules="[val => val && val.length > 0 || 'El campo se encuentra vacio']" />

                <q-input filled type="password" v-model="password" label="Contraseña *" lazy-rules
                    :rules="[val => val && val.length > 0 || 'El campo se encuentra vacio']" />

                <div>
                    <q-btn label="Submit" type="submit" color="primary" />
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
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
const router = useRouter()

const onSubmit = async () => {
    try {
        const res = await api.post("/auth/login", {
            email: email.value,
            password: password.value
        });
        router.push({ path: '/' });
        //token.value = res.data.token;
        //expiresIn.value = res.data.expiresIn;
    } catch (e) {
        console.log(e);
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
</style>