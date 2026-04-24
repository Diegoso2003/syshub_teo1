<script setup lang="ts">
import { ref } from 'vue';
import Input from '../components/bases/Input.vue';
import Boton from '../components/bases/Boton.vue';
import { login } from '../services/AuthService'
import CardLayout from '../components/layout/CardLayout.vue';

const email = ref('')
const password = ref('')

const handleLogin = async () => {
    try {
    await login(email.value, password.value)
    alert('Login exitoso 🚀')
  } catch (error: any) {
    console.error(error)
    const mensaje: string = error.message || "error al iniciar sesión intente más tarde"
    alert(mensaje)
  }
}
</script>
<template>
    <CardLayout>
        <template name="#Header"></template>
        <h1 class = "text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>
        <form @submit.prevent="handleLogin" class="space-y-4">
            <Input v-model="email" type="email" placeholder="Correo"/>
            <Input v-model="password" type="password" placeholder="Contraseña"/>
            <Boton type="submit" label="Iniciar sesión"/>
        </form>
        <template name="#Footer">
            <p class="text-center text-sm text-text-secondary">
                ¿No tienes una cuenta?
                <a href="#" class="text-accent hover:text-accent-light font-semibold transition">Regístrate gratis</a>
            </p>
        </template>
    </CardLayout>
</template>