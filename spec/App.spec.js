import React from 'react';
import { mount } from 'enzyme';

import App from '../src/App';

describe('<App />', () => {
  it('should be initialised without errors', () => {
    const wrapper = mount(<App />);
    expect(wrapper).toBeDefined();
    wrapper.unmount();
  });
});