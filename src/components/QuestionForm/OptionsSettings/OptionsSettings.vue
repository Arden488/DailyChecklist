<template>
  <div>
    <el-form-item>
      <h3>Options</h3>
    </el-form-item>

    <div v-if="type === 'mood'">
      <el-form-item label="Max value">
        <el-col>
          <el-input-number v-model="options.rangeEnd" size="small" :min="+options.rangeStart+2" :max="10"></el-input-number>
        </el-col>
      </el-form-item>

      <el-form-item label="'Good' starts on">
        <el-input-number v-model="options.goodStartsOn" size="small" :min="+options.badEndsOn+1||0" :max="+options.rangeEnd"></el-input-number>
      </el-form-item>

      <el-form-item label="'Bad' ends on">
        <el-input-number v-model="options.badEndsOn" size="small" :min="1" :max="+options.goodStartsOn-1"></el-input-number>
      </el-form-item>
    </div>

    <div v-if="type === 'time'">
      <el-form-item  label="Range of hours">
        <el-input-number v-model="options.rangeStart" size="small" :min="0" :max="23"></el-input-number>
        <span>&nbsp;&nbsp;-&nbsp;&nbsp;</span>
        <el-input-number v-model="options.rangeEnd" size="small" :min="+options.rangeStart+1" :max="24"></el-input-number>
      </el-form-item>

      <el-form-item label="'Good' ends on">
        <el-input-number v-model="options.goodStartsOn" size="small" :min="+options.rangeStart" :max="+options.rangeEnd-1"></el-input-number>
      </el-form-item>

      <el-form-item label="'Bad' starts on">
        <el-input-number v-model="options.badEndsOn" size="small" :min="+options.goodStartsOn+1" :max="+options.rangeEnd"></el-input-number>
      </el-form-item>
    </div>

    <div v-if="type === 'select'">
      <el-form-item
        v-for="(option, index) in options.values"
        :label="'Option #' + (index+1)"
        :key="option.key"
        :prop="'options.values[' + index + '].label'"
        :rules="{
          required: true, message: 'Option value can not be empty', trigger: 'blur'
        }"
      >
        <div style="width: 300px; display: inline-block; margin-right: 10px;">
          <el-input v-model="option.label" style="width: 230px; margin-right: 10px; vertical-align: middle;"></el-input>
          <el-color-picker v-model="option.color" :predefine="predefinedColors" style="vertical-align: middle;"></el-color-picker>
        </div>
        <el-button type="danger" icon="el-icon-delete" @click.prevent="removeOption(option)"></el-button>
      </el-form-item>

      <el-button @click="addOption">New option</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OptionsSettings',
  props: [
    'type',
    'options',
  ],
  data () {
    return {
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
      ],
    }
  },
  methods: {
    addOption() {
      const key = this.options.values.length + 1;

      this.options.values.push({
        key: key,
        value: key,
        label: '',
        color: this.predefinedColors[key] || ''
      })
    },

    removeOption(item) {
      const index = this.options.values.indexOf(item);

      if (index !== -1) {
        this.options.values.splice(index, 1);

        if(item.value == this.value) {
          this.value = null;
        }
      }
    },
  },
  updated () {
    this.$nextTick(function () {
      if ((this.type === 'time' || this.type === 'mood')
        && this.value < this.options.rangeStart)
        this.value = this.options.rangeStart;

      if (this.options.rangeStart >= this.options.rangeEnd)
        this.options.rangeEnd = this.options.rangeStart + 1;

      if (this.options.rangeEnd < this.options.goodStartsOn)
        this.options.goodStartsOn = this.options.rangeEnd;

      // TODO: check if badEndsOn > rangeEnd
      if (this.options.rangeStart > this.options.badEndsOn)
        this.options.badEndsOn = this.options.rangeStart;

      if (this.type === 'select') {
        if (this.options.values.length === 0) {
          this.options.values.push({
            key: 1,
            value: 1,
            label: '',
            color: this.predefinedColors[0]
          })
        } else {
          if (this.value !== '') {
            const exist = this.options.values.some(el => {
              return el.label === this.value; 
            });
            if (!exist) this.value = '';
          }
        }
      }
    })
  }
}
</script>
