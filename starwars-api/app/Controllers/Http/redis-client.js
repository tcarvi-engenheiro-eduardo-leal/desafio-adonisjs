'use strict'

const Redis = require('ioredis')
const Env = use('Env')

const redis = new Redis({
  host: Env.get('REDIS_HOST', '127.0.0.1'),
  port: Env.get('REDIS_PORT', 6379),
  password: Env.get('REDIS_PASSWORD', null),
})

module.exports = redis
