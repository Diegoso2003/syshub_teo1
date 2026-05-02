<template>
    <div class="max-w-2xl mx-auto h-120 flex flex-col border border-gray-200 dark:border-gray-800 rounded-lg">

        <div class="flex-1 overflow-y-auto p-2 space-y-1">
            <ComentarioItem v-for="c in comentarios" :key="c.id" :comentario="c" />
        </div>

        <div class="border-t border-gray-200 dark:border-gray-800 p-3 bg-white dark:bg-gray-900">
            <div class="text-sm text-gray-500">
                <form @submit.prevent="comentarComentario" class="space-y-4">
                    <TextArea label="comentar" v-model="contenidoComentario" :rows="2" placeholder="Escriba su comentario" />
                    <div class="flex justify-center">
                        <Boton type="submit" label="Comentar" />
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { comentar, getComentarios } from '../services/ForoService'
import type { Comentario } from '../models/Comentario';
import TextArea from '../components/bases/TextArea.vue';
import Boton from '../components/bases/Boton.vue';

const props = defineProps<{
    postId: number
}>()

const comentarios = ref<Comentario[]>([])
const contenidoComentario = ref('')

async function comentarComentario(){
    try {
        await comentar(props.postId, contenidoComentario.value)
    } catch (error: any) {
        const mensaje: string = error.message || "error al iniciar sesión intente más tarde"
        alert(mensaje)
    }
}

async function traerComentario(){
    try {
        const res = await getComentarios(props.postId)
        comentarios.value = res.data
        console.log('comentiors', comentraio)
    } catch (error: any) {
        const mensaje: string = error.message || "error al iniciar sesión intente más tarde"
        alert(mensaje)
    }
}

onMounted(async () => {
    await traerComentario()
})
</script>