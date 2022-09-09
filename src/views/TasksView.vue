<template>
  <div class="flex flex-col">
    <HeaderMenu />
    <v-container fluid class="h-full padding-0">
      <v-row no-gutters class="h-full">
        <Menu />
        <v-col cols="10" class="p-6">
          <div class="p-6">
            <v-row>
              <v-col v-for="taskWrapper in taskWrappers" :key="taskWrapper.status" sm="3" cols="6">
                <TaskWrapper :status="taskWrapper.status" :tasks="taskWrapper.tasks" />
              </v-col>
            </v-row>
          </div>
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
  // methods: {
  //   filterTasks() {
  //     // console.log(JSON.parse(JSON.stringify(this.tasks)));
  //     // const ToDoList = this.tasks.filter((item: task) => item.taskStatus === status[0]);
  //     // const InProgressList = this.tasks.filter((item: task) => item.taskStatus === status[1]);
  //     // const BlockedList = this.tasks.filter((item: task) => item.taskStatus === status[2]);
  //     // const FinishedList = this.tasks.filter((item: task) => item.taskStatus === status[3]);

  //     // this.taskWrappers = [
  //     //   { status: status[0], tasks: ToDoList },
  //     //   { status: status[1], tasks: InProgressList },
  //     //   { status: status[2], tasks: BlockedList },
  //     //   { status: status[3], tasks: FinishedList },
  //     // ];
  //   },
  // },
  // async () {
  //   await this.filterTasks();
  // },
};
</script>
