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

      <el-form :model="appForm" ref="appForm" label-width="200px">
        <el-form-item
          v-for="(field, index) in appForm.fields"
          :label="field.label"
          :key="field.key"
          :prop="'fields.' + index + '.value'"
          :rules="[
            { required: true, message: '\'' + field.label + '\' is required', trigger: 'blur' }
          ]"
        >
          <el-switch v-if="field.type === 'boolean'" v-model="field.value"></el-switch>
          <el-rate
            v-if="field.type === 'mood'" 
            v-model="field.value"
            :max="getRangeMax(field.options)"
            :low-threshold="+field.options.badEndsOn"
            :high-threshold="+field.options.goodStartsOn"
            :icon-classes="['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']"
            void-icon-class="icon-rate-face-off"
            :colors="['#FF0000', '#00b4ff', '#00ff18']">
          </el-rate>
          <el-time-select
            v-if="field.type === 'time'" 
            v-model="field.value"
            :picker-options="{
              start: translateIntToTime(getRangeMin(field.options)),
              step: '01:00',
              end: translateIntToTime(getRangeMax(field.options))
            }"
            placeholder="Select time">
          </el-time-select>
          <el-select 
            v-if="field.type === 'select'" 
            v-model="field.value"
            placeholder="Select"
          >
            <el-option
              v-for="item in field.options.values"
              :key="item.value"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('appForm')">Submit</el-button>
          <el-button @click="resetForm('appForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import ReportsService from '@/services/ReportsService';
import QuestionsService from '@/services/QuestionsService';

export default {
  name: 'CreateReportPage',
  data() {
    return {
      appForm: {
        fields: [],
      },
      editing: false
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = { answers: [] };
          this[formName].fields.forEach(field => {
            formData.answers.push({
              label: field.label,
              type: field.type,
              value: field.value.toString(),
              options: field.options
            });
          });
          formData.date = new Date();

          if (this.editing) {
            formData.id = this[formName].id;
            this.updateReport(formData);
          } else {
            this.createReport(formData);
          }
        } else {
          this.$message({
            type: 'error',
            message: 'Error occurred while submitting'
          });
          return false;
        }
      });
    },

    async updateReport(data) {
      const response = await ReportsService.updateReport(data);
      if (await response.status === 200)
        this.$router.push({ name: 'Overview' });
    },

    async createReport(data) {
      const response = await ReportsService.createReport(data);
      if (await response.status === 200)
        this.$router.push({ name: 'Overview' });
    },
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    
    getRangeLength(options) {
      if (!options.range)
        return null;
      
      const range = options.range.split('-');

      if (options.reverse)
        return +range[1] - +range[0];
      else
        return +range[0] - +range[1];
    },

    translateIntToTime(int) {
      let s = int + '';
      s = s.length === 1 ? '0' + s : s;
      return `${s}:00`;
    },

    getRangeMax(options) {
      if (!options.range)
        return null;

      const range = options.range.split('-');
      return +range[1];
    },

    getRangeMin(options) {
      if (!options.range)
        return null;

      const range = options.range.split('-');
      return +range[0];
    },

    async getQuestions () {
      const response = await QuestionsService.fetchQuestions()
      response.data.items.forEach(el => {
        if(el.type === 'time') el.value = this.translateIntToTime(el.value);
        if(el.type === 'mood') el.value = +el.value;

        this.appForm.fields.push({
          label: el.title,
          value: el.value || false,
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
        this.appForm.id = response.data[0]._id;

        this.appForm.fields.forEach((field, i) => {
          const eq = response.data[0].answers[i];
          if (field.type === 'boolean') {
            eq.value = !!(eq.value == 'true');
          } else if (field.type === 'mood') {
            eq.value = +eq.value;
          }

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
