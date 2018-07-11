<template>
  <div>{{questions}}</div>
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
    async getQuestions () {
      const response = await QuestionsService.fetchQuestions()
      this.questions = response
    }
  },
  mounted() {
    this.getQuestions()
  }
}
</script>

