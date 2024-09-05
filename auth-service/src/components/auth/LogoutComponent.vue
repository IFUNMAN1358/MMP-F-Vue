<script>
import { format } from 'date-fns';
import {deleteSession, getSessions} from "@/js/repository/sessionRepository";

export default {
  name: "LogoutComponent",
  data() {
    return {
      sessions: []
    }
  },
  async created() {
    const response = await getSessions();
    this.sessions = response.data;
  },
  methods: {
    async deleteSession(sessionId) {
      await deleteSession(sessionId);
      const response = await getSessions();
      this.sessions = response.data;
    },
    format(attr) {
      return format(new Date(attr), 'yyyy-MM-dd HH:mm:ss');
    }
  }
}
</script>

<template>
  <div>
    <ul>
      <li v-for="session in sessions" :key="session.sessionId">
        {{ session.sessionId }} | {{ session.deviceName }} | {{ session.serviceName }} | {{ session.deviceOs }} | {{ session.location }} | {{ format(session.createdAt) }} | {{ format(session.lastActivity) }}
        <button @click="deleteSession(session.sessionId)">Delete</button>
      </li>
    </ul>
  </div>
</template>