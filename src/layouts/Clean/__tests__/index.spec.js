/* global it, describe, expect */

import { mount } from '@vue/test-utils';
import Clean from '../Clean.vue';

describe('Clean layout', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(Clean);
    expect(wrapper.isVueInstance).toBeTruthy()
  })
});
