<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 flex items-center justify-center z-50"
  >
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="relative bg-[#1C1C1E] rounded-lg p-6 w-[400px] text-white">
      <div class="flex justify-between items-center mb-6">
        <div class="flex bg-[#2C2C2E] rounded-full p-1 w-[280px]">
          <button
            class="flex-1 py-2 px-4 rounded-full text-center transition-colors duration-200"
            :class="{
              'bg-white text-black': !isRegistration,
              'text-gray-400': isRegistration,
            }"
            @click="switchMode(false)"
          >
            Login
          </button>
          <button
            class="flex-1 py-2 px-4 rounded-full text-center transition-colors duration-200"
            :class="{
              'bg-white text-black': isRegistration,
              'text-gray-400': !isRegistration,
            }"
            @click="switchMode(true)"
          >
            Registration
          </button>
        </div>
        <button @click="closeModal" class="text-gray-400 hover:text-gray-300">
          <span class="text-2xl">×</span>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div
          v-if="loginError"
          class="bg-red-500 bg-opacity-10 text-red-500 p-3 rounded text-sm"
        >
          {{ loginError }}
        </div>
        <div>
          <input
            type="text"
            v-model="formData.emailOrMobile"
            placeholder="Email or Mobile"
            class="w-full bg-[#2C2C2E] rounded p-3 text-white placeholder-gray-500"
            :class="{ 'border border-red-500': errors.emailOrMobile }"
            @blur="validateField('emailOrMobile')"
          />
          <span
            v-if="errors.emailOrMobile"
            class="text-red-500 text-sm mt-1 block"
          >
            {{ errors.emailOrMobile }}
          </span>
        </div>
        <div>
          <input
            type="password"
            v-model="formData.password"
            placeholder="Password"
            class="w-full bg-[#2C2C2E] rounded p-3 text-white placeholder-gray-500"
            :class="{ 'border border-red-500': errors.password }"
            @blur="validateField('password')"
          />
          <span v-if="errors.password" class="text-red-500 text-sm mt-1 block">
            {{ errors.password }}
          </span>
        </div>
        <div v-if="isRegistration">
          <input
            type="password"
            v-model="formData.confirmPassword"
            placeholder="Confirm Password"
            class="w-full bg-[#2C2C2E] rounded p-3 text-white placeholder-gray-500"
            :class="{ 'border border-red-500': errors.confirmPassword }"
            @blur="validateField('confirmPassword')"
          />
          <span
            v-if="errors.confirmPassword"
            class="text-red-500 text-sm mt-1 block"
          >
            {{ errors.confirmPassword }}
          </span>
        </div>

        <div class="flex items-center space-x-2">
          <input
            type="checkbox"
            v-model="formData.useSocialNetworks"
            class="bg-[#2C2C2E] rounded"
          />
          <span class="text-gray-400">Use social networks</span>
        </div>

        <button
          type="submit"
          class="w-full bg-white text-black rounded-full py-3 font-medium hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isSubmitting"
        >
          {{ isRegistration ? "Registration" : "Login" }}
        </button>

        <div class="text-center text-gray-400 mt-4">Use social networks</div>

        <div class="flex justify-center space-x-4 mt-4">
          <button
            v-for="(icon, index) in socialIcons"
            :key="index"
            type="button"
            class="w-10 h-10 rounded-full bg-[#2C2C2E] flex items-center justify-center hover:bg-[#3C3C3E] transition-colors"
            @click="handleSocialLogin(icon.name)"
          >
            <img :src="icon.src" :alt="icon.name" class="w-6 h-6" />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import axios from "axios";

interface FormData {
  emailOrMobile: string;
  password: string;
  confirmPassword: string;
  useSocialNetworks: boolean;
}

interface FormErrors {
  emailOrMobile?: string;
  password?: string;
  confirmPassword?: string;
}

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  initialMode: {
    type: String,
    default: "register",
  },
});

const emit = defineEmits(["close", "login-success"]);

const isRegistration = ref(props.initialMode === "register");
const isSubmitting = ref(false);
const loginError = ref("");

const formData = reactive<FormData>({
  emailOrMobile: "",
  password: "",
  confirmPassword: "",
  useSocialNetworks: false,
});

const errors = reactive<FormErrors>({});

const socialIcons = [
  { name: "Google", src: "/images/google.svg" },
  { name: "Apple", src: "/images/apple.svg" },
  { name: "Facebook", src: "/images/facebook.svg" },
  { name: "Discord", src: "/images/discord.svg" },
  { name: "Telegram", src: "/images/telegram.svg" },
];

