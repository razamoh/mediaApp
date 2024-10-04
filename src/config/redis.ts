import { createClient } from 'redis';

//TODO: Prod redis runs on seperate ec2 instance 
const url = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
const redisClient = createClient({ url });

redisClient.on('error', (err) => console.error('Redis Client Error', err));

//Check for retry for mechanism
export default redisClient;
