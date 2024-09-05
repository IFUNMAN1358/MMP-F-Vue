<script>
import axios from "@/js/config/axios";
import {openAuthPage} from "@/js/utils/redirect";
import {getCookie} from "@/js/utils/cookie";

export default {
  name: "MainComponent",
  methods: {
    openAuthPage,
    async test() {
      try {
        const response = await axios.get('/api/test', {
          headers: {
            'Authorization': `Bearer ${getCookie('accessToken')}`
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