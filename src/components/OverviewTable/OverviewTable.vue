<template>
  <div class="overview-table-box">
    <div class="overview-table">
      <div class="overview-table__header">
        <div class="overview-table__col-head overview-table__col-head_first">&nbsp;</div>
        <div class="overview-table__col-head" v-for="day in days" :key="day">
          {{day}}
        </div>
      </div>

      <div class="overview-table__body">
        <div class="overview-table__col overview-table__col_first">
          <div class="overview-table__row" v-for="(question, index) in questions" :key="index">
            {{question}}
          </div>
        </div>
        <div class="overview-table__col" v-for="day in days" :key="day">
          <OverviewTableRow v-for="(question, index) in questions" :key="index" :rowData="getAnswer(reports[day], question)" :day="day" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OverviewTableRow from '@/components/OverviewTable/OverviewTableRow/OverviewTableRow.vue';

export default {
  name: 'OverviewTable',
  components: {
    OverviewTableRow,
  },
  props: ['reports'],
  data () {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth()+1,
      numberOfDays: 0,
      days: [],
      namesOfDay: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  },
  computed: {
    questions: function() {
      const questions = [];
      for (let i = 0; i < Object.keys(this.reports).length; i++) {
        const rep = this.reports[Object.keys(this.reports)[i]];
        rep.forEach(el => {
          questions.push(el.label);
        });
      }
      return questions;
    }
  },
  methods: {
    setNumberOfDays() {
      this.numberOfDays = new Date(this.year, this.month, 0).getDate();
    },

    populateDays() {
      for (let i = 1; i <= this.numberOfDays; i++)
        this.days.push(i);
    },

    getAnswer(report, question) {
      if (!report) return null;

      for (let i = 0; report.length > i; i++) {
        if (report[i].label === question)
          return report[i];
      }
    },
  },
  mounted () {
    this.setNumberOfDays();
    this.populateDays();
  },
}
</script>

<style>
  .overview-table-box {
    overflow: scroll;
  }

  .overview-table {
    min-width: 1500px;
    /* display: inline-block; */
  }
  .overview-table__header {
    display: grid;
    grid-gap: 1px;
    grid-template-columns: 200px repeat(auto-fit, 40px);
    grid-template-rows: 35px;
    grid-auto-flow: row;
    /* background: blue; */
  }

  .overview-table__col-head {
    background: #ebeef5;
    line-height: 25px;
    text-align: center;
    height: 25px;
    padding: 5px 10px;
  }

  .overview-table__col-head_first {
    text-align: left
  }

  .overview-table__body {
    display: grid;
    grid-gap: 1px;
    grid-template-columns: 200px repeat(auto-fit, 40px);
    grid-auto-flow: column;
  }

  .overview-table__row {
    text-align: center;
    height: 35px;
    line-height: 25px;
    background: rgba(243, 243, 243, .3);
    position: relative;
  }

  .overview-table__row_empty {
    background: #ccc;
  }

  .overview-table__row_tobefilled {
    background: rgba(243, 243, 243, 1);
  }

  .overview-table__col {
    display: grid;
    grid-template-rows: 35px;
    grid-gap: 1px;
  }

  .overview-table__col_first .overview-table__row {
    text-align: left;
    padding: 5px 10px;
    height: 25px;
  }

  .overview-table__cell {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
  }

  .overview-table__cell i,
  .overview-table__cell .overview-table__dot {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .overview-table__cell_orange {
    background: oldlace;
  }

  .overview-table__cell_orange .overview-table__dot {
    background: rgb(255, 166, 0);
  }

  .overview-table__cell_green {
    background: #f0f9eb;
  }

  .overview-table__cell_green .overview-table__dot {
    background: rgb(0, 169, 16);
  }

  .overview-table__cell_red {
    background: #fff6f7;
  }

  .overview-table__cell_red .overview-table__dot {
    background: rgb(255, 0, 0);
  }

  .overview-table__cell_blue {
    background: #e8f0ffbb;
  }

  .overview-table__dot {
    display: block;
    width: 10px;
    height: 10px;
    background: black;
    border-radius: 100%;
  }
</style>
