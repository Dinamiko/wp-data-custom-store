import {useState} from '@wordpress/element';
import './store'
import {useDispatch, useSelect} from "@wordpress/data";

export function App() {
    const [term, setTerm] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const plugins = useSelect( ( select ) => {
        return select( 'plugins' ).getPlugins();
    }, [] );

    const {searchPlugins} = useDispatch('plugins');

    const onSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        searchPlugins(term)
    }

    return <>
        <form onSubmit={onSubmit}>
            <input value={term} onChange={(e) => setTerm(e.target.value)}/>
            <button>Search</button>
        </form>
        {isLoading && <div>Loading...</div>}
        <ul>
            {plugins.map((plugin) => {
                return <li key={plugin.slug}>{plugin.name}</li>
            })}
        </ul>
    </>
}
