import { baseUrl } from './env'
import axios from './axios'

export function get(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
			params: data
		}).then(response => {
			if (response.data) {
				return resolve(response.data)
			}
			return reject("none")
		}).catch(err => {
				reject(err)
			})
	})
}

export async function post(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data)
			.then(response => {
				if (response.data) {
					return resolve(response.data)
				}
				return reject("none")
			})
			.catch(err => {
				reject(err)
			})
	})
}