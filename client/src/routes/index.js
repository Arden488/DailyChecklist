import Questions from '@/components/pages/QuestionsPage.vue';
import AppForm from '@/components/pages/FormPage.vue';
import Overview from '@/components/pages/OverviewPage.vue';
import CreateQuestion from '@/components/pages/CreateQuestionPage.vue';
import EditQuestion from '@/components/pages/EditQuestionPage.vue';

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/questions',
    name: 'Questions',
    component: Questions
  },
  {
    path: '/questions/create',
    name: 'CreateQuestion',
    component: CreateQuestion
  },
  {
    path: '/questions/:id',
    name: 'EditQuestion',
    component: EditQuestion
  },
  {
    path: '/form',
    name: 'AppForm',
    component: AppForm
  }
];

export default routes;
