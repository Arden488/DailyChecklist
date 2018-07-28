<template>
  <div>
    <h1>Overview</h1>

    <OverviewTable v-if="isLoaded" :reports="reports" :questions="questions" />
  </div>
</template>

<script>
import ReportsService from '@/services/ReportsService';
import OverviewTable from '@/components/OverviewTable/OverviewTable.vue';

export default {
  name: 'OverviewPage',
  components: {
    OverviewTable,
  },
  data () {
    return {
      isLoaded: false,
      questions: [],
      reportsData: [],
      reports: {},
    }
  },
  methods: {
    getOptionData(item) {
      let returnOption = null;

      item.options.values.forEach(el => {
        if (el.label === item.value)
          returnOption = el;
      });

      return returnOption;
    },

    preprocessFieldValue(field) {
      if(field.fieldType === 'time' || field.type === 'time') field.value = this.translateIntToTime(field.value);
      if(field.fieldType === 'mood' || field.type === 'mood') field.value = parseInt(field.value);
      if(field.fieldType === 'boolean' || field.type === 'boolean') field.value = !!(field.value == 'true');

      return field.value;
    },

    translateIntToTime(int) {
      let s = int + '';
      s = s.length === 1 ? '0' + s : s;
      return `${s}:00`;
    },

    prepareAnswers(item, answers) {
      answers.forEach((a, i) => {
        a.value = this.preprocessFieldValue(a);
        if (a.fieldType === 'select')
          answers[i].selectedOption = this.getOptionData(a);
      })

      return answers;
    },

    async getReports() {
      const response = await ReportsService.fetchReports();
      response.data.items.forEach(el => {
        const dayNum = new Date(el.date).getDate();
        this.reports[dayNum] = this.prepareAnswers(el, el.answers);

        el.answers.forEach(e => {
          if (this.questions.indexOf(e.label) === -1)
            this.questions.push(e.label);
        });
        
        this.isLoaded = true;
      });
    }
  },
  mounted () {
    this.getReports();
  }
}
</script>
