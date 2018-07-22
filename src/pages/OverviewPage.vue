<template>
  <div>
    <h1>Overview</h1>

    <OverviewTable :reports="reports" :questions="questions" />
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

    prepareAnswers(item, answers) {
      answers.forEach((a, i) => {
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
      });
    }
  },
  mounted () {
    this.getReports();
  }
}
</script>
