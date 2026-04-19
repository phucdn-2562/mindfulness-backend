module.exports = {
    apps: [{
        name: 'mindfulness-backend',
        script: 'dist/main.js', // File đã build
        instances: 'max',       // Cluster mode: Tận dụng toàn bộ CPU core
        exec_mode: 'cluster',   // Chế độ proxy/cluster của PM2
        autorestart: true,
        watch: false,
        env_production: {
            NODE_ENV: 'production',
            PORT: 3000
        }
    }]
};