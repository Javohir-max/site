// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primeuix/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon', '@primevue/nuxt-module'],
  primevue: {
    options: {
      theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: 'white',
            cssLayer: false
        }
    }
    }
  },

  app: {
    head: {
      title: 'My Site',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'My website built with Nuxt.js' },
        { name: 'theme-color', content: '#000000' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/Logo.png'}
      ]
    }
  },
  css: [
    "~/assets/styles/main.scss"
  ]
})