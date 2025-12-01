<template>
  <main class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 text-center">
    <div class="max-w-md">
      <img
        src="https://cdn-icons-png.flaticon.com/512/5651/5651855.png"
        alt="Under Construction"
        class="w-40 mx-auto mb-6 opacity-90"
      />

      <h1 class="text-3xl font-bold text-gray-800 mb-3">
        Website Sedang Dalam Pengembangan
      </h1>

      <p class="text-gray-600 mb-6">
        Kami sedang menyiapkan platform terbaik untuk memesan bouquet dari
        <span class="font-semibold">Happy Bouquet</span>.  
        Mohon ditunggu ya! 🌸💐
      </p>

      <div class="mt-6 text-sm text-gray-500">
        © {{ year }} Happy Bouquet
      </div>
    </div>
  </main>
</template>

<script setup>
const year = new Date().getFullYear()
</script>
