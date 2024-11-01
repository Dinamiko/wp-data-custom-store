import {createReduxStore, register} from '@wordpress/data';

const actions = {
    setIsLoading(isLoading) {
        return {
            type: 'set_is_loading',
            isLoading
        }
    },
    setPlugins(plugins) {
        return {
            type: 'set_plugins',
            plugins,
        }
    },
    fetch(term) {
        return {
            type: 'FETCH',
            term,
        };
    },
    * searchPlugins(term) {
        yield actions.setIsLoading(true)
        yield actions.setPlugins([])

        const plugins = yield actions.fetch(term)

        yield actions.setIsLoading(false)
        yield actions.setPlugins(plugins);
    }
}

export const store = createReduxStore('plugins', {
    reducer(state = {plugins: [], isLoading: false}, action) {
        switch (action.type) {
            case 'set_is_loading':
                return {...state, isLoading: action.isLoading}
            case 'set_plugins':
                return {...state, plugins: action.plugins}
        }

        return state;
    },
    actions,
    selectors: {
        getPlugins(state) {
            return state.plugins
        },
        getIsLoading(state) {
            return state.isLoading
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
});

register(store);
