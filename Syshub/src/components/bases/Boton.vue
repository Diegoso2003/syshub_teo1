<script setup lang="ts">
defineProps<{
    label: string
    type?: 'button' | 'submit'
}>()

const base = 
 'group relative inline-block text-sm font-medium text-indigo-600'
</script>
<template>
    <button :type="type || 'button'" :class="base" >
        <span class="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-red-400 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>
        <span class="relative block border border-current bg-indigo-600 px-8 py-3 text-black"> {{ label }} </span>
    </button>
</template>