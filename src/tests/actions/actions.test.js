import { expect } from 'chai';
import * as actions from '../../actions';

describe('Actions', () => {
    
    describe('fetchUser action creator', () => {
        let authError, authSuccess, authEmpty;
        beforeAll(() => {
            authError = { code: "auth-error/No email given" };
            authSuccess = { uid: "234kvlHDFEuihfasifdhF"};
            authEmpty = {};
        });

        it('returns an object with payload containing error', () => {
            expect(actions.fetchUser(authError).payload).to.have.key('code');
        });

        it('returns an object with payload containing user info', () => {
            expect(actions.fetchUser(authSuccess).payload).to.have.key('uid');
        });

        it('returns an object with payload containing empty string', () => {
            expect(actions.fetchUser(authEmpty).payload).to.equal('');
        });
    }); 
});
