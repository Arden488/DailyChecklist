import api from '@/services/api';

export default {
  createQuestion (params) {
    return api().post('questions', params);
  },
  fetchQuestions () {
    return api().get('questions');
  }
}
