/* global it, describe, expect */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import MainNavigation from '../MainNavigation.vue';
import routes from '@/routes';

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(VueRouter);
const router = new VueRouter({ routes });

describe('MainNavigation component', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(MainNavigation, { localVue, router });
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('is renders correctly', () => {
    const wrapper = shallowMount(MainNavigation, { localVue, router });
    expect(wrapper).toMatchSnapshot()
  })
});
