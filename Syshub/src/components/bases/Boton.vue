<script setup lang="ts">
defineProps<{
    label: string
    type?: 'button' | 'submit'
}>()

const base = 
 'w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
</script>
<template>
    <button :type="type || 'button'" :class="base" >
        {{ label }}
    </button>
</template>