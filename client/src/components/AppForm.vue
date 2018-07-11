<template>
  <div>
    <el-card class="box-card">
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
            :low-threshold="+field.options.badStartsOn"
            :high-threshold="+field.options.normalStartsOn"
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
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('appForm')">Submit</el-button>
          <el-button @click="resetForm('appForm')">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AppForm',
  data() {
    return {
      appForm: {
        fields: [],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this[formName].fields.forEach(element => {
            // console.log(element.value);
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getRangeLength(options) {
      const range = options.range.split('-');

      if (options.reverse)
        return +range[1] - +range[0];
      else
        return +range[0] - +range[1];
    },

    translateIntToTime(int) {
      return `${int}:00`;
    },

    getRangeMax(options) {
      const range = options.range.split('-');
      return +range[1];
    },

    getRangeMin(options) {
      const range = options.range.split('-');
      return +range[0];
    }
  },
  mounted() {
    axios.get('http://localhost:3000/questions')
    .then(response => {
      response.data.forEach(el => {
        this.appForm.fields.push({
          label: el.title,
          value: el.value,
          type: el.type,
          options: el.options
        });
      })
    });
  }
}
</script>

<style scoped>
.box-card {
  width: 500px;
  margin: auto;
}
</style>
