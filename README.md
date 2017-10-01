# RVEBuilder
Simple React email html builder component

[![Build Status](https://api.travis-ci.org/edtoken/rvebuilder.svg?branch=master)](https://travis-ci.org/edtoken/rvebuilder)

[![NPM](https://nodei.co/npm/rvebuilder.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/rvebuilder/)

[![NPM](https://nodei.co/npm-dl/rvebuilder.png?height=3)](https://nodei.co/npm/rvebuilder/)


### WARNING
This plugin is in the process of development
I know many things in the code leave much to be desired.  
With new updates I will make the code cleaner  


### Installation``
To install the stable version:

```
npm install --save rvebuilder
```


### Examples
* [Basic usage](https://github.com/edtoken/rvebuilder/blob/master/examples/basic-usage.jsx)
* [Save server callback](https://github.com/edtoken/rvebuilder/blob/master/examples/basic-usage.jsx)
* [Custom Styles](https://github.com/edtoken/rvebuilder/blob/master/examples/basic-usage.jsx)
* [Custom WYSIWYG](https://github.com/edtoken/rvebuilder/blob/master/examples/basic-usage.jsx)
* [Server images](https://github.com/edtoken/rvebuilder/blob/master/examples/basic-usage.jsx)

#### Email template examples
* [Basic JSON email template](https://github.com/edtoken/rvebuilder/blob/master/examples/template-1.json)

### Simple using

```
/**
 *
 * Step 1 of 2
 * The store should know how to handle actions coming from the form components.
 * To enable this, we need to pass the builderReducer to your store.
 * It serves for all of your form components, so you only have to pass it once.
 *
 */

import {createStore, combineReducers} from 'redux';
import {reducer as builderReducer} from 'rvebuilder';

const rootReducer = combineReducers({
	_rveBuilder: builderReducer
});


/**
 *
 * Step 2 of 2
 * ...
 * ...
 * ...
 *
 */


import React, {Component} from 'react';
import {Builder as RVEBuilder} from 'rvebuilder';

import '../src/theme/default.scss';

class YourWrapperComponent extends Component {

	constructor(props) {
		super(props);
		this.onSaveTemplate = this.onSaveTemplate.bind(this);
	}

	onSaveTemplate(template) {
		// ...
	}

	render() {

		let builderProps = {
			onSaveTemplate: this.onSaveTemplate
		};

		return (<RVEBuilder {...builderProps}/>)
	}
}

```

### Props

| Name          | Type    |
 Required      | Default value | Example value         | Description                            |
| ------------- |:-------:|:-------------:|---------------|-----------------------|----------------------------------------|
| template      | Object  | No            |               | see template examples | template json data                     |
| tokens        | Array   | No            |               | `["FIRST_NAME", "LAST_NAME"]` | variables for text             |
| wysiwyg       | Component| No           | False         |                       | custom wysiwyg editor                  |
| onChangeImage | Function| No            |               |                       | image upload handler argumens ...|
| onSaveTemplate| Function| Yes           |               |                       | template save handler arguments (newTemplate) |
| tokens        | Object  | No            |               |                       | plugin language tokens, see tokens.json |
| lang          | Object  | No            | en            |                       | plugin language tokens, see tokens.json, `['en', 'ru']` |


### Structure

#### Body
Body container -> Rows wrapper styles

#### Row
Row container -> Columns wrapper styles

#### Column
#### Element

## Unit testing
```
npm test
```

## Changelog
[CHANGELOG.md](./CHANGELOG.md)

## License
[MIT](https://github.com/edtoken/rvebuilder/blob/master/LICENSE)
