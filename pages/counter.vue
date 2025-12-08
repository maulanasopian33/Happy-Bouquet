<script setup>
const counter = useCounterStore()
</script>

<template>
  <div class="p-4">
    <p>Count: {{ counter.count }}</p>
    <button @click="counter.increment()" class="bg-blue-500 text-white px-4 py-2 rounded">
      Tambah
    </button>
  </div>
</template>
