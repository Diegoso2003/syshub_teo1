<script setup lang="ts">
import { ref } from 'vue';
import Input from '../../components/bases/Input.vue';
import Boton from '../../components/bases/Boton.vue';
import TextArea from '../../components/bases/TextArea.vue';
import CardLayout from '../../components/layout/Form.vue';
import { publicarBlog } from '../../services/BlogService';

const tema = ref('')
const contenido = ref('')

const realizarPublicacion = async () => {
    try {
    await publicarBlog(tema.value, contenido.value);
    tema.value = ''
    contenido.value = ''
    alert('Publicación realizada.')
  } catch (error: any) {
    const mensaje: string = error.message || "error al iniciar sesión intente más tarde"
    alert(mensaje)
  }
}
</script>
<template>
    <CardLayout>
        <template #header>
            <h1 class = "text-2xl font-bold mb-6 text-center">Crear Blog</h1>
        </template>
        <form @submit.prevent="realizarPublicacion" class="space-y-4">
            <Input label="Título" v-model="tema" type="text" placeholder="Tema"/>
            <TextArea label="Contenido" v-model="contenido" placeholder="Contenido" :rows="8"/>
            <div class="flex justify-center">
                <Boton type="submit" label="Publicar"/>
            </div>
        </form>
    </CardLayout>
</template>