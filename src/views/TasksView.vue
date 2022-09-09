<template>
  <div class="flex flex-col max-h-screen">
    <HeaderMenu />
    <v-container fluid class="padding-0 h-full overflow-hidden">
      <v-row no-gutters class="h-full">
        <Menu />
        <v-col cols="10" class="p-6">
          <v-row class="max-h-full m-0">
            <v-col class="taskColumn pt-6 px-6 pb-24 " v-for="taskWrapper in taskWrappers" :key="taskWrapper.status"
              sm="3" cols="6">
              <TaskWrapper :status="taskWrapper.status" :tasks="taskWrapper.tasks" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import { onBeforeMount } from 'vue';
import { API } from '@/services/api';
import HeaderMenu from '@/components/HeaderMenu.vue';
import TaskWrapper from '@/components/TaskWrapper.vue';
import Menu from '@/components/Menu.vue';
import status from '@/enum/status.enun';
import { task } from '@/interfaces/task.interface';

export default {

  data() {
    return {
      taskWrappers: [],
      tasks: [],
    };
  },
  components: { HeaderMenu, TaskWrapper, Menu },
  async mounted() {
    API.get('/tasksList').then((response) => {
      const ToDoList = response.data.filter((item: task) => item.status === status[0]);
      const InProgressList = response.data.filter((item: task) => item.status === status[1]);
      const BlockedList = response.data.filter((item: task) => item.status === status[2]);
      const FinishedList = response.data.filter((item: task) => item.status === status[3]);

      this.taskWrappers = [
        { status: status[0], tasks: ToDoList },
        { status: status[1], tasks: InProgressList },
        { status: status[2], tasks: BlockedList },
        { status: status[3], tasks: FinishedList },
      ];
    }).catch((e) => {
      console.log(e.message);
    });
  },
  apollo: {
    tasks: gql` query {
      tasks{
        id
        name
        taskStatus
        startDate
        endDate
        description{
          text
        }
        priority
      }
    }`,
  },
};
</script>

<style scoped>
.taskColumn {
  overflow: hidden;
  overflow-y: scroll;
  max-height: 100vh;
}

.tasksView {
  height: 100px;
}
</style>
