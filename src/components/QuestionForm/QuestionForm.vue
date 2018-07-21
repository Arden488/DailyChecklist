<template>
  <el-form :model="questionForm" :rules="rules" ref="questionForm" label-width="200px" style="max-width: 700px">
    <el-form-item label="Title" prop="title">
      <el-input v-model="questionForm.title"></el-input>
    </el-form-item>

    <el-form-item label="Repeat" prop="repeat">
      <DayPicker :repeat="questionForm.repeat" />
    </el-form-item>

    <el-form-item label="Type" prop="type">
      <TypeSelect :type="questionForm.type" v-on:type="switchType" />
    </el-form-item>

    <el-form-item v-if="questionForm.type !== ''" label="Default value">
      <DefaultValue 
        :type="questionForm.type" 
        :value="questionForm.value" 
        :options="questionForm.options"
        v-on:defaultValue="questionForm.value = $event" />
    </el-form-item>

    <div v-if="questionForm.type !== 'boolean'">
      <OptionsSettings :options="questionForm.options" :type="questionForm.type" />
    </div>

    <el-form-item>
      <el-button type="primary" @click="submitForm()">Submit</el-button>
      <el-button @click="goBack()">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import QuestionsService from '@/services/QuestionsService';
import DayPicker from './DayPicker/DayPicker.vue';
import TypeSelect from './TypeSelect/TypeSelect.vue';
import DefaultValue from './DefaultValue/DefaultValue.vue';
import OptionsSettings from './OptionsSettings/OptionsSettings.vue';

export default {
  name: 'QuestionForm',
  components: {
    DayPicker,
    TypeSelect,
    DefaultValue,
    OptionsSettings,
  },
  props: ['passedQuestionForm'],
  data () {
    var validateRepeat = (rule, value, callback) => {
      const someChecked = Object.keys(value).some(el => {
        return value[el];
      });
      if (!someChecked) {
        callback(new Error('Please check at least one day'));
      } else {
        callback();
      }
    };
    
    return {
      questionForm: Object.assign({
        title: '',
        repeat: {
          mon: false,
          tue: false,
          wed: false,
          thu: false,
          fri: false,
          sat: false,
          sun: false
        },
        type: '',
        value: '',
        options: {
          rangeStart: 0,
          rangeEnd: 1,
          values: [],
          badEndsOn: null,
          goodStartsOn: null
        },
      }, this.passedQuestionForm),
      rules: {
        title: [
          { required: true, message: 'Field \'Title\' is required', trigger: 'blur' }
        ],
        repeat: [
          { validator: validateRepeat, trigger: 'blur' }
        ],
        type: [
          { required: true, message: 'Field \'Type\' is required', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    switchType(type) {
      this.questionForm.type = type;
      this.questionForm.value = this.questionForm.type === 'boolean' ? false : '';
      this.questionForm.options = {
        rangeStart: 0,
        rangeEnd: 1,
        values: [],
        badEndsOn: null,
        goodStartsOn: null
      };
    },

    goBack() {
      this.$router.push({ name: 'Questions' })
    },

    prepareRepeat () {
      let repeatArr = [];
      let repeatStr = 'daily';

      Object.keys(this.questionForm.repeat).forEach(el => {
        if (this.questionForm.repeat[el])
          repeatArr.push(el);
      });

      if (repeatArr.length !== 7)
        repeatStr = repeatArr.join(',');

      return repeatStr;
    },

    async updateQuestion (data) {
      const response = await QuestionsService.updateQuestion(data);

      if (await response.status === 200)
        this.$router.push({ name: 'Questions' })
    },

    async createQuestion (data) {
      const response = await QuestionsService.createQuestion(data);

      if (await response.status === 200)
        this.$router.push({ name: 'Questions' })
    },

    submitForm() {
      this.$refs['questionForm'].validate((valid) => {
        if (valid) {
          let formData = {
            id: this.questionForm.id,
            title: this.questionForm.title,
            repeat: this.prepareRepeat(),
            type: this.questionForm.type,
            value: this.questionForm.value
          };

          if (this.questionForm.type === 'time' || this.questionForm.type === 'mood') {
            if (this.questionForm.options.rangeEnd) {
              formData.optionsRange = 
                this.questionForm.options.rangeStart + 
                '-' 
                + this.questionForm.options.rangeEnd;
            } else {
              formData.optionsRange = 
                this.questionForm.options.rangeStart + 
                '-'
                + this.questionForm.options.rangeStart + 1; 
            }

            formData.optionsBadEndsOn = this.questionForm.options.badEndsOn;
            formData.optionsGoodStartsOn = this.questionForm.options.goodStartsOn;
          }

          if (this.questionForm.type === 'select') {
            formData.optionsValues = this.questionForm.options.values;
          }
          
          if (this.passedQuestionForm) {
            this.updateQuestion(formData);
          } else {
            this.createQuestion(formData);
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
  }
}
</script>

