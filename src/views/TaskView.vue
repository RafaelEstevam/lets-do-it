<template>
  <div class="flex flex-col min-h-full">
    <HeaderMenu />
    <v-container fluid class="padding-0">
      <v-row no-gutters class="min-h-full">
        <Menu />
        <v-col cols="10" class="p-6">
          <div class="p-6">
            <v-row>
              <v-col sm="12" cols="12">

                {{user}}
                <p class="transition-swing text-h6">
                  {{ $route.params.id ? `Editar tarefa ${$route.params.id}` : 'Nova tarefa' }}
                </p>
                <v-card>
                  <div class="p-6">
                    <v-row no-gutters>
                      <v-col cols="12" sm="12">
                        <v-row no-gutters>
                          <v-col cols="12" sm="8">
                            <v-text-field label="Nome da tarefa" required outlined v-model="form.name">
                            </v-text-field>
                          </v-col>
                          <v-col cols="12" sm="4">
                            <div class="sm:pl-6">
                              <v-select :items="priorityItems" label="Prioridade da tarefa" outlined
                                v-model="form.priority"></v-select>
                            </div>
                          </v-col>
                          <v-col cols="12" sm="12">
                            <v-select :items="statusItems" label="Status da tarefa" outlined v-model="form.status">
                            </v-select>
                          </v-col>
                          <v-col cols="12" class="mb-6">
                            <v-row>
                              <v-col cols="12" sm="6">
                                <p>Data de início</p>
                                <v-date-picker v-model="form.startDate" full-width></v-date-picker>
                              </v-col>
                              <v-col cols="12" sm="6">
                                <p>Data de conclusão</p>
                                <v-date-picker v-model="form.endDate" full-width></v-date-picker>
                              </v-col>
                            </v-row>
                          </v-col>
                          <v-col cols="12" sm="12">
                            <v-textarea filled name="input-7-4" label="Descrição da tarefa" value=""
                              v-model="form.description" rows="10"></v-textarea>
                          </v-col>
                        </v-row>
                      </v-col>

                    </v-row>

                    <v-row>
                      <v-col cols="6" sm="6">
                        <v-btn block color="primary" x-large @click="submit">
                          Salvar
                        </v-btn>
                      </v-col>
                      <v-col v-if="$route.params.id" cols="6" sm="6">
                        <v-btn block color="primary" outlined x-large @click="deleteTask">
                          Apagar tarefa
                        </v-btn>
                      </v-col>
                    </v-row>
                  </div>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import moment from 'moment';
import { API } from '@/services/api';
import HeaderMenu from '@/components/HeaderMenu.vue';
import Menu from '@/components/Menu.vue';
import { task } from '@/interfaces/task.interface';
import status from '@/enum/status.enun';
import priority from '@/enum/priority.enun';

export default {
  components: { HeaderMenu, Menu },

  data: () => ({
    priorityItems: priority,
    statusItems: status,
    user: '',
    form: {
      name: '',
      priority: '',
      status: '',
      startDate: moment(new Date()).format('YYYY-MM-DD'),
      endDate: moment(new Date()).format('YYYY-MM-DD'),
      description: '',
    },
  }),
  async created() {
    if (this.$route.params.id) {
      API.get(`/tasksList/${this.$route.params.id}`).then((response) => {
        const tast: task = response.data;
        this.form = tast;
      }).catch((e) => {
        console.log(e.message);
      });
    }

    this.$watch(
      () => this.$route.params,
      (toParams, previousParams) => {
        if (!toParams?.id) {
          this.form = {
            name: '',
            priority: '',
            status: '',
            startDate: moment(new Date()).format('YYYY-MM-DD'),
            endDate: moment(new Date()).format('YYYY-MM-DD'),
            description: '',
          };
        }
      },
    );
  },
  methods: {
    async submit() {
      const { ...data } = this.form;
      const newTask: task = data;
      API.post(`/taskItem/edit/${this.$route.params.id || 'new'}`, newTask).then(() => {
        this.$router.push('/tasks');
      }).catch((e) => {
        console.log(e.message);
      });
    },
    async deleteTask() {
      API.delete(`/taskItem/edit/${this.$route.params.id}`).then(() => {
        this.$router.push('/tasks');
      }).catch((e) => {
        console.log(e.message);
      });
    },
  },
};
</script>
