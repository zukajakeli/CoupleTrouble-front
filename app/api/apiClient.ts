import axios from 'axios';

const BASE_URL = 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: BASE_URL,
});

// axiosInstance.interceptors.request.use(
//   function (config) {
//     const accessToken = localStorage.getItem('ACCESS_TOKEN');
//     const refreshToken = localStorage.getItem('REFRESH_TOKEN');

//     if (accessToken) {
//       config.headers['Authorization'] = `${accessToken}`;
//     }
//     if (refreshToken) {
//       config.headers['refresh_token'] = `${refreshToken}`;
//     }

//     return config;
//   },
//   function (error) {
//     return Promise.reject(error);
//   }
// );

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   async (error) => {
//     const originalRequest = error.config
//     if (error.response && error.response.status === 403) {
//       window.location.href = '/'
//       localStorage.clear()
//     }
//     if (error.response && error.response.status === 401) {
//       try {
//         const refreshToken = localStorage.getItem('REFRESH_TOKEN')
//         const response = await axios.post(
//           `${BASE_URL}/auth/refresh`,
//           {
//             // refresh_token: refreshToken,
//           },
//           {
//             headers: {
//               refresh_token: `${refreshToken}`,
//             },
//           }
//         )

//         const newAccessToken = response.data
//         console.log('newAccessToken', newAccessToken)

//         localStorage.setItem('ACCESS_TOKEN', newAccessToken)

//         // Retry the failed requests in the queue
//         failedQueue.forEach((request) => request(newAccessToken))
//         failedQueue = []

//         originalRequest.headers['Authorization'] = `${newAccessToken}`
//         return axios(originalRequest)
//       } catch (refreshError) {
//         console.error('Token refresh failed:', refreshError)
//         return Promise.reject(refreshError)
//       } finally {
//         // isRefreshing = false
//       }
//     }
//     return Promise.reject(error)
//   }
// )

export default apiClient;
