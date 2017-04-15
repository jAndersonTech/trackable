import {
    FETCH_TRACKS, 
    UPLOAD_TRACK} from '../actions/types';

const INITIAL_STATE = {
    selected: {},
    all: {}
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case UPLOAD_TRACK:
        case FETCH_TRACKS:
            return { all: action.payload };
        default: 
            return state;
    }
}