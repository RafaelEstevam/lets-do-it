<template>
  <div class="flex flex-col">
    <HeaderMenu/>
      <v-container fluid class="min-h-full padding-0">
        <v-row no-gutters class="min-h-full">
          <v-col cols="2" class="bg-slate-200">
            <div class="p-6">
              <p>Filtros</p>
            </div>
          </v-col>
          <v-col cols="10" class="p-6">
            <div class="p-6">
              <v-row>
                <v-col
                  v-for="taskWrapper in taskWrappers"
                  :key="taskWrapper.status"
                  sm="3" cols="6"
                >
                  <TaskWrapper
                    :status="taskWrapper.status"
                    :tasks="taskWrapper.tasks"
                  />
                </v-col>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script lang="ts">
import { API } from '@/services/api';
import HeaderMenu from '@/components/HeaderMenu.vue';
import TaskWrapper from '@/components/TaskWrapper.vue';
import status from '@/enum/status.enun';
import { task } from '@/interfaces/task.interface';

export default {
  data() {
    return {
      taskWrappers: [
        { status: status[0] },
        { status: status[1] },
        { status: status[2] },
        { status: status[3] },
      ],
    };
  },
  components: { HeaderMenu, TaskWrapper },
  created() {
    API.get('/tasksList').then((response) => {
      const ToDoList = response.data.filter((item:task) => item.status === status[0]);
      const InProgressList = response.data.filter((item:task) => item.status === status[1]);
      const BlockedList = response.data.filter((item:task) => item.status === status[2]);
      const FinishedList = response.data.filter((item:task) => item.status === status[3]);

      this.taskWrappers[0].tasks = ToDoList;
      this.taskWrappers[1].tasks = InProgressList;
      this.taskWrappers[2].tasks = BlockedList;
      this.taskWrappers[3].tasks = FinishedList;
    }).catch((e) => {
      console.log(e.message);
    });
  },
};
</script>
