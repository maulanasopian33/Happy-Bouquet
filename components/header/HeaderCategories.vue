<template>
  <nav class="hidden md:block border-b border-gray-200">
    <ul class="container mx-auto flex justify-center space-x-6 text-gray-700 font-medium text-sm py-2">
      <li v-for="item in categories" :key="item">
        <NuxtLink to="/" class="hover:text-rose-600 transition-colors duration-300">
          {{ item }}
        </NuxtLink>
      </li>
    </ul>
 </nav>
</template>

<script setup>
const categories = [
  "Bunga Segar",
  "Buket Snack",
  "Buket Uang",
  "Buket Wisuda",
  "Buket Custom"
]
</script>

<style scoped>
/* Add any component-specific styles here */
.nuxt-link-active {
  color: #be185d; /* rose-700 */
}
</style>
