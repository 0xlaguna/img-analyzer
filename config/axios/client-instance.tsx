import axios, { AxiosInstance } from "axios"

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
})

export default axiosInstance
