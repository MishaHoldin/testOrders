<template>
  <header class="bg-transparent">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-end space-x-4">
        <div class="relative">
          <button
            @click="toggleCurrency"
            class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50"
          >
            <div class="flex items-center">
              <div
                class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2"
              >
                <span class="text-white">{{
                  currencies[selectedCurrencyIndex].symbol
                }}</span>
              </div>
              <span class="text-gray-300">{{
                currencies[selectedCurrencyIndex].code
              }}</span>
            </div>
          </button>

          <div
            v-show="isCurrencyOpen"
            class="absolute right-0 mt-2 w-40 rounded-lg bg-gray-800/80 shadow-lg py-1 z-20"
          >
            <button
              v-for="(curr, index) in currencies"
              :key="curr.code"
              @click="selectCurrency(index)"
              class="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700/50"
              :class="{ 'bg-gray-700/50': selectedCurrencyIndex === index }"
            >
              <div
                class="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2"
              >
                <span class="text-white">{{ curr.symbol }}</span>
              </div>
              <span class="text-gray-300">{{ curr.code }}</span>
            </button>
          </div>
        </div>

        <!-- Меню мов -->
        <div class="relative">
          <button
            @click="toggleLanguage"
            class="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50"
          >
            <div class="flex items-center">
              <div class="w-6 h-6 rounded-full overflow-hidden mr-2">
                <img
                  :src="languages[selectedLanguageIndex].icon"
                  class="w-full h-full object-cover"
                  :alt="languages[selectedLanguageIndex].name"
                />
              </div>
              <span class="text-gray-300">{{
                languages[selectedLanguageIndex].code
              }}</span>
            </div>
          </button>

          <div
            v-show="isLanguageOpen"
            class="absolute right-0 mt-2 w-40 rounded-lg bg-gray-800/80 shadow-lg py-1 z-20"
          >
            <button
              v-for="(language, index) in languages"
              :key="language.code"
              @click="selectLanguage(index)"
              class="flex items-center w-full px-4 py-2 text-left hover:bg-gray-700/50"
              :class="{ 'bg-gray-700/50': selectedLanguageIndex === index }"
            >
              <div class="w-6 h-6 rounded-full overflow-hidden mr-2">
                <img
                  :src="language.icon"
                  class="w-full h-full object-cover"
                  :alt="language.name"
                />
              </div>
              <span class="text-gray-300">{{ language.code }}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useCurrency, type Currency } from "~/composables/useCurrency";
import { useI18n } from "vue-i18n";

const { locale, locales, switchLocale } = useI18n();

const isCurrencyOpen = ref(false);
const isLanguageOpen = ref(false);
const selectedLanguageIndex = ref(0);

const currency = useCurrency();
const selectedCurrencyIndex = currency.selectedIndex;
const currencies = currency.currencies;

const languages = computed(() => {
  return (locales.value as any[]).map((l) => ({
    code: l.code,
    name: l.name,
    icon: l.code === "en" ? "/icons/gb.svg" : "/icons/ua.svg",
  }));
});

const toggleCurrency = () => {
  isCurrencyOpen.value = !isCurrencyOpen.value;
  if (isCurrencyOpen.value) {
    isLanguageOpen.value = false;
  }
};

const toggleLanguage = () => {
  isLanguageOpen.value = !isLanguageOpen.value;
  if (isLanguageOpen.value) {
    isCurrencyOpen.value = false;
  }
};

const selectCurrency = (index: number) => {
  console.log("Selecting currency index:", index);
  console.log(
    "Previous currency:",
    currencies.value[selectedCurrencyIndex.value]
  );
  currency.setCurrency(index);
  console.log("New currency:", currencies.value[index]);
  isCurrencyOpen.value = false;
};

const selectLanguage = (index: number) => {
  const selectedLocale = languages.value[index];
  switchLocale(selectedLocale.code);
  selectedLanguageIndex.value = index;
  isLanguageOpen.value = false;
};

onMounted(() => {
  // Встановлюємо початковий індекс мови на основі поточної локалі
  const currentLocale = locale.value;
  const index = languages.value.findIndex((l) => l.code === currentLocale);
  if (index !== -1) {
    selectedLanguageIndex.value = index;
  }

  document.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target && !target.closest(".relative")) {
      isCurrencyOpen.value = false;
      isLanguageOpen.value = false;
    }
  });
});
</script>

<style scoped>
.bg-gray-800\/50 {
  background-color: rgba(31, 41, 55, 0.5);
}

.bg-gray-700\/50 {
  background-color: rgba(55, 65, 81, 0.5);
}

.bg-blue-500 {
  background-color: #3b82f6;
}
</style>
