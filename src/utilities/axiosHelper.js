import axios from 'axios'
import { API_URL } from './constants.js'

export function axiosHelper(props) {
	const {
		method = 'get',
		url = '/',
		data = {},
		token = '',
		successMethod = r => console.log(r),
		failureMethod = e => console.log(e)
	} = props; // setting default prop values

	return axios({
		method,
		url: API_URL + url,
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',
			'Access-Control-Allow-Origin': '*',
			// 'Access-Control-Allow-Headers': 'Content-Type',
			// 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
			// 'Access-Control-Allow-Credentials': true,
			'Accept': 'application/json',
			'Authorization': 'Bearer ' + token
		},
		data
	})
		.then(successMethod)
		.catch(failureMethod)
}