<template>
  <v-container fluid class="grey lighten-5 padding-0 h-screen">
    <v-row no-gutters class="min-h-full">
      <v-col
        sm="8"
        class="min-h-full bg-slate-300 d-none d-sm-flex"
      >
        One of three columns
      </v-col>
      <v-col
        sm="4"
        cols="12"
        class="min-h-full"
      >
        <div
          class="min-h-full p-6 flex flex-col items-center justify-center w-full"
        >

          <div class="mb-6">
            <p
              class="transition-swing text-h4"
            >
              Let's do It
            </p>
          </div>

          <div class="w-5/6">
            <v-text-field
              label="E-mail"
              required
              outlined
              v-model="form.email"
            ></v-text-field>
          </div>

          <div class="w-5/6">
            <v-text-field
              label="Password"
              :type="'password'"
              required
              outlined
              v-model="form.password"
            ></v-text-field>
          </div>

          <div class="w-5/6">
            <v-btn
              block
              color="primary"
              @click="submit"
              :disabled="form.email === '' || form.password === ''"
            >
              Login
            </v-btn>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { API } from '@/services/api';

export default {
  data: () => ({
    form: {
      email: '',
      password: '',
    },
  }),
  methods: {
    async submit() {
      const { email, password } = this.form;
      try {
        const response = await API.post('/login', { email, password });
        this.$router.push('/tasks');
      } catch (e) {
        console.log(e);
      }
    },
  },
};

</script>
