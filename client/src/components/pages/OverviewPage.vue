<template>
  <div>
    <h1>Overview</h1>
    
    <div class="el-table el-table--fit el-table--border">
      <table width="100%" class="overview-table" cellspacing="0" cellpadding="0" border="0">
        <thead>
          <tr>
            <th></th>
            <th><div class="cell">Mon</div></th>
            <th><div class="cell">Tue</div></th>
            <th><div class="cell">Wed</div></th>
            <th><div class="cell">Thu</div></th>
            <th><div class="cell">Fri</div></th>
            <th><div class="cell">Sat</div></th>
            <th><div class="cell">Sun</div></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><div class="cell">Question 1</div></td>
            <td class="overview-table__cell overview-table__cell_green"><div class="cell">Yes</div></td>
            <td class="overview-table__cell overview-table__cell_red"><div class="cell">No</div></td>
            <td class="overview-table__cell overview-table__cell_red"><div class="cell">No</div></td>
            <td class="overview-table__cell overview-table__cell_green"><div class="cell">Yes</div></td>
            <td class="overview-table__cell overview-table__cell_orange"><div class="cell">5</div></td>
            <td class="overview-table__cell overview-table__cell_red"><div class="cell">1</div></td>
            <td class="overview-table__cell overview-table__cell_green"><div class="cell">9</div></td>
          </tr>
          <tr>
            <td><div class="cell">Question 2</div></td>
            <td class="overview-table__cell overview-table__cell_red"><div class="cell">No</div></td>
            <td class="overview-table__cell overview-table__cell_green"><div class="cell">Yes</div></td>
            <td class="overview-table__cell overview-table__cell_red"><div class="cell">No</div></td>
            <td class="overview-table__cell overview-table__cell_green"><div class="cell">Yes</div></td>
            <td class="overview-table__cell overview-table__cell_red"><div class="cell">1</div></td>
            <td class="overview-table__cell overview-table__cell_green"><div class="cell">9</div></td>
            <td class="overview-table__cell overview-table__cell_orange"><div class="cell">5</div></td>
          </tr>
          <tr>
            <td><div class="cell">Question 3</div></td>
            <td class="overview-table__cell overview-table__cell_red"><div class="cell">No</div></td>
            <td class="overview-table__cell overview-table__cell_red"><div class="cell">No</div></td>
            <td class="overview-table__cell overview-table__cell_green"><div class="cell">Yes</div></td>
            <td class="overview-table__cell overview-table__cell_green"><div class="cell">Yes</div></td>
            <td class="overview-table__cell overview-table__cell_green"><div class="cell">9</div></td>
            <td class="overview-table__cell overview-table__cell_red"><div class="cell">1</div></td>
            <td class="overview-table__cell overview-table__cell_orange"><div class="cell">5</div></td>
          </tr>
          <tr>
            <td><div class="cell">Question 4</div></td>
            <td class="overview-table__cell overview-table__cell_red"><div class="cell">No</div></td>
            <td class="overview-table__cell overview-table__cell_green"><div class="cell">Yes</div></td>
            <td class="overview-table__cell overview-table__cell_green"><div class="cell">Yes</div></td>
            <td class="overview-table__cell overview-table__cell_red"><div class="cell">No</div></td>
            <td class="overview-table__cell overview-table__cell_red"><div class="cell">1</div></td>
            <td class="overview-table__cell overview-table__cell_green"><div class="cell">9</div></td>
            <td class="overview-table__cell overview-table__cell_orange"><div class="cell">5</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OverviewPage',
  data () {
    return {
      tableData: [{

      }]
    }
  }
}
</script>

<style>
  .overview-table__cell {
    /* color: #fff; */
  }

  .overview-table__cell_orange {
    background: oldlace;
  }

  .overview-table__cell_green {
    background: #f0f9eb;
  }

  .overview-table__cell_red {
    background: #fff6f7;
  }
</style>
