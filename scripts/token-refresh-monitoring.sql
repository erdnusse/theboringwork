-- Create table for token refresh logging
CREATE TABLE IF NOT EXISTS token_refresh_log (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    success BOOLEAN NOT NULL,
    error TEXT,
    retry_count INTEGER DEFAULT 0,
    execution_time_ms INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for efficient querying
CREATE INDEX IF NOT EXISTS idx_token_refresh_log_timestamp ON token_refresh_log(timestamp);
CREATE INDEX IF NOT EXISTS idx_token_refresh_log_success ON token_refresh_log(success);

-- Create a view for monitoring dashboard
CREATE OR REPLACE VIEW token_refresh_stats AS
SELECT 
    DATE_TRUNC('hour', timestamp) as hour,
    COUNT(*) as total_attempts,
    COUNT(*) FILTER (WHERE success = true) as successful_attempts,
    COUNT(*) FILTER (WHERE success = false) as failed_attempts,
    ROUND(AVG(execution_time_ms)) as avg_execution_time_ms,
    MAX(execution_time_ms) as max_execution_time_ms
FROM token_refresh_log 
WHERE timestamp >= NOW() - INTERVAL '24 hours'
GROUP BY DATE_TRUNC('hour', timestamp)
ORDER BY hour DESC;
