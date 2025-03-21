// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  typescript: {
    strict: true
  },
  components: true,
  css: ['~/assets/css/main.css'],
  build: {
    transpile: ['axios']
  },
  i18n: {
    lazy: true,
    langDir: 'locales',
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en",
        file: "en.json",
        name: "English"
      },
      {
        code: "ua",
        file: "ua.json",
        name: "Українська"
      }
    ],
    defaultLocale: "ua",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  }
})