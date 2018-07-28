<template>
  <div>
    <div style="max-width: 700px" v-if="passedReportForm.fields.length > 0">
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
    <ReportForm :passedReportForm="passedReportForm" :translateIntToTime="translateIntToTime" />
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
      passedReportForm: {
        fields: [],
      },
      editing: false
    };
  },
  methods: {
    translateIntToTime(int) {
      let s = int + '';
      s = s.length === 1 ? '0' + s : s;
      return `${s}:00`;
    },

    preprocessFieldValue(field) {
      if(field.type === 'time') field.value = this.translateIntToTime(field.value);
      if(field.type === 'mood') field.value = parseInt(field.value);
      if(field.type === 'boolean') field.value = !!(field.value == 'true');

      return field.value;
    },

    async getQuestions () {
      const response = await QuestionsService.fetchQuestions()
      response.data.items.forEach(el => {
        el.value = this.preprocessFieldValue(el);

        this.passedReportForm.fields.push({
          label: el.title,
          value: el.value,
          type: el.type,
          options: el.options
        });
      });

      this.getReport(new Date());
    },

    async getReport (date) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const dateNum = date.getDate();
      const response = await ReportsService.getReportByDate(year, month, dateNum);
      
      if (response.data.length > 0) {
        this.passedReportForm.id = response.data[0]._id;

        this.passedReportForm.fields.forEach((field, i) => {
          field.value = this.preprocessFieldValue(response.data[0].answers[i]);
          
          field.value = eq.value;

        this.editing = true;
        });
      }
    }
  },
  mounted() {
    this.getQuestions();
  }
}
</script>

<style scoped>
.box-card {
  width: 500px;
  margin: auto;
}
</style>
