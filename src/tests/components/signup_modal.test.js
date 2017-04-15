import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import SignupModal from '../../components/signup_modal';

describe("Sign Up", () => {
  let wrapper;
  let userInput;
  let emailInput;
  let passInput;

  beforeAll(() => {
    wrapper = mount(<SignupModal />);
    userInput = wrapper.ref('username');
    emailInput = wrapper.ref('email');
    passInput = wrapper.ref('password');

    userInput.simulate('change', {target: {value: 'John Doe'}});
    emailInput.simulate('change', {target: {value: 'test@test.com'}});
    passInput.simulate('change', {target: {value: 'testPassword'}});

  });

  it('renders without crashing', () => {
    expect(wrapper).to.exist;
  });

  it('populates all input fields', () => {
      expect(userInput.prop('value')).to.equal('John Doe');
      expect(emailInput.prop('value')).to.equal('test@test.com');
      expect(passInput.prop('value')).to.equal('testPassword');
  });

  it('clears all input on "Clear" button click', () => {
      const button = wrapper.ref('clear');
      button.simulate('click');
      expect(emailInput.prop('value')).to.equal('');
      expect(passInput.prop('value')).to.equal('');
  })
});  