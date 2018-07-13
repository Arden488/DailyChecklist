<template>
  <div>
    <h1>List of questions</h1>
    <el-table
      :data="questions"
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
            @click="handleDelete(scope.$index, scope.row, questions)">Delete</el-button>
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
    handleDelete(index, row, rows) {
      this.$confirm('This will permanently delete the question. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true
      }).then(() => {
        rows.splice(index, 1);
        const response = this.deleteQuestion(row._id);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Delete canceled'
        });
      });
    },
    
    handleEdit(index, row) {
      this.$router.push({ name: 'EditQuestion', params: { id: row._id } })
    },

    async deleteQuestion (id) {
      try {
        const response = await QuestionsService.deleteQuestion(id);
        if (await response.status) {
          if (response.status === 200) {
            this.$message({
              type: 'success',
              message: 'Delete completed'
            });
          } else {
            this.$message({
              type: 'error',
              message: 'Error occurred while deleting'
            });
          }
        }
      } catch(e) {
        console.log(e);
        this.$message({
          type: 'error',
          message: 'Error occurred while deleting'
        });
      }
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

