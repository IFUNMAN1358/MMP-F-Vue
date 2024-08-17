<script>
import { getSessions, deleteSession } from "@/js/service/session/session";
import { format } from 'date-fns';

export default {
  name: "LogoutComponent",
  data() {
    return {
      sessions: []
    }
  },
  methods: {
    async getSessions() {
      try {
        const response = await getSessions();
        this.sessions = response.data;
      } catch (error) {
        console.log(error);
    }
    },
    async deleteSession(sessionId) {
      try {
        await deleteSession(sessionId);
        await this.getSessions();
      } catch (error) {
        console.error(error);
      }
    },
    formatLastActivity(lastActivity) {
      if (!lastActivity) return '';
      return format(new Date(lastActivity), 'yyyy-MM-dd HH:mm:ss');
    }
  }
}
</script>

<template>
  <div>
    <button @click="getSessions">Get sessions</button>
    <ul>
      <li v-for="session in sessions" :key="session.sessionId">
        {{ session.sessionId }} | {{ session.device }} | {{ session.service }} | {{ session.os }} | {{ session.location }} | {{ formatLastActivity(session.lastActivity) }}
        <button @click="deleteSession(session.sessionId)">Delete</button>
      </li>
    </ul>
  </div>
</template>