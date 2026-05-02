<script setup lang="ts">
defineProps<{
    label: string
    modelValue: string
    rows:number
    type?: string
    placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])

</script>

<template class="flex items-center justify-between mb-5">
    <div>
        <label :for="label">
            <span class="block text-sm font-medium text-gray-900 dark:text-white"> {{ label }} </span>
            <textarea
                class="mt-1 w-full resize-none rounded-lg border-gray-300 focus:border-indigo-500 focus:outline-none dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                :id="label" :rows="rows" :placeholder="placeholder"
                @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"></textarea>
        </label>
    </div>
</template>