<template>
  <div class="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-dark-bg via-dark-bg to-purple-950/20">
    <div class="relative w-full max-w-md">
      <div class="absolute -inset-1 bg-linear-to-r from-accent to-accent-light rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
      
      <div class="relative bg-dark-card rounded-2xl shadow-2xl overflow-hidden border border-dark-border transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-accent/10">
        
        <div v-if="$slots.header" class="px-6 pt-6 pb-4 border-b border-dark-border">
          <slot name="header" />
        </div>

        <div class="p-6">
          <slot />
        </div>

        <div v-if="$slots.footer" class="px-6 py-4 bg-dark/30 border-t border-dark-border">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>