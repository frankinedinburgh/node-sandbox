import React, { Component, Fragment } from 'react';
import axios from 'axios';
import _ from 'lodash';
import styled from 'styled-components'
const Table = styled.table`
	font-family: sans-serif;
	font-size: 0.8rem;
	border-collapse: collapse;
	width: 100%;
	td, th {
		border: 1px solid #ddd;
    padding: 8px;
	}
	tr:nth-child(even){
		background-color: #f2f2f2;
	}
	
	tr:hover { background-color: #ddd; }
	th {
		padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #4CAF50;
    color: white;
	}
`



class MyComponent extends Component {

	constructor(props) {
		super(props);

		this.onSortHandler = this.onSortHandler.bind(this);
		this.fetchTickets = this.fetchTickets.bind(this);
		this.state = {
			tickets: null
		}
	}

	componentDidMount() {
		this.fetchTickets()
	}

	fetchTickets() {
		axios({
			method: 'get',
			url: `http://localhost:3000/tickets`,
		}).then(res => {
			if(res.status !== 200) return;
			this.setState({
				tickets: res.data
			})
		})
	}

	onSortHandler(val) {
		const {tickets} = this.state;
		this.setState({
			tickets: _.sortBy(tickets, val)
		})

	}

	render() {
		const {tickets} = this.state;
		return (
			<Fragment>
				<Table>
					<thead>
					<tr>
						<th onClick={() => { this.onSortHandler('key') }}>Key</th>
						<th onClick={() => { this.onSortHandler('summary') }}>Summary</th>
						<th onClick={() => { this.onSortHandler('assignee') }}>Assignee</th>
						<th onClick={() => { this.onSortHandler('status') }}>Status</th>
					</tr>
					</thead>
					<tbody>
					{ tickets &&
					tickets.map((d, index) =>
						<tr key={`row-${index}`}>
							<td key={`key-${index}`}><a href={`https://emergentdatagroup.atlassian.net/browse/${d.key}`}>{d.key}</a></td>
							<td key={`summary-${index}`}>{d.summary}</td>
							<td key={`assignee-${index}`}>{d.assignee}</td>
							<td key={`status-${index}`}>{d.status}</td>
						</tr>
					)
					}
					</tbody>
				</Table>
			</Fragment>
		);
	}
}

export default MyComponent;
