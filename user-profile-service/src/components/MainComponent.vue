<script>
import { openAuthPage } from '@/js/service/auth/redirect';

export default {
  name: "MainComponent",
  methods: {
    openAuthPage
  }
}
</script>

<template>
  <div>
    <h1>HELLO</h1>
    <button @click="openAuthPage">Please enter your account</button>
  </div>
</template>