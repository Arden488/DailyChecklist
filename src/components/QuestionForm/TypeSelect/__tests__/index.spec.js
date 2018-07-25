/* global it, describe, expect */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import TypeSelect from '../TypeSelect.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(VueRouter);

describe('Default layout', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(TypeSelect, { localVue });
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('is renders correctly', () => {
    const wrapper = shallowMount(TypeSelect, { localVue });
    expect(wrapper).toMatchSnapshot()
  })

  it('it\'s type is empty', () => {
    const wrapper = shallowMount(TypeSelect, { localVue });
    console.log(wrapper.vm.props);
    expect(wrapper.vm.typeLocal).toBe('');
  })
});
