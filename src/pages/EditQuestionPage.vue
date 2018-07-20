<template>
  <div v-if="passedQuestionForm.title">
    <h1>Edit question "{{passedQuestionForm.title}}"</h1>
    <QuestionForm :passedQuestionForm="passedQuestionForm" />
  </div>
</template>

<script>
import QuestionsService from '@/services/QuestionsService';
import QuestionForm from '@/components/QuestionForm/QuestionForm.vue';

export default {
  name: 'CreateQuestionPage',
  components: {
    QuestionForm,
  },
  data () {
    return {
      passedQuestionForm: {}
    }
  },
  methods: {
    async getQuestion () {
      const response = await QuestionsService.fetchQuestion(this.$route.params.id);

      this.passedQuestionForm = {};
      this.passedQuestionForm.options = {};
      this.passedQuestionForm.repeat = { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false, sun: false };

      this.passedQuestionForm.id = response.data._id;
      this.passedQuestionForm.title = response.data.title;
      
      if (response.data.repeat) {
        const repeat = response.data.repeat;
        
        if (repeat !== 'daily') {
          repeat.split(',').forEach(el => {
            this.passedQuestionForm.repeat[el] = true;
          });
          this.passedQuestionForm.checkAll = false;
          if (repeat.split(',').length > 0) this.passedQuestionForm.isIndeterminate = true;
        } else {
          Object.keys(this.passedQuestionForm.repeat).forEach(el => {
            this.passedQuestionForm.repeat[el] = true;
          });
          this.passedQuestionForm.isIndeterminate = false;
          this.passedQuestionForm.checkAll = true;
        }
      }

      this.passedQuestionForm.type = response.data.type;
      this.passedQuestionForm.value = response.data.value;

      if (response.data.options.range) {
        const range = response.data.options.range.split('-');
        this.passedQuestionForm.options.rangeStart = range[0];
        this.passedQuestionForm.options.rangeEnd = range[1];
      }

      if (response.data.options.badEndsOn) {
        this.passedQuestionForm.options.badEndsOn = response.data.options.badEndsOn;
      }

      if (response.data.options.goodStartsOn) {
        this.passedQuestionForm.options.goodStartsOn = response.data.options.goodStartsOn;
      }

      if (response.data.options.values) {
        this.passedQuestionForm.options.values = response.data.options.values;
      }

      // values
    },
  },
  mounted () {
    this.getQuestion();
  },
}
</script>

