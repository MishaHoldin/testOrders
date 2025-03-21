<template>
  <div class="max-w-md mx-auto">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">
          {{ isLogin ? $t("auth.login") : $t("auth.register") }}
        </h2>
        <button
          @click="closeAuth"
          class="text-gray-500 hover:text-gray-700 transition-colors"
        >
          <Icon name="heroicons:x-mark" class="w-6 h-6" />
        </button>
      </div>

      <Transition name="fade" mode="out-in">
        <form v-if="isLogin" @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t("auth.email") }}
            </label>
            <input
              v-model="loginForm.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t("auth.password") }}
            </label>
            <input
              v-model="loginForm.password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            {{ $t("auth.loginButton") }}
          </button>
        </form>

        <form v-else @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t("auth.name") }}
            </label>
            <input
              v-model="registerForm.name"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t("auth.email") }}
            </label>
            <input
              v-model="registerForm.email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              {{ $t("auth.password") }}
            </label>
            <input
              v-model="registerForm.password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            {{ $t("auth.registerButton") }}
          </button>
        </form>
      </Transition>

      <div class="mt-6 text-center">
        <button
          @click="isLogin = !isLogin"
          class="text-primary hover:text-primary/80 transition-colors"
        >
          {{ isLogin ? $t("auth.createAccount") : $t("auth.haveAccount") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const isLogin = ref(true);

const loginForm = ref({
  email: "",
  password: "",
});

const registerForm = ref({
  name: "",
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    // TODO: Implement login logic
    console.log("Login:", loginForm.value);
    router.push("/orders");
  } catch (error) {
    console.error("Login error:", error);
  }
};

const handleRegister = async () => {
  try {
    // TODO: Implement register logic
    console.log("Register:", registerForm.value);
    router.push("/orders");
  } catch (error) {
    console.error("Register error:", error);
  }
};

const closeAuth = () => {
  router.push("/");
};

definePageMeta({
  layout: "default",
});
</script>
