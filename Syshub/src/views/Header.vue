<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import Boton from '../components/bases/Boton.vue';
import { logout } from '../services/AuthService';
import { useRouter } from 'vue-router';

const open = ref(false)
const router = useRouter();
const dropdownContainer: Ref<HTMLElement | null> = ref(null)

function toggleDropdown(): void {
    open.value = !open.value
}

function closeDropdown(): void {
    open.value = false
}

function handleClickOutside(event: MouseEvent): void {
    if (dropdownContainer.value && !dropdownContainer.value.contains(event.target as Node)) {
        open.value = false
    }
}

function cerrarSesion(){
    logout()
    router.push('/login')
}

onMounted((): void => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted((): void => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
<template>
    <header class="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div class="flex h-16 items-center justify-between">
                <div class="md:flex md:items-center md:gap-12">
                    <a class="flex items-center gap-2 text-teal-600 dark:text-teal-600" href="#">
                        <span class="sr-only">Inicio2</span>
                        <svg class="h-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100,40 L130,55 L100,70 L70,55 Z" fill="#5B7FDB" stroke="#000" stroke-width="3" />
                            <path d="M70,55 L70,85 L100,100 L100,70 Z" fill="#4A6BC8" stroke="#000" stroke-width="3" />
                            <path d="M100,70 L100,100 L130,85 L130,55 Z" fill="#3D5AB5" stroke="#000"
                                stroke-width="3" />
                            <path d="M70,85 L100,100 L70,115 L40,100 Z" fill="#FF6B9D" stroke="#000" stroke-width="3" />
                            <path d="M40,100 L40,130 L70,145 L70,115 Z" fill="#E8547D" stroke="#000" stroke-width="3" />
                            <path d="M70,115 L70,145 L100,130 L100,100 Z" fill="#D44469" stroke="#000"
                                stroke-width="3" />
                            <path d="M100,100 L130,85 L160,100 L130,115 Z" fill="#FF6B9D" stroke="#000"
                                stroke-width="3" />
                            <path d="M100,100 L100,130 L130,145 L130,115 Z" fill="#E8547D" stroke="#000"
                                stroke-width="3" />
                            <path d="M130,115 L130,145 L160,130 L160,100 Z" fill="#D44469" stroke="#000"
                                stroke-width="3" />
                        </svg>
                        <span
                            class="text-xl font-bold bg-linear-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">SysHub</span>
                    </a>
                </div>

                <div class="hidden md:block">
                    <nav aria-label="Global">
                        <ul class="flex items-center gap-6 text-sm">
                            <li>
                                <a class="flex flex-col items-center gap-1 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                    </svg>
                                    <span>Inicio</span>
                                </a>
                            </li>

                            <li>
                                <router-link to="/inicio/foros" class="flex flex-col items-center gap-1 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                    </svg>
                                    <span>Foros</span>
                                </router-link>
                            </li>

                            <li>
                                <router-link to="/inicio/blogs" class="flex flex-col items-center gap-1 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                    </svg>
                                    <span>Blogs</span>
                                </router-link>
                            </li>

                            <li class="relative" ref="dropdownContainer">
                                <button @click.stop="toggleDropdown"
                                    class="flex flex-col items-center gap-1 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                                    </svg>

                                    <div class="flex items-center gap-1">
                                        <span>Proyectos</span>

                                        <svg xmlns="http://www.w3.org/2000/svg" class="size-3 transition-transform"
                                            :class="{ 'rotate-180': open }" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>

                                <div v-show="open"
                                    class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                                    <a @click="closeDropdown"
                                        class="flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 rounded-t-md"
                                        href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-5">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                                        </svg>
                                        <div>
                                            <span class="block font-medium">Subir Proyecto</span>
                                            <span class="block text-xs text-gray-400">Comparte hallazgos y
                                                soluciones</span>
                                        </div>
                                    </a>

                                    <a @click="closeDropdown"
                                        class="flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-5">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                        </svg>
                                        <div>
                                            <span class="block font-medium">Destacados</span>
                                            <span class="block text-xs text-gray-400">Curados por el auxiliar</span>
                                        </div>
                                    </a>

                                    <a @click="closeDropdown"
                                        class="flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                                        href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="size-5">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                        </svg>
                                        <div>
                                            <span class="block font-medium">Explorar</span>
                                            <span class="block text-xs text-gray-400">Buscar por tags y stack</span>
                                        </div>
                                    </a>
                                </div>
                            </li>

                            <li>
                                <router-link to="/inicio/mi_perfil/mis_foros" class="flex flex-col items-center gap-1 text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="size-6">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                    </svg>
                                    <span>Mi perfil</span>
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div class="flex items-center gap-4">
                    <div class="sm:flex sm:gap-4">
                        <div class="hidden sm:flex">
                            <Boton @click="cerrarSesion" label="cerrar sesión" type="button"></Boton>
                        </div>
                    </div>

                    <div class="block md:hidden">
                        <button
                            class="rounded-sm bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75">
                            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div class="pt-16">
        <RouterView />
    </div>
</template>