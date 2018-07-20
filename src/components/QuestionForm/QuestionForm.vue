<template>
  <el-form :model="questionForm" :rules="rules" ref="questionForm" label-width="200px" style="max-width: 700px">
    <el-form-item label="Title" prop="title">
      <el-input v-model="questionForm.title"></el-input>
    </el-form-item>

    <el-form-item label="Repeat" prop="repeat">
      <el-checkbox :indeterminate="questionForm.isIndeterminate" v-model="questionForm.checkAll" @change="handleCheckAllChange">Check all</el-checkbox>
      <div>
        <el-checkbox v-model="questionForm.repeat.mon" @change="handleCheckedDaysChange" label="Monday" border size="mini"></el-checkbox>
        <el-checkbox v-model="questionForm.repeat.tue" @change="handleCheckedDaysChange" label="Tuesday" border size="mini"></el-checkbox>
        <el-checkbox v-model="questionForm.repeat.wed" @change="handleCheckedDaysChange" label="Wednesday" border size="mini"></el-checkbox>
        <el-checkbox v-model="questionForm.repeat.thu" @change="handleCheckedDaysChange" label="Thursday" border size="mini"></el-checkbox>
      </div>
      <div>
        <el-checkbox v-model="questionForm.repeat.fri" @change="handleCheckedDaysChange" label="Friday" border size="mini"></el-checkbox>
        <el-checkbox v-model="questionForm.repeat.sat" @change="handleCheckedDaysChange" label="Saturday" border size="mini"></el-checkbox>
        <el-checkbox v-model="questionForm.repeat.sun" @change="handleCheckedDaysChange" label="Sunday" border size="mini"></el-checkbox>
      </div>
    </el-form-item>

    <el-form-item label="Type" prop="type">
      <el-select v-model="questionForm.type" @change="switchType()" placeholder="Select one">
        <el-option label="Time picker" value="time"></el-option>
        <el-option label="Yes/No" value="boolean"></el-option>
        <el-option label="Select variant" value="select"></el-option>
        <el-option label="Mood rating" value="mood"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item v-if="questionForm.type !== ''" label="Default value">
      <el-input-number 
        v-if="questionForm.type === 'mood' || questionForm.type ==='time'"
        v-model="questionForm.value" 
        :min="0" 
        :max="+questionForm.options.rangeEnd"
      ></el-input-number>

      <el-switch v-if="questionForm.type === 'boolean'" v-model="questionForm.value"></el-switch>

      <el-select 
        v-if="questionForm.type === 'select'" v-model="questionForm.value"
        placeholder="Choose default"
      >
        <el-option
          v-for="option in questionForm.options.values"
          :key="option.key"
          :value="option.label"
        ></el-option>
      </el-select>
    </el-form-item>

    <div v-if="questionForm.type !== 'boolean'">

      <el-form-item>
        <h3>Options</h3>
      </el-form-item>

      <div v-if="questionForm.type === 'mood'">
        <el-form-item label="Max value">
          <el-col>
            <el-input-number v-model="questionForm.options.rangeEnd" size="small" :min="+questionForm.options.rangeStart+2" :max="10"></el-input-number>
          </el-col>
        </el-form-item>

        <el-form-item label="'Good' starts on">
          <el-input-number v-model="questionForm.options.goodStartsOn" size="small" :min="+questionForm.options.badEndsOn+1||0" :max="+questionForm.options.rangeEnd"></el-input-number>
        </el-form-item>

        <el-form-item label="'Bad' ends on">
          <el-input-number v-model="questionForm.options.badEndsOn" size="small" :min="1" :max="+questionForm.options.goodStartsOn-1"></el-input-number>
        </el-form-item>
      </div>

      <div v-if="questionForm.type === 'time'">
        <el-form-item  label="Range of hours">
          <el-input-number v-model="questionForm.options.rangeStart" size="small" :min="0" :max="23"></el-input-number>
          <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
          <el-input-number v-model="questionForm.options.rangeEnd" size="small" :min="+questionForm.options.rangeStart+1" :max="24"></el-input-number>
        </el-form-item>

        <el-form-item label="'Good' ends on">
          <el-input-number v-model="questionForm.options.goodStartsOn" size="small" :min="+questionForm.options.rangeStart" :max="+questionForm.options.rangeEnd-1"></el-input-number>
        </el-form-item>

        <el-form-item label="'Bad' starts on">
          <el-input-number v-model="questionForm.options.badEndsOn" size="small" :min="+questionForm.options.goodStartsOn+1" :max="+questionForm.options.rangeEnd"></el-input-number>
        </el-form-item>
      </div>

      <div v-if="questionForm.type === 'select'">
        <el-form-item
          v-for="(option, index) in questionForm.options.values"
          :label="'Option #' + (index+1)"
          :key="option.key"
          :prop="'options.values[' + index + '].label'"
          :rules="{
            required: true, message: 'Option value can not be empty', trigger: 'blur'
          }"
        >
          <div style="width: 300px; display: inline-block; margin-right: 10px;">
            <el-input v-model="option.label" style="width: 230px; margin-right: 10px; vertical-align: middle;"></el-input>
            <el-color-picker v-model="option.color" :predefine="questionForm.predefinedColors" style="vertical-align: middle;"></el-color-picker>
          </div>
          <el-button type="danger" icon="el-icon-delete" @click.prevent="removeOption(option)"></el-button>
        </el-form-item>

        <el-button @click="addOption">New option</el-button>
      </div>

    </div>

    <el-form-item>
      <el-button type="primary" @click="submitForm()">Submit</el-button>
      <el-button @click="goBack()">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import QuestionsService from '@/services/QuestionsService';

