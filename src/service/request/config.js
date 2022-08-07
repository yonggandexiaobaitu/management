//不同环境下的axios配置
export default {
  baseURL:import.meta.env.VITE_BASEURL,
  timeout:import.meta.env.VITE_TIMEOUT,
};