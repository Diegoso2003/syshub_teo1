<script setup lang="ts">
defineProps<{
    modelValue: string
    type?: string
    placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])

const base = 
    'w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-blue-500'
</script>

<template class="flex items-center justify-between mb-5">
    <input
    :type="type || 'text'"
    :placeholder="placeholder"
    :class="base"
    :value="modelValue"
    @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
</template>