export default {
  name: 'QuestionForm',
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
        isIndeterminate: false,
        checkAll: false,
        predefinedColors: [
          '#ff4500',
          '#ff8c00',
          '#ffd700',
          '#90ee90',
          '#00ced1',
          '#1e90ff',
          '#c71585',
          'rgba(255, 69, 0, 0.68)',
          'rgb(255, 120, 0)',
          'hsv(51, 100, 98)',
          'hsva(120, 40, 94, 0.5)',
          'hsl(181, 100%, 37%)',
          'hsla(209, 100%, 56%, 0.73)',
          '#c7158577'
        ]
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
    handleCheckAllChange(val) {
      Object.keys(this.questionForm.repeat).forEach(el => {
        this.questionForm.repeat[el] = val;
      });
      this.questionForm.isIndeterminate = false;
    },
    
    handleCheckedDaysChange() {
      const allDays = Object.keys(this.questionForm.repeat);
      const checkedEvery = allDays.every(el => this.questionForm.repeat[el] === true);
      this.questionForm.checkAll = checkedEvery;
      this.questionForm.isIndeterminate = !checkedEvery && allDays.some(el => this.questionForm.repeat[el] === true);
    },

    switchType() {
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

    addOption() {
      const key = this.questionForm.options.values.length + 1;

      this.questionForm.options.values.push({
        key: key,
        value: key,
        label: '',
        color: this.questionForm.predefinedColors[key] || ''
      })
    },

    removeOption(item) {
      const index = this.questionForm.options.values.indexOf(item);

      if (index !== -1) {
        this.questionForm.options.values.splice(index, 1);

        if(item.value == this.questionForm.value) {
          this.questionForm.value = null;
        }
      }
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
  },
  updated () {
    this.$nextTick(function () {
      if ((this.questionForm.type === 'time' || this.questionForm.type === 'mood')
        && this.questionForm.value < this.questionForm.options.rangeStart)
        this.questionForm.value = this.questionForm.options.rangeStart;

      if (this.questionForm.options.rangeStart >= this.questionForm.options.rangeEnd)
        this.questionForm.options.rangeEnd = this.questionForm.options.rangeStart + 1;

      if (this.questionForm.options.rangeEnd < this.questionForm.options.goodStartsOn)
        this.questionForm.options.goodStartsOn = this.questionForm.options.rangeEnd;

      // TODO: check if badEndsOn > rangeEnd
      if (this.questionForm.options.rangeStart > this.questionForm.options.badEndsOn)
        this.questionForm.options.badEndsOn = this.questionForm.options.rangeStart;

      if (this.questionForm.type === 'select') {
        if (this.questionForm.options.values.length === 0) {
          this.questionForm.options.values.push({
            key: 1,
            value: 1,
            label: '',
            color: this.questionForm.predefinedColors[0]
          })
        } else {
          if (this.questionForm.value !== '') {
            const exist = this.questionForm.options.values.some(el => {
              return el.label === this.questionForm.value; 
            });
            if (!exist) this.questionForm.value = '';
          }
        }
      }
    })
  }
}
</script>

