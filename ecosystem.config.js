module.exports = {
  apps : [{
    name: 'zgame',
    script: 'server/main.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    args: '',
    instances: 2,
    autorestart: true,
    watch: false,
    max_memory_restart: '300M',
    instance_var: 'ZGAME_INSTANCE_ID',
    env: {
      NODE_ENV: 'production'
    },
    env_staging: {
      NODE_ENV: 'staging'
    } 
  }],

  deploy : {
    production : {
      user : 'node',
      host : '212.83.163.1',
      ref  : 'origin/master',
      repo : 'git@github.com:repo.git',
      path : '/var/www/production',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
};
