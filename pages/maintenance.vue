<script setup lang="ts">
const config = useRuntimeConfig()

definePageMeta({
  layout: false
})

useHead({
  title: 'Pembaruan Sistem | Happy Bouquet',
  meta: [
    { name: 'robots', content: 'noindex, nofollow' }
  ]
})
</script>

<template>
  <div class="maintenance-page">
    <div class="background-overlay"></div>
    
    <main class="content section-wrapper reveal">
      <div class="logo-box">
        <span class="logo-text">Happy<span class="text-brand">Bouquet</span></span>
      </div>

      <div class="illustration-box animate-float">
        <Icon name="ph:paint-brush-broad-duotone" size="80" class="icon-brand" />
      </div>

      <h1 class="section-title text-gradient">Sedang Menyegarkan <br/>Koleksi Kami</h1>
      
      <p class="description">
        Kami sedang memperbarui pilihan bunga terbaik untuk Anda. <br/>
        Mohon tunggu sebentar, kami akan segera kembali dengan rangkaian yang lebih menawan.
      </p>

      <div class="divider-brand mx-auto"></div>

      <div class="info-grid">
        <div class="info-item">
          <Icon name="ph:clock-duotone" size="24" />
          <span>Segera Kembali</span>
        </div>
        <div class="info-item">
          <Icon name="ph:instagram-logo-duotone" size="24" />
          <span>@happybouquet.id</span>
        </div>
      </div>

      <div class="footer-cta">
        <a href="https://wa.me/628123456789" target="_blank" class="btn-premium">
          <Icon name="ph:whatsapp-logo" size="20" />
          Hubungi Admin (WhatsApp)
        </a>
      </div>
    </main>
  </div>
</template>

<style scoped>
.maintenance-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-main);
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: 2rem;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 10% 20%, rgba(225, 29, 72, 0.05) 0%, transparent 50%),
              radial-gradient(circle at 90% 80%, rgba(225, 29, 72, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.content {
  position: relative;
  z-index: 10;
  max-width: 600px;
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  padding: 4rem 2rem;
  border-radius: 3rem;
  box-shadow: var(--shadow-card);
}

.logo-box {
  margin-bottom: 2.5rem;
}

.logo-text {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.text-brand {
  color: var(--color-brand);
}

.illustration-box {
  margin-bottom: 2rem;
  color: var(--color-brand);
}

.icon-brand {
  filter: drop-shadow(0 10px 15px var(--color-brand-glow));
}

.description {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
}

.info-grid {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 3rem;
  color: var(--text-primary);
  font-weight: 600;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.footer-cta {
  display: flex;
  justify-content: center;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 640px) {
  .content {
    padding: 3rem 1.5rem;
    border-radius: 2rem;
  }
  
  .info-grid {
    flex-direction: column;
    gap: 1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }
}
</style>
