<template>
  <div>
    {{ status }}
    <v-card
      v-for="task in tasksList"
      :key="task.id"
    >
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
};
</script>
