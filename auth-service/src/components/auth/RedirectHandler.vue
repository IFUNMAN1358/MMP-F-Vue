<script>
import {handleRedirect} from "@/js/utils/redirect";
import {handleOauth} from "@/js/service/authService";

export default {
  name: "RedirectHandler",

  data() {
    return {
      code: null,
      providerName: null,
    };
  },

  async created() {
    if (window.location.pathname.includes('google')) {
      this.providerName = 'google';
    } else if (window.location.pathname.includes('facebook')) {
      this.providerName = 'facebook';
    } else if (window.location.pathname.includes('yandex')) {
      this.providerName = 'yandex';
    }

    this.code = handleRedirect();
    if (this.code) {
      await handleOauth(this.code, this.providerName);
    }
  }
};
</script>

<template>
  <div></div>
</template>