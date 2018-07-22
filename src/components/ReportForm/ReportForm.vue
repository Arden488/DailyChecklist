<template>
  <el-form :model="appForm" ref="appForm" label-width="200px">
    {{appForm.fields}}
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
</template>

<script>
import ReportsService from '@/services/ReportsService';

export default {
  name: 'ReportForm',
  prop: ['passedReportForm'],
  data () {
    return {
      appForm: Object.assign({
        fields: [],
      }, this.passedReportForm)
    }
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
  }
}
</script>

