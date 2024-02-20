export default (code) => {
  const env = (window._config && window._config[`VITE_APP_${code}`]) || import.meta.env[`VITE_APP_${code}`]
  return env || ''
}
