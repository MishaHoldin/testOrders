<template>
  <div class="min-h-screen text-white p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Back button -->
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z"
            clip-rule="evenodd"
          />
        </svg>
        {{ $t("common.back") }}
      </NuxtLink>

      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold">{{ $t("orders.title") }}</h1>
        <button
          @click="createTestData"
          class="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          :disabled="isLoading"
        >
          {{ isLoading ? $t("orders.creating") : $t("orders.createTestData") }}
        </button>
      </div>

      <div
        class="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl transition-all duration-300 hover:shadow-2xl"
      >
        <table class="w-full">
          <thead>
            <tr class="text-left bg-gray-700/50">
              <th
                v-for="field in [
                  'TransactionID',
                  'Date',
                  'Status',
                  'GameName',
                  'GameID',
                  'Amount',
                ]"
                :key="field"
                class="p-4 cursor-pointer hover:bg-gray-600/50 transition-colors duration-200"
                @click="toggleSort(field)"
              >
                <div class="flex items-center gap-2">
                  {{ field }}
                  <span v-if="sortField === field" class="text-blue-400">
                    {{ sortDirection === "asc" ? "↑" : "↓" }}
                  </span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              @click="openOrderDetails(order)"
              class="border-b border-gray-700/30 hover:bg-gray-700/30 cursor-pointer transition-all duration-300 transform hover:scale-[1.01]"
            >
              <td class="p-4">
                {{ $t("orders.transactionId") }}#{{ order.TransactionID }}
              </td>
              <td class="p-4">{{ order.Date }}</td>
              <td class="p-4">
                <span
                  class="px-2 py-1 rounded-full text-sm transition-all duration-300"
                  :class="getStatusClass(order.Status)"
                >
                  {{ $t(`orders.status.${order.Status.toLowerCase()}`) }}
                </span>
              </td>
              <td class="p-4">{{ order.GameName }}</td>
              <td class="p-4">{{ order.GameID }}</td>
              <td class="p-4">{{ order.Amount }} {{ order.currency }}</td>
            </tr>
            <tr v-if="filteredOrders.length === 0" class="text-center">
              <td colspan="6" class="p-4 text-gray-400">
                {{ $t("orders.noOrdersFound") }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Order Details Modal -->
    <pre>{{ currency }}</pre>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <div
        v-if="selectedOrder"
        class="fixed inset-0 bg-black/90 flex items-start justify-center pt-16"
      >
        <div
          class="bg-gray-900 w-full max-w-md mx-4 rounded-2xl overflow-hidden"
        >
          <!-- Header -->
          <div class="flex items-center justify-between p-4 bg-gray-800/50">
            <div class="flex items-center gap-2">
              <span class="flex items-center">
                <span class="text-blue-400 mr-1">$</span>
                <span>USD</span>
              </span>
              <span class="text-gray-500">|</span>
              <span class="flex items-center">
                <img src="/icons/gb.svg" alt="EN" class="w-4 h-4 mr-1" />
                <span>EN</span>
              </span>
            </div>
            <button
              @click="selectedOrder = null"
              class="text-gray-400 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Order ID -->
          <div class="flex items-center gap-2 p-4">
            <span class="text-lg">#{{ selectedOrder.TransactionID }}</span>
          </div>

          <!-- Order Details -->
          <div class="p-4 space-y-4">
            <div class="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div class="text-gray-400 mb-1">
                  {{ $t("orders.transactionId") }}
                </div>
                <div>#{{ selectedOrder.TransactionID }}</div>
              </div>
              <div>
                <div class="text-gray-400 mb-1">{{ $t("orders.date") }}</div>
                <div>{{ selectedOrder.Date }}</div>
              </div>
              <div>
                <div class="text-gray-400 mb-1">
                  {{ $t("orders.status.title") }}
                </div>
                <div>
                  <span
                    class="px-2 py-1 rounded-full text-xs"
                    :class="getStatusClass(selectedOrder.Status)"
                  >
                    {{
                      $t(`orders.status.${selectedOrder.Status.toLowerCase()}`)
                    }}
                  </span>
                </div>
              </div>
            </div>

            <div class="space-y-2">
              <div>
                <div class="text-gray-400 mb-1">
                  {{ $t("orders.gameName") }}
                </div>
                <div>{{ selectedOrder.GameName }}</div>
              </div>
              <div>
                <div class="text-gray-400 mb-1">{{ $t("orders.gameId") }}</div>
                <div>{{ selectedOrder.GameID }}</div>
              </div>
              <div>
                <div class="text-gray-400 mb-1">{{ $t("orders.amount") }}</div>
                <div class="text-xl font-bold">${{ selectedOrder.Amount }}</div>
              </div>
            </div>

            <!-- Your Goods section -->
            <div class="mt-6">
              <div class="text-lg mb-2">{{ $t("orders.yourGoods") }}:</div>
              <div class="bg-gray-800/50 rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                  <div class="text-2xl font-bold">40,500</div>
                  <div class="text-green-400">+1,500</div>
                </div>
                <div class="flex justify-between items-center">
                  <div class="text-2xl font-bold">
                    {{ selectedOrder.Amount }}$
                  </div>
                  <div class="text-gray-400 line-through">749.99$</div>
                </div>
              </div>
            </div>

            <!-- Ask button -->
            <button
              class="w-full py-3 bg-white text-gray-900 rounded-lg font-medium mt-4"
            >
              {{ $t("orders.ask") }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { apiService, type Order } from "~/services/api";
import { useCurrency, type Currency } from "~/composables/useCurrency";

const currency = useCurrency();
const selectedIndex = currency.selectedIndex;
const currentCurrency = currency.currentCurrency;

const orders = ref<Order[]>([]);
const filteredOrders = ref<Order[]>([]);
const selectedOrder = ref<Order | null>(null);
const isLoading = ref(false);

// Сортування
const sortField = ref<keyof Order | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");

// Функція для фільтрації замовлень
const filterOrders = () => {
  console.log("Filtering orders for currency:", currentCurrency.value?.code);
  console.log("Available orders:", orders.value);

  if (!orders.value || !currentCurrency.value) {
    filteredOrders.value = [];
    return;
  }

  let filtered = orders.value.filter((order) => {
    const match = order.currency === currentCurrency.value.code;
    console.log(
      `Order ${order.TransactionID}: ${order.currency} === ${currentCurrency.value.code} = ${match}`
    );
    return match;
  });

  // Сортування
  if (sortField.value) {
    filtered.sort((a, b) => {
      const aValue = a[sortField.value!];
      const bValue = b[sortField.value!];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection.value === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      const aNum = Number(aValue);
      const bNum = Number(bValue);

      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortDirection.value === "asc" ? aNum - bNum : bNum - aNum;
      }

      return 0;
    });
  }

  console.log("Filtered orders:", filtered);
  filteredOrders.value = filtered;
};

// Відстежуємо зміни валюти через selectedIndex
watch(
  selectedIndex,
  (newIndex) => {
    console.log("Selected index changed to:", newIndex);
    console.log("New currency:", currency.currencies.value[newIndex]);
    filterOrders();
  },
  { immediate: true }
);

// Відстежуємо зміни в orders
watch(
  orders,
  () => {
    console.log("Orders changed, refiltering");
    filterOrders();
  },
  { immediate: true }
);

const toggleSort = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field as keyof Order;
    sortDirection.value = "asc";
  }
  filterOrders(); // Перефільтровуємо при зміні сортування
};

