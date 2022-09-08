<template>
  <div>
    {{ status }}
    <v-card v-for="task in tasksList" :key="task.id" @click="goToTask(task.id)">
      {{ task.name }}
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'TaskWrapperVue',
  props: {
    status: String,
    tasks: Array,
  },
  data() {
    return {
      tasksList: [],
    };
  },
  async created() {
    this.tasksList = this.tasks;
  },
  methods: {
    goToTask(id) {
      this.$router.push(`/task/edit/${id}`);
    },
  },
};
</script>
