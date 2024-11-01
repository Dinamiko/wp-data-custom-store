import {createReduxStore, register} from '@wordpress/data';

const actions = {
    setPlugins(plugins) {
        return {
            type: 'set_plugins',
            plugins
        }
    },
    fetch(term) {
        return {
            type: 'FETCH',
            term,
        };
    },
}

export const store = createReduxStore('plugins', {
    reducer(state = {plugins: []}, action) {
        switch (action.type) {
            case 'set_plugins':
                return {...state, plugins: action.plugins}
        }

        return state;
    },
    actions,
    selectors: {
        getPlugins(state) {
            return state.plugins
        }
    },
    controls: {
        FETCH(action) {
            return fetch(`https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&search=${action.term}`)
                .then(response => response.json())
                .then(json => {
                    return json.plugins
                })
        },
    },
    resolvers: {
        * getPlugins(term) {
            const plugins = yield actions.fetch(term)

            return actions.setPlugins(plugins);
        }
    }
});

register(store);
