/* global it, describe, expect */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import DefaultValue from '../DefaultValue.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);

describe('DefaultValue layout', () => {
  it('is a Vue instance', () => {
    localVue.use(ElementUI);
    const wrapper = shallowMount(DefaultValue, { 
      localVue
    });
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('is renders correctly', () => {
    const wrapper = shallowMount(DefaultValue, { 
      localVue
    });
    expect(wrapper).toMatchSnapshot()
  })
});
