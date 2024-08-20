<script>
import { login } from "@/js/service/auth/auth";
import { loginWithGoogle, loginWithFacebook, loginWithYandex } from "@/js/service/auth/redirect";
import { setCookies } from "@/js/utils/cookie";

export default {
  name: 'AuthComponent',
  data() {
    return {
      loginForm: {
        username: null,
        email: null,
        phoneNumber: null,
        password: null
      }
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);

    setCookies({
      redirectUri: urlParams.get('redirectUri') || '',
      serviceName: urlParams.get('serviceName') || process.env.VUE_APP_SERVICE_NAME
    })
  },
  methods: {
    loginWithGoogle,
    loginWithFacebook,
    loginWithYandex,
    async login() {
      try {
        const response = await login(this.loginForm);
        console.log(response.data);
      } catch (error) {
        console.error('Login failed:', error);
      }
    }
  }
};
</script>

<template>
   <div>
    <form @submit.prevent="login">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="loginForm.username">
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" id="email" v-model="loginForm.email">
      </div>
      <div>
        <label for="phoneNumber">Phone Number</label>
        <input type="tel" id="phoneNumber" v-model="loginForm.phoneNumber">
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="loginForm.password" required>
      </div>
      <button type="submit">Login</button>
    </form>

    <div>
      <button @click="loginWithGoogle">Login with Google</button>
      <button @click="loginWithFacebook">Login with Facebook</button>
      <button @click="loginWithYandex">Login with Yandex</button>
    </div>
  </div>
</template>