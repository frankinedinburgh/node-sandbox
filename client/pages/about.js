import React  from 'react';
import Layout from '../components/MyLayout'

const AboutComponent = (props) =>{
	return (
		<div>
			<Layout>
				<pre>{ JSON.stringify(props, null, 4 )}</pre>
			</Layout>
		</div>
	);
};

export default AboutComponent;
