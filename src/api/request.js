import axios from 'axios'

const port = '3001'
const baseURL = `http://localhost:${port}`

/**
 *
 * @param {string} url
 */
export async function get(url) {
  const response = await axios.get(url, {
    baseURL,
  })
  if (response.status >= 200 && response.status < 300) {
    return response.data
  }
  console.error(`get ${url}  请求错误`)
}

/**
 *
 * @param {string} url
 * @param {any} data
 */
export async function post(url, data) {
  const response = await axios.post(url, data, {
    baseURL,
  })
  if (response.status >= 200 && response.status < 300) {
    return response.data
  }
  console.error(`post ${url}  请求错误`)
}
