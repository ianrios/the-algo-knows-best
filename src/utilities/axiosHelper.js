import axios from 'axios'

export function axiosHelper(props) {
	const {
		method = 'get',
		url = '/',
		data = {},
		token = '',
		successMethod = r => console.log(r),
		failureMethod = e => console.log(e)
	} = props; // setting default prop values

	const API_URL = 'https://algoknows-ianrios529550.codeanyapp.com'

	return axios({
		method,
		url: API_URL + url,
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Origin': '*',
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		data
	})
		.then(successMethod)
		.catch(failureMethod)
}