# WordPress Data Custom Store

### Install
```
$ npm install
```

### Run
```
$ npm run wp-env start
$ npm run start
```

### Use Store in Browser
```
dispatch = wp.data.dispatch('plugins')
select = wp.data.select('plugins')

dispatch.searchPlugins('pdf')
select.getPlugins()
```
