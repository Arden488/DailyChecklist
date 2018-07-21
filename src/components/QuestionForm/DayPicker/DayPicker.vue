<template>
  <div>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">Check all</el-checkbox>
    <div>
      <el-checkbox v-model="repeat.mon" @change="handleCheckedDaysChange" label="Monday" border size="mini"></el-checkbox>
      <el-checkbox v-model="repeat.tue" @change="handleCheckedDaysChange" label="Tuesday" border size="mini"></el-checkbox>
      <el-checkbox v-model="repeat.wed" @change="handleCheckedDaysChange" label="Wednesday" border size="mini"></el-checkbox>
      <el-checkbox v-model="repeat.thu" @change="handleCheckedDaysChange" label="Thursday" border size="mini"></el-checkbox>
    </div>
    <div>
      <el-checkbox v-model="repeat.fri" @change="handleCheckedDaysChange" label="Friday" border size="mini"></el-checkbox>
      <el-checkbox v-model="repeat.sat" @change="handleCheckedDaysChange" label="Saturday" border size="mini"></el-checkbox>
      <el-checkbox v-model="repeat.sun" @change="handleCheckedDaysChange" label="Sunday" border size="mini"></el-checkbox>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DayPicker',
  props: [
    'repeat',
  ],
  data () {
    return {
      checkAll: false,
      isIndeterminate: false,
    }
  },
  methods: {
    handleCheckAllChange(val) {
      Object.keys(this.repeat).forEach(el => {
        this.repeat[el] = val;
      });
      this.isIndeterminate = false;
    },
    
    handleCheckedDaysChange() {
      const allDays = Object.keys(this.repeat);
      const checkedEvery = allDays.every(el => this.repeat[el] === true);
      this.checkAll = checkedEvery;
      this.isIndeterminate = !checkedEvery && allDays.some(el => this.repeat[el] === true);
    },
  },
  mounted () {
    const daily = Object.keys(this.repeat).every(e => this.repeat[e] === true);
    const someDays = Object.keys(this.repeat).some(e => this.repeat[e] === true);
    this.checkAll = daily;
    this.isIndeterminate = !daily && someDays;
  }
}
</script>

