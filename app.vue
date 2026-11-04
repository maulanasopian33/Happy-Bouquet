<script setup lang="ts">
const config = useRuntimeConfig()
const isMaintenance = config.public.maintenance?.enabled

// Inisialisasi dynamic SEO global dari database settings
useSeo({
  robots: isMaintenance ? 'noindex, nofollow' : undefined
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <!-- Developer Testing Badge -->
    <TestingBadge />
  </div>
</template>
