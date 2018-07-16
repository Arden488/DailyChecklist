import Questions from '@/components/pages/QuestionsPage.vue';
import CreateReport from '@/components/pages/CreateReportPage.vue';
import Overview from '@/components/pages/OverviewPage.vue';
import CreateQuestion from '@/components/pages/CreateQuestionPage.vue';
import EditQuestion from '@/components/pages/EditQuestionPage.vue';
import SignInPage from '@/components/pages/SignInPage.vue'

const routes = [
  {
    path: '/signin',
    name: 'Sign In',
    component: SignInPage,
    meta: {
      layout: 'clean'
    }
  },
  {
    path: '/',
    name: 'Overview',
    component: Overview,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/questions',
    name: 'Questions',
    component: Questions,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/questions/create',
    name: 'CreateQuestion',
    component: CreateQuestion,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/questions/:id',
    name: 'EditQuestion',
    component: EditQuestion,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/reports/create',
    name: 'CreateReport',
    component: CreateReport,
    meta: {
      requiresAuth: true
    }
  }
];

export default routes;
