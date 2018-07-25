/* global it, describe, expect */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import QuestionForm from '../QuestionForm.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('QuestionForm layout', () => {
  it('is a Vue instance', () => {
    localVue.use(ElementUI);
    const wrapper = shallowMount(QuestionForm, { 
      localVue
    });
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('is renders correctly', () => {
    const wrapper = shallowMount(QuestionForm, { 
      localVue
    });
    expect(wrapper).toMatchSnapshot()
  })
});
