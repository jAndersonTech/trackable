import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Container from '../../components/common/container';

describe("Container", () => {
  let wrapper;
  beforeAll(() => {
    wrapper = mount(<Container title="Container Title" />);
  });

  it('renders without crashing', () => {
    expect(wrapper).to.exist;
  });

  it('uses title given in props', () => {
    expect(wrapper.find('.card-header').text()).to.contain('Container Title');
  });
});  