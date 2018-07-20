<template>
  <div>
    <h1>Create question</h1>
    <QuestionForm />
  </div>
</template>

<script>
import QuestionForm from '@/components/QuestionForm/QuestionForm.vue';

export default {
  name: 'CreateQuestionPage',
  components: {
    QuestionForm,
  }
}
</script>

