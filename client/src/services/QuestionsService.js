import api from '@/services/api';

export default {
  fetchQuestions () {
    return api().get('questions');
  }
}
