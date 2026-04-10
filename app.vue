<script setup lang="ts">
const config = useRuntimeConfig()
const isMaintenance = config.public.maintenance?.enabled

useHead({
  meta: [
    // Force noindex if maintenance mode is enabled globally
    ...(isMaintenance ? [{ name: 'robots', content: 'noindex, nofollow' }] : [])
  ]
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
    
    <!-- Developer Testing Badge -->
    <TestingBadge />
  </div>
</template>