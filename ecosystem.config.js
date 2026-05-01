module.exports = {
  apps: [
    {
      name: "int-backend",
      script: "server.js",
      cwd: "./backend",
      env: {
        NODE_ENV: "production",
      }
    },
    {
      name: "int-frontend",
      script: "npm",
      args: "run dev",
      cwd: "./frontend",
      env: {
        NODE_ENV: "development",
      }
    }
  ]
};
