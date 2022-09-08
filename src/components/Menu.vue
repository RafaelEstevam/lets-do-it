<template>
  <v-col cols="2" class="bg-slate-200">
    <v-list dense>
      <v-list-item-group color="primary">
        <v-list-item v-for="(item, i) in items" :key="i" v-on:click="goToLink(item.link)">
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-col>
</template>

<script lang="ts">
export default {
  data() {
    return {
      items: [
        { text: 'Tarefas', icon: 'mdi-clock', link: '/tasks' },
      ],
    };
  },
  methods: {
    goToLink(link) {
      this.$router.push(`${link}`);
    },
  },
};
</script>
