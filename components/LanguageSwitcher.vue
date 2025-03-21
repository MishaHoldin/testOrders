<template>
  <div class="flex items-center gap-2">
    <button
      v-for="locale in availableLocales"
      :key="locale.code"
      @click="switchLanguage(locale.code)"
      class="px-3 py-1 rounded-md transition-colors"
      :class="[
        currentLocale === locale.code
          ? 'bg-primary text-white'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
      ]"
    >
      {{ locale.name }}
    </button>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, switchLocale } = useI18n();

const currentLocale = computed(() => locale.value);
const availableLocales = computed(() => {
  return (locales.value as any[]).map((l) => ({
    code: l.code,
    name: l.name,
  }));
});

const switchLanguage = (code: string) => {
  switchLocale(code);
};
</script>
