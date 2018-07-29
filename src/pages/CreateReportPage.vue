<template>
  <div>
    <div style="max-width: 700px">
      <el-alert
        v-if="editing"
        title="Editing existing record"
        type="info"
        description="You are not creating a new record, but editing one, because the record for today is already existing."
        show-icon
        style="margin-bottom: 30px;"
      >
      </el-alert>
    </div>
    <ReportForm v-if="isLoaded" :editing="editing" :passedReportForm="passedReportForm" :translateIntToTime="translateIntToTime" />
  </div>
</template>

<script>
import ReportsService from '@/services/ReportsService';
import QuestionsService from '@/services/QuestionsService';

import ReportForm from '@/components/ReportForm/ReportForm.vue';

export default {
  name: 'CreateReportPage',
  components: {
    ReportForm,
  },
  data() {
    return {
      isLoaded: false,
      passedReportForm: {
        fields: [],
      },
      editing: false,
      daysMap: {
        0: 'sun',
        1: 'mon',
        2: 'tue',
        3: 'wed',
        4: 'thu',
        5: 'fri',
        6: 'sat',
      }
    };
  },
  methods: {
    translateIntToTime(int) {
      if (typeof int !== 'number') {
        int = ( int.length > 1 ? parseInt(int) : parseInt(int[0] + int[1]) ) || 0;
      }

      let s = int + '';
      s = s.length === 1 ? '0' + s : s;
      return `${s}:00`;
    },

    preprocessFieldValue(field) {
      if(field.fieldType === 'time' || field.type === 'time') field.value = this.translateIntToTime(field.value);
      if(field.fieldType === 'mood' || field.type === 'mood') field.value = parseInt(field.value);
      if(field.fieldType === 'boolean' || field.type === 'boolean') field.value = !!(field.value == 'true');

      return field.value;
    },

    async loadQuestions () {
      const existing = this.getReport(new Date());

      existing.then(res => {
        if (!res) {
          this.getQuestions();
        }
      })
    },

    async getQuestions () {
      const response = await QuestionsService.fetchQuestions()
      response.data.items.forEach(el => {
        el.value = this.preprocessFieldValue(el);

        if (el.repeat === 'daily' || el.repeat.indexOf(this.daysMap[new Date().getDay()]) !== -1) {
          this.passedReportForm.fields.push({
            label: el.title,
            value: el.value,
            repeat: el.repeat,
            type: el.type,
            options: el.options
          });
        }
      });
      this.isLoaded = true;
    },

    async getReport (date) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const dateNum = date.getDate();
      const time = date.getHours() + ':' + date.getMinutes()
      const response = await ReportsService.getReportByDate(year, month, dateNum, time);
      
      if (response.data.length > 0) {
        this.passedReportForm.id = response.data[0]._id;

        response.data[0].answers.forEach(el => {
          el.value = this.preprocessFieldValue(el);

          if (el.repeat === 'daily' || el.repeat.indexOf(this.daysMap[new Date().getDay()]) !== -1) {
            this.passedReportForm.fields.push({
              label: el.label,
              value: el.value,
              repeat: el.repeat,
              type: el.fieldType,
              options: el.options
            });
          }
        });

        this.editing = true;
        this.isLoaded = true;
        return true;
      }

      return false;
    }
  },
  mounted() {
    this.loadQuestions();
  }
}
</script>

<style scoped>
.box-card {
  width: 500px;
  margin: auto;
}
</style>
