<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Publicacion } from '../../models/Publicacion'
import PublicacionVista from '../PublicacionVista.vue'
import Paginacion from '../../components/bases/Paginacion.vue'
import { forosPaginadosPerfil, totalForosPub } from '../../services/MiPerfilService'

const posts = ref<Publicacion[]>([])
const totalPosts = ref(0)
const paginaActual = ref(1)

async function cargarPosts(pagina: number) {
    try {
        const response = await forosPaginadosPerfil(pagina)
        posts.value = response.data;
    } catch (error: any) {
        const mensaje: string = error.message || "error al iniciar sesión intente más tarde"
        alert(mensaje)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function cargarTotales() {
    try {
        const response = await totalForosPub();
        totalPosts.value = response.data;
    } catch (error: any) {
        const mensaje: string = error.message || "error al iniciar sesión intente más tarde"
        alert(mensaje)
    }
}

onMounted(() => {
    cargarTotales();
    cargarPosts(1);
})
</script>
<template>
    <div class="w-full md:w-1/2 mx-auto p-2.5 space-y-4">
        <template v-for="post in posts" :key="post.id" :post="post">
            <PublicacionVista :post="post" />
        </template>
    </div>
    <div v-if="totalPosts >= 20">
        <Paginacion :total-items="totalPosts" v-model:pagina-actual="paginaActual" @pag-cambio="cargarPosts" />
    </div>
</template>