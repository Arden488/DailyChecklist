/* global it, describe, expect */

import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import ElementUI from 'element-ui';
import Default from '../Default.vue';

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('Default layout', () => {
  it('is a Vue instance', () => {
    const wrapper = shallowMount(Default, { localVue });
    expect(wrapper.isVueInstance).toBeTruthy()
  })
});
