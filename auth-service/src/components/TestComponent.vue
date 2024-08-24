<script>

import {getCookie} from "@/js/utils/cookie";
import axios from "@/js/config/axios";

export default {
  name: 'TestComponent',
  methods: {
    async test() {
      try {
        const response = await axios.get('/api/test');
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    },
    async accessTest() {
      try {
        const accessToken = getCookie('accessToken');
        const response = await axios.get('/api/access-test', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    },
    async refreshTest() {
      try {
        const refreshToken = getCookie('refreshToken');
        const response = await axios.get('/api/refresh-test', {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        });
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<template>
  <div>
    <button @click="test">test</button>
    <button @click="accessTest">accessTest</button>
    <button @click="refreshTest">refreshTest</button>
  </div>
</template>