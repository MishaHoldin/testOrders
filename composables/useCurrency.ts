import { ref, computed } from 'vue'

export interface Currency {
  code: string
  symbol: string
}

export const useCurrency = () => {
  const currencies = ref<Currency[]>([
    { code: "USD", symbol: "$" },
    { code: "UAH", symbol: "₴" },
    { code: "EUR", symbol: "€" },
  ])

  const selectedIndex = ref(0)

  const currentCurrency = computed(() => {
    const currency = currencies.value[selectedIndex.value];
    console.log('Computing currentCurrency:', {
      selectedIndex: selectedIndex.value,
      currency
    });
    return currency;
  })

  const setCurrency = (index: number) => {
    console.log('Setting currency index from', selectedIndex.value, 'to', index);
    selectedIndex.value = index;
    console.log('Current currency after change:', currentCurrency.value);
  }

  return {
    currencies,
    selectedIndex,
    currentCurrency,
    setCurrency
  }
} 