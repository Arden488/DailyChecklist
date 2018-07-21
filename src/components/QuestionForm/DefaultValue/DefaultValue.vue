<template>
  <div>
    <el-input-number 
      v-if="type === 'mood' || type ==='time'"
      v-model="valueLocal" 
      :min="0" 
      :max="+options.rangeEnd"
      @change="updateValue($event)"
    ></el-input-number>

    <el-switch v-if="type === 'boolean'" v-model="valueLocal" @change="updateValue($event)"></el-switch>

    <el-select 
      v-if="type === 'select'" 
      v-model="valueLocal"
      @change="updateValue($event)"
      placeholder="Choose default"
    >
      <el-option
        v-for="option in options.values"
        :key="option.key"
        :value="option.label"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'DefaultValue',
  props: [
    'type',
    'options',
    'value'
  ],
  data () {
    return {
      valueLocal: this.value,
    }
  },
  methods: {
    updateValue (value) {
      this.$emit('defaultValue', value);
    }
  }
}
</script>

