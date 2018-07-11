import Questions from '@/components/pages/QuestionsPage.vue';
import Form from '@/components/pages/FormPage.vue';
import Overview from '@/components/pages/OverviewPage.vue';

const routes = [
  {
    path: '/',
    component: Overview
  },
  {
    path: '/questions',
    component: Questions
  },
  {
    path: '/form',
    component: Form
  }
];

export default routes;
