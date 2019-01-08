console.log('APP JS')

const options = {
	method: 'GET',
	mode: 'no-cors'
}

fetch('http://localhost:3000/', options)
	.then(res => res.json())
	.then(data => { debugger; })
	.catch(err => console.log(err))





