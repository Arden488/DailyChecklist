<template>
  <div>
    <h1>Overview</h1>

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
            <div class="overview-table__row" v-for="question in questions" :key="question._id">
              {{question}}
            </div>
          </div>
          <div class="overview-table__col" v-for="day in days" :key="day">
            <div class="overview-table__row" v-if="reports[day]" v-for="(question, index) in questions"  :key="question._id">
              <div v-if="reports[day][index].fieldType === 'time'">
                <el-tooltip :content="reports[day][index].value" placement="top">
                  <div class="overview-table__cell overview-table__cell_green" v-if="compareTimeToInt(reports[day][index].value, reports[day][index].options.badEndsOn, reports[day][index].options.goodStartsOn) === 2">
                    <div class="overview-table__dot"></div>
                  </div>
                  <div class="overview-table__cell overview-table__cell_orange" v-else-if="compareTimeToInt(reports[day][index].value, reports[day][index].options.badEndsOn, reports[day][index].options.goodStartsOn) === 1">
                    <div class="overview-table__dot"></div>
                  </div>
                  <div class="overview-table__cell overview-table__cell_red" v-else-if="compareTimeToInt(reports[day][index].value, reports[day][index].options.badEndsOn, reports[day][index].options.goodStartsOn) === 0">
                    <div class="overview-table__dot"></div>
                  </div>
                </el-tooltip>
              </div>
              
              <div v-if="reports[day][index].fieldType === 'boolean'">
                <div class="overview-table__cell overview-table__cell_green" v-if="reports[day][index].value == 'true'">
                  <i class="el-icon-check"></i>
                </div>
                <div class="overview-table__cell overview-table__cell_red" v-if="reports[day][index].value == 'false'">
                  <i class="el-icon-close"></i>
                </div>
              </div>

              <div v-if="reports[day][index].fieldType === 'mood'">
                <el-tooltip :content="reports[day][index].value" placement="top">
                  <div class="overview-table__cell overview-table__cell_green" v-if="reports[day][index].value >= 7">
                    <i class="icon-rate-face-3" style="color: rgb(0, 169, 16)"></i>
                  </div>
                  <div class="overview-table__cell overview-table__cell_red" v-else-if="reports[day][index].value <= 4">
                    <i class="icon-rate-face-1" style="color: rgb(255, 0, 0)"></i>
                  </div>
                  <div class="overview-table__cell overview-table__cell_blue" v-else>
                    <i class="icon-rate-face-2" style="color: #00b4ff"></i>
                  </div>
                </el-tooltip>
              </div>

              <div v-if="reports[day][index].fieldType === 'select'">
                <el-tooltip :content="reports[day][index].selectedOption.label" placement="top">
                  <div class="overview-table__cell" :style="{ background: addColorOpacity(reports[day][index].selectedOption.color, .12) } ">
                    <!-- v-if="reports[day][index].value === 2" -->
                    <div class="overview-table__dot" :style="{ background: reports[day][index].selectedOption.color } "></div>
                  </div>
                </el-tooltip>
              </div>
            </div>
            <div class="overview-table__row overview-table__row_tobefilled" v-else-if="day > new Date().getDate()">&nbsp;</div>
            <div class="overview-table__row overview-table__row_empty" v-else>&nbsp;</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportsService from '@/services/ReportsService';

export default {
  name: 'OverviewPage',
  data () {
    return {
      year: 2018,
      month: 7,
      numberOfDays: 0,
      questions: [],
      reportsData: [],
      days: [],
      reports: {},
      namesOfDay: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  },
  methods: {
    addColorOpacity(hex, targetOpacity) {
      const rgb = this.hexToRgb(hex);
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${targetOpacity})`;
    },

    hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    },

    getOptionData(item) {
      let returnOption = null;

      item.options.values.forEach(el => {
        if (el.label === item.value)
          returnOption = el;
      });

      return returnOption;
    },

    compareTimeToInt(time, bad, good) {
      const timeInt = time.split(':')[0];

      if (+timeInt <= +good)
        return 2;

      if (+timeInt > +good && +timeInt < +bad)
        return 1;

      return 0;
    },
    
    setNumberOfDays() {
      this.numberOfDays = new Date(this.year, this.month, 0).getDate();
    },

    populateDays() {
      for (let i = 1; i <= this.numberOfDays; i++)
        this.days.push(i);
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
    this.setNumberOfDays();
    this.populateDays();
    this.getReports();
  }
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
    grid-template-rows: 30px;
    grid-auto-flow: row;
    /* background: blue; */
  }

  .overview-table__col-head {
    background: #ebeef5;
    line-height: 25px;
    text-align: center;
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
