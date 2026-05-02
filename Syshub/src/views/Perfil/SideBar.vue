<template>
    <div
        class="fixed top-16 left-0 h-screen w-64 flex flex-col justify-between bg-gray-900 text-gray-200 border-r border-gray-800">
        <div class="px-4 py-6">

            <ul class="mt-6 space-y-1">
                <li>
                    <details class="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white">
                            <span class="text-sm font-medium">Foros</span>

                            <span class="transition duration-300 group-open:-rotate-180">
                                ▼
                            </span>
                        </summary>

                        <ul class="mt-2 space-y-1 px-4">
                            <li>
                                <router-link to="/inicio/mi_perfil/mis_foros"
                                    class="block rounded-lg px-4 py-2 text-sm hover:bg-gray-800 hover:text-white">
                                    Foros publicados
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/inicio/mi_perfil/crear_foro"
                                    class="block rounded-lg px-4 py-2 text-sm hover:bg-gray-800 hover:text-white">
                                    Publicar
                                </router-link>
                            </li>
                        </ul>
                    </details>
                </li>

                <li>
                    <details class="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white">
                            <span class="text-sm font-medium">Blogs</span>

                            <span class="transition duration-300 group-open:-rotate-180">
                                ▼
                            </span>
                        </summary>

                        <ul class="mt-2 space-y-1 px-4">
                            <li>
                                <router-link to="/inicio/mi_perfil/mis_blogs"
                                    class="block rounded-lg px-4 py-2 text-sm hover:bg-gray-800 hover:text-white">
                                    Blogs publicados
                                </router-link>
                            </li>
                            <li v-if="rol === 4 || rol === 2">
                                <router-link to="/inicio/mi_perfil/"
                                    class="block rounded-lg px-4 py-2 text-sm hover:bg-gray-800 hover:text-white">
                                    Publicar
                                </router-link>
                            </li>
                        </ul>
                    </details>
                </li>

                <li>
                    <details class="group [&_summary::-webkit-details-marker]:hidden">
                        <summary
                            class="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-400 hover:bg-gray-800 hover:text-white">
                            <span class="text-sm font-medium">Cuenta</span>

                            <span class="transition duration-300 group-open:-rotate-180">
                                ▼
                            </span>
                        </summary>

                        <ul class="mt-2 space-y-1 px-4">
                            <li>
                                <a href="#"
                                    class="block rounded-lg px-4 py-2 text-sm hover:bg-gray-800 hover:text-white">
                                    Actualizar datos
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block rounded-lg px-4 py-2 text-sm hover:bg-gray-800 hover:text-white">
                                    Actualizar contraseña
                                </a>
                            </li>
                            <li>
                                <a href="#"
                                    class="block rounded-lg px-4 py-2 text-sm hover:bg-gray-800 hover:text-white">
                                    Elementos guardados
                                </a>
                            </li>
                        </ul>
                    </details>
                </li>

            </ul>
        </div>
    </div>
    <div class="ml-64">
        <RouterView />
    </div>
</template>
<script setup lang="ts">
import { token } from '../../services/AuthService';

const rol = token().rol;

</script>