import { register, Histogram, Counter, collectDefaultMetrics } from 'prom-client';
//Copied from Sfera_metrics_promethius
// Collect default metrics such as memory usage, CPU usage, etc.
collectDefaultMetrics();

// Define custom metrics for Bull queue
const bullQueueCompleted = new Counter({
    name: 'bull_queue_completed',
    help: 'Total number of completed jobs',
});

const bullQueueCompleteDuration = new Histogram({
    name: 'bull_queue_complete_duration',
    help: 'Processing time for completed jobs',
    buckets: [0.1, 0.5, 1, 2, 5, 10], // Customize buckets based on expected duration
});

const bullQueueActive = new Counter({
    name: 'bull_queue_active',
    help: 'Total number of active jobs (currently being processed)',
});

const bullQueueDelayed = new Counter({
    name: 'bull_queue_delayed',
    help: 'Total number of jobs that will run in the future',
});

const bullQueueFailed = new Counter({
    name: 'bull_queue_failed',
    help: 'Total number of failed jobs',
});

const bullQueueWaiting = new Counter({
    name: 'bull_queue_waiting',
    help: 'Total number of jobs waiting to be processed',
});

// Define additional metrics for Node.js process performance
const memoryUsage = new Histogram({
    name: 'node_memory_usage_bytes',
    help: 'Memory usage of the Node.js process in bytes',
});

const cpuUsage = new Histogram({
    name: 'node_cpu_usage_seconds_total',
    help: 'Total CPU usage of the Node.js process in seconds',
});

// Export all metrics for use in other parts of the application
export const metrics = {
    bullQueueCompleted,
    bullQueueCompleteDuration,
    bullQueueActive,
    bullQueueDelayed,
    bullQueueFailed,
    bullQueueWaiting,
    memoryUsage,
    cpuUsage,
};

// Register all custom metrics
export const registerMetrics = register;
