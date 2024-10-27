import {createReduxStore, register} from '@wordpress/data';

const DEFAULT_STATE = {
    data: [],
    loading: false,
    error: '',
}

const store = createReduxStore('plugins', {
    reducer(state = DEFAULT_STATE, action) {
        switch (action.type) {
            default:
                return state;
        }
    }
});

register(store);