const fetchOrders = async () => {
  try {
    console.log("Fetching orders...");
    orders.value = await apiService.getOrders();
    console.log("Fetched orders:", orders.value);
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

const createTestData = async () => {
  isLoading.value = true;
  try {
    await apiService.createTestOrders();
    await fetchOrders(); // Оновлюємо список після створення
  } catch (error) {
    console.error("Error creating test data:", error);
  } finally {
    isLoading.value = false;
  }
};

const getStatusClass = (status: string) => {
  const statusLower = status.toLowerCase();
  if (statusLower.includes("success") || statusLower.includes("completed")) {
    return "bg-green-500/20 text-green-400";
  }
  if (statusLower.includes("fail") || statusLower.includes("error")) {
    return "bg-red-500/20 text-red-400";
  }
  return "bg-yellow-500/20 text-yellow-400";
};

const openOrderDetails = (order: Order) => {
  selectedOrder.value = order;
};

fetchOrders();
</script>

<style scoped>
.bg-gray-800\/50 {
  background-color: rgba(31, 41, 55, 0.5);
}

.bg-gray-700\/50 {
  background-color: rgba(55, 65, 81, 0.5);
}

.bg-gray-700\/30 {
  background-color: rgba(55, 65, 81, 0.3);
}

.bg-gray-800\/90 {
  background-color: rgba(31, 41, 55, 0.9);
}
</style>
