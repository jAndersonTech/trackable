import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { Provider } from 'react-redux';
import ReduxPromise from 'redux-promise';
import { createStore, applyMiddleware } from 'redux';

import App from '../../components/app';
import reducers from '../../reducers';

describe("App", () => {
  let wrapper;
  beforeAll(() => {
    const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
    wrapper = mount(<Provider store={createStoreWithMiddleware(reducers)}>
                      <App />
                    </Provider>);
  });

  it('renders without crashing', () => {
    expect(wrapper).to.exist;
  });

  describe("Header", () => {
    it('renders without crashing', () =>{
      expect(wrapper.find('.header')).to.have.length(1);
    });

    it('contains exactly one h1 tag with title "Trackable"', () => {
      expect(wrapper.find('.header h1')).to.have.length(1);
      expect(wrapper.find('.header h1').text()).to.contain('Trackable');
    });
  });
});  

