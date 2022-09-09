<template>
  <v-card @click="goToTask(item.id)" class="p-3 mt-5">
    <div class="flex justify-between">
      <span class="flag" :class="[flag && getFlagStatus(flag)]">
        {{item.status}}
      </span>
      <span class="flag" :class="[alert && getAlertStatus(alert)]">
        <span>Prioridade:</span> {{item.priority}}
      </span>
    </div>

    <div class=" bg-slate-100 my-4 customWrapper p-3">
      {{ item.name }}
    </div>

    <div class="flex justify-between">
      <span class="flag">
        <span>Início:</span> {{ convertDate(item.startDate) }}
      </span>
      <span class="flag">
        <span>Fim:</span> {{ convertDate(item.endDate) }}
      </span>
    </div>
  </v-card>
</template>

<script lang="ts">
import moment from 'moment';

export default {
  name: 'TaskWrapperVue',
  props: {
    task: Object,
  },
  data() {
    return {
      item: {},
      flag: '',
      alert: '',
    };
  },
  async created() {
    this.item = this.task;
    this.flag = this.task.status;
    this.alert = this.task.priority;
  },
  methods: {
    goToTask(id) {
      this.$router.push(`/task/edit/${id}`);
    },
    convertDate(day) {
      return moment(day).format('DD/MM/YY');
    },
    getFlagStatus(flag) {
      if (flag === 'To Do') {
        return 'toDo';
      }
      if (flag === 'In progress') {
        return 'inProgress';
      }
      if (flag === 'Blocked') {
        return 'blocked';
      }
      if (flag === 'Finished') {
        return 'finished';
      }
      return '';
    },
    getAlertStatus(alert) {
      if (alert === '1') {
        return 'alertDanger';
      }
      if (alert === '2') {
        return 'alertWarning';
      }
      if (alert === '3') {
        return 'alertInfo';
      }
      return '';
    },
  },
};
</script>

<style scoped>
.flag {
  border-radius: 100px;
  font-size: 0.8rem;
  border: 1px solid #ccc;
  padding: 0px 10px;
  min-width: 80px;
  text-align: center;
}

.flag span {
  font-size: 0.5rem;
  font-weight: bold;
}

.toDo {
  color: #1bce00;
  border-color: #1bce00;
  background: #1bce0030;
}

.inProgress {
  color: #fc0;
  border-color: #fc0;
  background: #ffcc0030;
}

.blocked {
  color: rgb(255, 0, 0);
  border-color: rgb(255, 0, 0);
  background: #ff000030;
}

.finished {
  color: rgb(98, 0, 255);
  border-color: rgb(98, 0, 255);
  background: rgb(98, 0, 255, 0.3);
}

.alertDanger {
  color: #fff;
  border-color: transparent;
  background: rgb(255, 86, 56);
}

.alertWarning {
  color: #fff;
  border-color: transparent;
  background: rgb(250, 66, 179);
}

.alertInfo {
  color: #fff;
  border-color: transparent;
  background: rgb(56, 142, 255);
}

.customWrapper {
  border-radius: 0px !important;
}
</style>
