<template>
  <div class="p-6 rounded-md bg-gray-400">
    <p class="transition-swing text-h6 m-0 mb-0 text-white text-center">
      {{ status }}
    </p>
    <div v-for="task in tasksList" :key="task.id">
      <Task :task="task" />
    </div>
  </div>
</template>

<script lang="ts">
import Task from '@/components/Task.vue';

export default {
  name: 'TaskWrapperVue',
  components: { Task },
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

<style scoped>
.taskWrapperTitle {}
</style>
