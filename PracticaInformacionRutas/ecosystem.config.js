module.exports = {
  apps : [{
    name   : "app",
    script : "./src/app.js",
    watch: true,
    env_development: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }]
}