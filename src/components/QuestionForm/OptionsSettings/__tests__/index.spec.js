/* global it, describe, expect, beforeAll */

import { shallowMount, mount, createLocalVue, config } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import OptionsSettings from '../OptionsSettings.vue';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(VueRouter);

// config.provide['elForm'] = { $options: {} }

beforeAll(() => {
  wrapper = mount(OptionsSettings, { 
    localVue
  });
});

describe('OptionsSettings component', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('is renders correctly', () => {
    wrapper.setProps({
      type: 'mood',
      options: {
        rangeStart: 0,
        rangeEnd: 10,
        goodStartsOn: 5,
        badEndsOn: 3,
      } 
    });
    expect(wrapper).toMatchSnapshot()
  })

  // it('it\'s setting type correctly', () => {
  //   wrapper.setData({ typeLocal: 'boolean' })

  //   expect(wrapper.vm.typeLocal).toBe('boolean');

  //   const option = wrapper.find('.el-select-dropdown__item');
  //   option.trigger('click');

  //   expect(wrapper.vm.typeLocal).toBe('time');
  // })

  // it('emits event on change', () => {
  //   wrapper.vm.$emit('type', 'time');

  //   expect(wrapper.emitted().type).toBeTruthy();
  //   expect(wrapper.emitted().type.length).toBe(1);
  //   expect(wrapper.emitted().type[0]).toEqual(['time']);
  // })
});
