<template>
  <v-app light>
    <div class="bg-slate-300 min-h-screen flex flex-col">
      <router-view />
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data: () => ({
    //
  }),
});
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

.h100vh {
  height: 100vh;
}

.padding-0 {
  padding: 0px !important;
}
</style>

<!-- <template>
  <p>{{ message }}</p>
</template>

<script>
import { API } from '@/services/api';

export default {
  data() {
    return {
      message: '',
    };
  },
  async created() {
    try {
      const { data } = await API.get('/message');
      this.message = data;
    } catch (error) {
      this.message = 'server error :(';
    }
  },
};
</script> -->