watch(
  () => props.initialMode,
  (newMode: string) => {
    isRegistration.value = newMode === "register";
    clearErrors();
  }
);

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateMobile = (mobile: string): boolean => {
  const mobileRegex = /^\+?[\d\s-]{10,}$/;
  return mobileRegex.test(mobile);
};

const validateField = (field: keyof FormData) => {
  errors[field as keyof FormErrors] = "";

  switch (field) {
    case "emailOrMobile":
      if (!formData.emailOrMobile) {
        errors.emailOrMobile = "This field is required";
      } else if (
        !validateEmail(formData.emailOrMobile) &&
        !validateMobile(formData.emailOrMobile)
      ) {
        errors.emailOrMobile = "Please enter a valid email or mobile number";
      }
      break;

    case "password":
      if (!formData.password) {
        errors.password = "Password is required";
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
      } else if (!/(?=.*[A-Z])/.test(formData.password)) {
        errors.password = "Password must contain at least one uppercase letter";
      } else if (!/(?=.*[0-9])/.test(formData.password)) {
        errors.password = "Password must contain at least one number";
      }
      break;

    case "confirmPassword":
      if (isRegistration.value) {
        if (!formData.confirmPassword) {
          errors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
          errors.confirmPassword = "Passwords do not match";
        }
      }
      break;
  }
};

const validateForm = (): boolean => {
  validateField("emailOrMobile");
  validateField("password");
  if (isRegistration.value) {
    validateField("confirmPassword");
  }

  return !Object.values(errors).some((error) => error);
};

const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key as keyof FormErrors] = "";
  });
};

const switchMode = (mode: boolean) => {
  isRegistration.value = mode;
  clearErrors();
};

const handleSocialLogin = (provider: string) => {
  console.log(`Logging in with ${provider}`);
  // Тут можна додати логіку для входу через соціальні мережі
};

const closeModal = () => {
  emit("close");
  clearForm();
};

const clearForm = () => {
  formData.emailOrMobile = "";
  formData.password = "";
  formData.confirmPassword = "";
  formData.useSocialNetworks = false;
  clearErrors();
  loginError.value = "";
};

const handleLogin = async () => {
  try {
    // Отримуємо список всіх користувачів
    const response = await axios.get(
      "https://6620fae43bf790e070b16bfe.mockapi.io/block-list/users"
    );
    const users = response.data;

    // Шукаємо користувача за email/mobile
    const user = users.find(
      (u: any) =>
        u.email === formData.emailOrMobile ||
        u.mobile === formData.emailOrMobile
    );

    if (!user) {
      loginError.value = "User not found";
      return false;
    }

    // Перевіряємо пароль
    if (user.password !== formData.password) {
      loginError.value = "Invalid password";
      return false;
    }

    // Успішний вхід
    emit("login-success", user);
    return true;
  } catch (error) {
    console.error("Login error:", error);
    loginError.value = "Login failed. Please try again.";
    return false;
  }
};

const handleSubmit = async () => {
  loginError.value = "";

  if (!validateForm()) {
    return;
  }

  isSubmitting.value = true;

  try {
    if (isRegistration.value) {
      // Перевіряємо чи користувач вже існує
      const existingUsers = await axios.get(
        "https://6620fae43bf790e070b16bfe.mockapi.io/block-list/users"
      );
      const userExists = existingUsers.data.some(
        (u: any) =>
          u.email === formData.emailOrMobile ||
          u.mobile === formData.emailOrMobile
      );

      if (userExists) {
        errors.emailOrMobile = "This email or mobile is already registered";
        isSubmitting.value = false;
        return;
      }

      const response = await axios.post(
        "https://6620fae43bf790e070b16bfe.mockapi.io/block-list/users",
        {
          email: formData.emailOrMobile,
          password: formData.password,
          useSocialNetworks: formData.useSocialNetworks,
        }
      );

      console.log("Registration successful:", response.data);
      emit("login-success", response.data);
      closeModal();
    } else {
      const loginSuccess = await handleLogin();
      if (loginSuccess) {
        closeModal();
      }
    }
  } catch (error) {
    console.error(
      isRegistration.value ? "Registration failed:" : "Login failed:",
      error
    );
    loginError.value = `${
      isRegistration.value ? "Registration" : "Login"
    } failed. Please try again.`;
  } finally {
    isSubmitting.value = false;
  }
};
</script>
