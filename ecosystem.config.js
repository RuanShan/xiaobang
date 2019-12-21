module.exports = {
  apps : [{
    name: 'xiaobang:8097',
    script: 'server/main.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '300M',
    instance_var: 'XIAOBANG_INSTANCE_ID',
    env: {
      NODE_ENV: 'production'
    },
    env_staging: {
      NODE_ENV: 'staging'
    }
  }],

  deploy : {
    production : {
    }
  }
};
