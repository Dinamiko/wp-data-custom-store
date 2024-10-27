import {useState} from '@wordpress/element';

export function App() {
    const [term, setTerm] = useState('')
    const [plugins, setPlugins] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

        fetch(`https://api.wordpress.org/plugins/info/1.2/?action=query_plugins&search=${term}`)
            .then(response => response.json())
            .then(json => {
                setIsLoading(false)
                return setPlugins(json.plugins)
            })
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
