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
                <v-col sm="3" cols="6">
                  <TaskIndicator />
                </v-col>
                <v-col sm="3" cols="6">
                  <TaskIndicator />
                </v-col>
                <v-col sm="3" cols="6">
                  <TaskIndicator />
                </v-col>
                <v-col sm="3" cols="6">
                  <TaskIndicator />
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
import TaskIndicator from '@/components/TasksIndicator.vue';

export default {
  components: { HeaderMenu, TaskIndicator },
  created() {
    API.get('/tasksList').then((response) => {
      console.log(response);
    }).catch((e) => {
      console.log(e.message);
    });
  },
};
</script>
