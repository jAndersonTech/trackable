import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';

import Table from '../../components/common/table';

describe("Table", () => {
    let wrapper;
    beforeAll(() => {
        // Table Headers are required
        const headers = ['Header 1', 'Header 2']

        wrapper = mount(<Table titles={headers} />);
    });

    it('renders without crashing (requires titles prop)', () => {
        expect(wrapper).to.exist;
    });
});  