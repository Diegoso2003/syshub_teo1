<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { getForo } from '../services/ForoService';
import type { Publicacion } from '../models/Publicacion';
import PublicacionVista from './PublicacionVista.vue';
import ComentarioPublicacion from './ComentarioPublicacion.vue';

const route = useRoute()
const publicacion = ref<Publicacion>()
const postId = route.params.id

async function traerPublicacion() {
    try {
        const post = await getForo(Number(postId));
        publicacion.value = post.data[0];
        console.log(post.data)
    } catch (error: any) {
        const mensaje: string = error.message || "error al iniciar sesión intente más tarde"
        alert(mensaje)
    }
}

onMounted(async () => {
    await traerPublicacion()
})
</script>
<template>
    <div v-if="publicacion" class="w-full md:w-1/2 mx-auto p-2.5 space-y-4">
        <PublicacionVista :post="publicacion"/>
    </div>
    <div v-if="publicacion" class="w-full md:w-1/2 mx-auto p-2.5 space-y-4">
        <ComentarioPublicacion :post-id="publicacion.id"/>
    </div>
</template>