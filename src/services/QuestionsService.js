import api from '@/services/api';

export default {
  fetchQuestion (id) {
    return api().get(`questions/${id}`);
  },
  deleteQuestion (id) {
    return api().delete(`questions/${id}`);
  },
  updateQuestion (params) {
    return api().put(`questions/${params.id}`, params)
  },
  createQuestion (params) {
    return api().post('questions', params);
  },
  fetchQuestions () {
    return api().get('questions');
  }
}
