<script setup lang="ts">
import { ref } from 'vue';
import Input from '../components/bases/Input.vue';
import Boton from '../components/bases/Boton.vue';
import { registro } from '../services/AuthService'
import CardLayout from '../components/layout/Form.vue';
import { useRouter } from 'vue-router';

const email = ref('')
const password = ref('')
const confirPassword = ref('')
const nombre = ref('')
const router = useRouter()

const registrar = async () => {
    try {
    await registro({ 
        email: email.value, 
        password: password.value,
        nombre: nombre.value,
        confirPassword: confirPassword.value,
        rol: 1
    })
    router.push('/login')
  } catch (error: any) {
    const mensaje: string = error.message || "error al iniciar sesión intente más tarde"
    alert(mensaje)
  }
}
</script>
<template>
    <CardLayout>
        <template #header>
            <h1 class = "text-2xl font-bold mb-6 text-center">Registrarse</h1>
        </template>
        <form @submit.prevent="registrar" class="space-y-4">
            <Input label="correo" v-model="email" type="email" placeholder="Correo"/>
            <Input label="nombre" v-model="nombre" type="text" placeholder="Nombre"/>
            <Input label="contraseña" v-model="password" type="password" placeholder="Contraseña"/>
            <Input label="confirmar contraseña" v-model="confirPassword" type="password" placeholder="Confirme contraseña"/>
            <div class="flex justify-center">
                <Boton type="submit" label="Registrarse"/>
            </div>
        </form>
        <template #footer>
            <p class="text-center text-sm text-text-secondary">
                ¿Ya tienes una cuenta?
                <RouterLink :to="{path: '/login'}" class="text-accent hover:text-accent-light font-semibold transition">Inicia sesión</RouterLink>
            </p>
        </template>
    </CardLayout>
</template>