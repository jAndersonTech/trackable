import { expect } from 'chai';

import * as actions from '../../actions';
import * as types from '../../actions/types';
import TracksReducer from '../../reducers/auth_reducer';
import firebaseInit from '../../resources/firebase_init';

describe("Tracks Reducer", () => {

    let payload;

    beforeAll(() => {
        firebaseInit();
    });

    it('returns the payload of the "FETCH_USER" action', () => {
    });
});