import Layout from '../components/MyLayout.js'
import Link from 'next/link'
import fetch  from 'isomorphic-unfetch'

const TrainingList = ({plan}) => (
	<Layout>
		<pre>{ JSON.stringify(plan, null, 4) }</pre>
		<ul>
			{plan &&
				plan.map((d) => (
					<li key={d._id}>
						<Link as={`/session/${d._id}`} href={`/session?id=${d._id}`}>
							<a>{Date.parse(d.date)}</a>
						</Link>
					</li>
				))}
		</ul>
	</Layout>
)

TrainingList.getInitialProps = async function (context){
	const res = await fetch(`http://192.168.23.57:3333/training/`, {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		}
	})
	const plan = await res.json();
	return {plan}
}

export default TrainingList
