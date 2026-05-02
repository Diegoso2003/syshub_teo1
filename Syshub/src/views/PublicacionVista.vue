<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { Publicacion } from '../models/Publicacion';

const props = defineProps<{
  post: Publicacion
}>()

const router = useRouter()

function irADetalle() {
  // router.push({ name: 'PostDetalle', params: { id: props.post.id } })
  // router.push(`/posts/${props.post.id}`)
}

function darLike() {

}

function darDislike() {

}

function irAComentarios() {
  // router.push({ name: 'PostComentarios', params: { id: props.post.id } })
  // router.push(`/posts/${props.post.id}#comentarios`)
  // router.push(`/posts/${props.post.id}?tab=comentarios`)
}

const fechaFormateada = computed(() => {
  const date = new Date(props.post.fecha)
  const dia = String(date.getDate()).padStart(2, '0')
  const mes = String(date.getMonth() + 1).padStart(2, '0')
  const anio = date.getFullYear()
  const horas = String(date.getHours()).padStart(2, '0')
  const minutos = String(date.getMinutes()).padStart(2, '0')
  
  return `${dia}/${mes}/${anio} ${horas}:${minutos}`
})
</script>
<template>
  <article class="rounded-lg border border-gray-100 bg-white p-4 shadow-xs transition hover:shadow-lg sm:p-6 dark:border-gray-800 dark:bg-gray-900 dark:shadow-gray-700/25">
    <div class="flex items-center gap-3 mb-3">
      <div>
        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ post.usuario_nombre }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ fechaFormateada }}</p>
      </div>
    </div>

    <h3 
      @click="irADetalle"
      class="text-lg font-medium text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
    >
      {{ post.titulo }}
    </h3>

    <p class="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 dark:text-gray-400">
      {{ post.contenido }}
    </p>

    <div class="mt-4 flex items-center gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
      <button 
        @click="darLike"
        class="flex items-center gap-1.5 transition"
        :class="post.dio_like ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400 hover:text-blue-600'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" :fill="post.dio_like ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
        </svg>
        <span class="text-xs">{{ post.likes }}</span>
      </button>

      <button 
        @click="darDislike"
        class="flex items-center gap-1.5 transition"
        :class="post.dio_dislike ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400 hover:text-red-600'"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" :fill="post.dio_dislike ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17.367 13.75c-.806 0-1.533.446-2.031 1.08a9.041 9.041 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 0 0-.322 1.672V21.25a.75.75 0 0 1-.75.75 2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282m0 0H4.622c-1.026 0-1.945-.694-2.054-1.715a12.134 12.134 0 0 1-.068-1.285c0-2.848.992-5.464 2.649-7.521C5.537 4.247 6.136 4 6.754 4h4.016a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23h1.294M17.367 13.75c-.618 0-.991-.724-.725-1.282A7.471 7.471 0 0 1 16.5 4.25 2.25 2.25 0 0 1 18.75 2a.75.75 0 0 1 .75.75v.633c0 .573.11 1.14.322 1.672.304.76.93 1.33 1.653 1.715a9.04 9.04 0 0 1 2.86 2.4c.498.634 1.226 1.08 2.032 1.08h.384m-10.253-1.5H9.7m8.075 9.75c-.01-.05-.027-.1-.05-.148-.593-1.2-.925-2.55-.925-3.977 0-1.487.36-2.89.999-4.125m-.023 8.25c.076.365-.183.75-.575.75h-.908c-.889 0-1.713-.518-1.972-1.368-.339-1.11-.521-2.287-.521-3.507 0-1.553.295-3.036.831-4.398.306-.774 1.086-1.227 1.918-1.227h1.053c.472 0 .745.556.5.96a8.95 8.95 0 0 1-.303.54" />
        </svg>
        <span class="text-xs">{{ post.dislikes }}</span>
      </button>

      <button 
        @click="irAComentarios"
        class="flex items-center gap-1.5 text-gray-500 transition hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
        </svg>
        <span class="text-xs">{{ post.comentarios }}</span>
      </button>
    </div>
  </article>
</template>