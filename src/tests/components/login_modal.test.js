import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import { PureLoginModal } from '../../components/login_modal';

describe("Login", () => {
  let wrapper;
  let emailInput;
  let passInput;

  beforeAll(() => {
    wrapper = mount(<PureLoginModal />);
    emailInput = wrapper.ref('email');
    passInput = wrapper.ref('password');

    emailInput.simulate('change', {target: {value: 'test@test.com'}});
    passInput.simulate('change', {target: {value: 'testPassword'}});

  });

  it('renders without crashing', () => {
    expect(wrapper).to.exist;
  });

  it('populates all input fields', () => {
    expect(emailInput.prop('value')).to.equal('test@test.com');
    expect(passInput.prop('value')).to.equal('testPassword');
  });

  it('clears all input on "Clear" button click', () => {
    const button = wrapper.ref('clear');
    button.simulate('click');
    expect(emailInput.prop('value')).to.equal('');
    expect(passInput.prop('value')).to.equal('');
  })

  it('provides error text when fields are invalid', () => {
    const error = 'auth invalid';
    wrapper.setState({ error });
    expect(wrapper.find('p.text-danger').text()).to.equal(error);
  });

  it('provides success text when fields match user credentials', () => {
    const success = 'Welcome back Joe';
    wrapper.setState({ success });
    expect(wrapper.find('p.text-success').text()).to.equal(success);
  });
});  