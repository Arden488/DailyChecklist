/* global it, describe, expect */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import TypeSelect from '../TypeSelect.vue';

let wrapper;
const localVue = createLocalVue();
localVue.use(ElementUI);
localVue.use(VueRouter);

beforeAll(() => {
  wrapper = shallowMount(TypeSelect, { localVue });
});

describe('Default layout', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('is renders correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('it\'s setting type correctly', () => {
    wrapper.setData({ typeLocal: 'boolean' })

    expect(wrapper.vm.typeLocal).toBe('boolean');

    const option = wrapper.find('.el-select-dropdown__item');
    option.trigger('click');

    expect(wrapper.vm.typeLocal).toBe('time');
  })

  it('emits event on change', () => {
    wrapper.vm.$emit('type', 'time');

    expect(wrapper.emitted().type).toBeTruthy();
    expect(wrapper.emitted().type.length).toBe(1);
    expect(wrapper.emitted().type[0]).toEqual(['time']);
  })
});
