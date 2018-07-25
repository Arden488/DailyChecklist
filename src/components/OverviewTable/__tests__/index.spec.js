/* global it, describe, expect */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import OverviewTable from '../OverviewTable.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('OverviewTable layout', () => {
  it('is a Vue instance', () => {
    localVue.use(ElementUI);
    const wrapper = shallowMount(OverviewTable, { 
      localVue
    });
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('is renders correctly', () => {
    const wrapper = shallowMount(OverviewTable, { 
      localVue
    });
    expect(wrapper).toMatchSnapshot()
  })
});
