<script>
import { handleRedirect} from "@/js/service/auth/redirect";
import { sendCode } from "@/js/service/auth/auth";

export default {
  name: "RedirectHandler",

  data() {
    return {
      code: null,
      providerName: null,
    };
  },

  created() {
    if (window.location.pathname.includes('google')) {
      this.providerName = 'google';
    } else if (window.location.pathname.includes('facebook')) {
      this.providerName = 'facebook';
    } else if (window.location.pathname.includes('yandex')) {
      this.providerName = 'yandex';
    }

    const code = handleRedirect();
    if (code) {
      this.code = code;
      this.sendCode();
    } else {
      console.error('No code found in URL');
    }
  },

  methods: {
    async sendCode() {
      try {
        const response = await sendCode(this.code, this.providerName)
        console.log(response.data);
      } catch (error) {
        console.error('Error sending code:', error);
      }
    },
  }
};
</script>

<template>
  <div></div>
</template>