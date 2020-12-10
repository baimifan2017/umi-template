export default {
  '/admin-Api': {
    target: 'http://localhost:8000/',
    // target: 'http://10.99.0.208:8080/',
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/admin-Api': '' },
  },
};
