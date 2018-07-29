<template>
  <div class="overview-table__row" v-if="rowData">
    <div v-if="rowData.fieldType === 'time'">
      <el-tooltip :content="rowData.value" placement="top">
        <div class="overview-table__cell overview-table__cell_green" v-if="compareTimeToInt(rowData.value, rowData.options.badEndsOn, rowData.options.goodStartsOn) === 2">
          <div class="overview-table__dot"></div>
        </div>
        <div class="overview-table__cell overview-table__cell_orange" v-else-if="compareTimeToInt(rowData.value, rowData.options.badEndsOn, rowData.options.goodStartsOn) === 1">
          <div class="overview-table__dot"></div>
        </div>
        <div class="overview-table__cell overview-table__cell_red" v-else-if="compareTimeToInt(rowData.value, rowData.options.badEndsOn, rowData.options.goodStartsOn) === 0">
          <div class="overview-table__dot"></div>
        </div>
      </el-tooltip>
    </div>
    
    <div v-if="rowData.fieldType === 'boolean'">
      <div class="overview-table__cell overview-table__cell_green" v-if="rowData.value === !!!rowData.options.reverse">
        <i class="el-icon-check"></i>
      </div>
      <div class="overview-table__cell overview-table__cell_red" v-if="rowData.value === !!rowData.options.reverse">
        <i class="el-icon-close"></i>
      </div>
    </div>

    <div v-if="rowData.fieldType === 'mood'">
      <el-tooltip :content="rowData.value+''" placement="top">
        <div class="overview-table__cell overview-table__cell_green" v-if="rowData.value >= 7">
          <i class="icon-rate-face-3" style="color: rgb(0, 169, 16)"></i>
        </div>
        <div class="overview-table__cell overview-table__cell_red" v-else-if="rowData.value <= 4">
          <i class="icon-rate-face-1" style="color: rgb(255, 0, 0)"></i>
        </div>
        <div class="overview-table__cell overview-table__cell_blue" v-else>
          <i class="icon-rate-face-2" style="color: #00b4ff"></i>
        </div>
      </el-tooltip>
    </div>

    <div v-if="rowData.fieldType === 'select'">
      <el-tooltip v-if="rowData.selectedOption" :content="rowData.selectedOption.label" placement="top">
        <div class="overview-table__cell" :style="{ background: addColorOpacity(rowData.selectedOption.color, .12) } ">
          <!-- v-if="rowData.value === 2" -->
          <div class="overview-table__dot" :style="{ background: rowData.selectedOption.color } "></div>
        </div>
      </el-tooltip>
    </div>
  </div>
  <div class="overview-table__row overview-table__row_tobefilled" v-else-if="day > new Date().getDate()">&nbsp;</div>
  <div class="overview-table__row overview-table__row_empty" v-else>&nbsp;</div>
</template>

<script>
export default {
  name: 'OverviewTableRow',
  props: ['rowData', 'day'],
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

    compareTimeToInt(time, bad, good) {
      const timeInt = time.split(':')[0];

      if (+timeInt <= +good)
        return 2;

      if (+timeInt > +good && +timeInt < +bad)
        return 1;

      return 0;
    },
  }
}
</script>
