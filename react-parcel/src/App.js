import React, { Comonent, Fragment } from 'react';
import db from './db/gaurdian';
import films from './db/imdb';

class MyComponent extends Comonent {

	constructor(props) {
		super(props);
	}

	render() {
		const { spotlight } = db;
		const listItems = spotlight.map((o, index) => <option key={index} value={o}>{o}</option>)
		const film = films.map((o, index) => <option key={index} value={o}>{o}</option>)

		return (
			<Fragment>
				<div>
					<label htmlFor="spotlight">Spotlight</label>
					<select id={"spotlight"}>
						{ listItems }
					</select>
				</div>


				<div>
					<select>
						{ film }
					</select>
				</div>
			</Fragment>
		);
	}
}

export default MyComponent;
