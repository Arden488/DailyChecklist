<template>
  <el-select v-model="typeLocal" @change="updateType($event)" placeholder="Select one">
    <el-option label="Time picker" value="time"></el-option>
    <el-option label="Yes/No" value="boolean"></el-option>
    <el-option label="Select variant" value="select"></el-option>
    <el-option label="Mood rating" value="mood"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'TypeSelect',
  props: [ 'type' ],
  data () {
    return {
      typeLocal: this.type,
    }
  },
  methods: {
    updateType: function (value) {
      this.$emit('type', value);
    }
  }
}
</script>
