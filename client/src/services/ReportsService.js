import api from '@/services/api';

export default {
  fetchReport (id) {
    return api().get(`reports/${id}`);
  },
  deleteReport (id) {
    return api().delete(`reports/${id}`);
  },
  updateReport (params) {
    return api().put(`reports/${params.id}`, params)
  },
  createReport (params) {
    return api().post('reports', params);
  },
  fetchReports () {
    return api().get('reports');
  }
}
