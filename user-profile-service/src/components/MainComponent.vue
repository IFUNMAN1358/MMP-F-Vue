<script>
import { openAuthPage } from '@/js/service/auth/redirect';
import {getCookie} from "@/js/utils/cookie";
import axios from "@/js/config/axios";

export default {
  name: "MainComponent",
  methods: {
    openAuthPage,
    async test() {
      try {
        const accessToken = getCookie('accessToken');
        const response = await axios.post('/api/test', null, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<template>
  <div>
    <h1>HELLO</h1>
    <button @click="openAuthPage">Please enter your account</button>
    <button @click="test">Test</button>
  </div>
</template>