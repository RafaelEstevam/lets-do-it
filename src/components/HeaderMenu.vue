<template>
  <v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="2" class="bg-slate-100">
          <div class="flex justify-center">
            <p
              class="transition-swing text-h6 m-0 mb-0"
            >
              Let's do It
            </p>
          </div>
        </v-col>
        <v-col cols="12" sm="10">
          <div class="w-100 flex justify-end">
            <div>
              <div class="flex justify-between align-center gap-6">
                <p class="mb-0">email do usuário</p>
                <v-btn color="primary" @click="logout">
                  Logout
                </v-btn>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts">
export default {
  methods: {
    logout() {
      this.$router.push('/');
    },
  },
};
</script>
