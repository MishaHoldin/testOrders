<template>
  <div class="flex flex-col items-center justify-center min-h-screen px-4">
    <h1 class="text-4xl font-bold text-white mb-8">
      {{
        currentUser ? $t("welcome") + ", " + currentUser.email : $t("welcome")
      }}
    </h1>
    <div v-if="!currentUser" class="w-full max-w-md space-y-4">
      <button
        @click="openModal('register')"
        class="block w-full py-3 text-center bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
      >
        {{ "auth.register" }}
      </button>

      <button
        @click="openModal('login')"
        class="block w-full py-3 text-center bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
      >
        {{ "auth.login" }}
      </button>
      <NuxtLink
        to="/orders"
        class="block w-full py-3 text-center bg-white text-black rounded-full hover:bg-gray-100 transition-colors"
      >
        {{ "orders.title" }}
      </NuxtLink>
    </div>

    <div v-else class="w-full max-w-md space-y-4">
      <button
        @click="handleLogout"
        class="block w-full py-3 text-center bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
      >
        {{ $t("auth.logout") }}
      </button>
    </div>

    <RegistrationModal
      :is-open="isModalOpen"
      :initial-mode="modalMode"
      @close="closeModal"
      @login-success="handleLoginSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { definePageMeta } from "#imports";

definePageMeta({
  layout: "default",
});

interface User {
  id: string;
  email: string;
  useSocialNetworks: boolean;
}

const isModalOpen = ref(false);
const modalMode = ref("register");
const currentUser = ref<User | null>(null);

const openModal = (mode: string) => {
  modalMode.value = mode;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleLoginSuccess = (user: User) => {
  currentUser.value = user;
  // Тут можна зберегти дані користувача в localStorage або інше сховище
  localStorage.setItem("user", JSON.stringify(user));
};

const handleLogout = () => {
  currentUser.value = null;
  localStorage.removeItem("user");
};

// Перевіряємо при завантаженні сторінки, чи є збережений користувач
onMounted(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser);
  }
});
</script>
