import React from 'react';
import { shallow } from 'enzyme';

import App from '../src/App';
import store from './redux/store';

describe('<App />', () => {
  it('should be initialised without errors', () => {
    const wrapper = shallow(<App store={store} />);
    expect(wrapper).toBeDefined();
    wrapper.unmount();
  });
});