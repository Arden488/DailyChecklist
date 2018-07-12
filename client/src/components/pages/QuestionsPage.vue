<template>
  <div>
    <h1>List of questions</h1>
    <el-table
      :data="questions"
      :default-sort = "{prop: '_id', order: 'descending'}"
      style="width: 100%">
      <el-table-column
        label="Title"
        prop="title"
        sortable
      >
      </el-table-column>
      <el-table-column
        label="Type"
        prop="type"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="Operations"
        width="250"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
      <el-table-column
        label="ID"
        prop="_id"
        sortable
        width="220">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import QuestionsService from '@/services/QuestionsService';

export default {
  name: 'QuestionsPage',
  data () {
    return {
      questions: []
    }
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
    },
    
    handleEdit(index, row) {
      console.log(index, row);
    },

    async getQuestions () {
      const response = await QuestionsService.fetchQuestions()
      this.questions = response.data.items
    }
  },
  mounted() {
    this.getQuestions()
  }
}
</script>

