<script>
import axios from "@/js/config/axios";
import {getCookie} from "@/js/utils/cookie";

export default {
  name: "MainComponent",
  methods: {
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
    <button @click="test">Test</button>
  </div>
</template>