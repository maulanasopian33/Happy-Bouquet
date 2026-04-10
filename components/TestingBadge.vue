<script setup lang="ts">
const isBypassActive = ref(false)

onMounted(() => {
  // Check localStorage for bypass flag
  if (localStorage.getItem('maintenance_bypass') === 'true') {
    isBypassActive.value = true
  }
})
</script>

<template>
  <Transition name="fade">
    <div v-if="isBypassActive" class="testing-badge shadow-brand animate-pulse-ring">
      <div class="badge-content">
        <Icon name="ph:bug-duotone" size="18" />
        <span class="badge-text">DEVELOPER TESTING MODE</span>
      </div>
      <div class="badge-subtext">Maintenance Bypassed</div>
    </div>
  </Transition>
</template>

<style scoped>
.testing-badge {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: 1rem;
  border: 1px solid rgba(225, 29, 72, 0.3);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  pointer-events: none;
}

.badge-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 800;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--color-brand);
}

.badge-subtext {
  font-size: 0.65rem;
  color: #94a3b8;
  font-weight: 500;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 768px) {
  .testing-badge {
    bottom: 5rem; /* Avoid overlapping with mobile bottom bar */
    right: 1rem;
  }
}
</style>
