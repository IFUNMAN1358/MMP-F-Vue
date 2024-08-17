<script>
import { openAuthPage } from '@/js/auth_service/page';

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