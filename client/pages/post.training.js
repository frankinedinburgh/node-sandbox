import Layout from '../components/MyLayout.js'
import fetch  from 'isomorphic-unfetch'

const Training = ({session}) => (
	<Layout>
		<pre>{JSON.stringify(session, null, 4)}</pre>
	</Layout>
)

Training.getInitialProps = async function (context){

	const {id} = context.query
	const res = await fetch(`http://192.168.23.57:3333/training/${id}`)
	const session = await res.json()

	return {session}
}

export default Training
