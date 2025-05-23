type ErrorSeverity = 'error' | 'warning' | 'info';

interface ErrorLog {
  message: string;
  timestamp: string;
  severity: ErrorSeverity;
  error?: Error;
  context?: Record<string, unknown>;
}

const errorLogs: ErrorLog[] = [];

/**
 * Log an error with the specified severity and optional context
 */
export function logError(
  message: string,
  error?: Error,
  severity: ErrorSeverity = 'error',
  context?: Record<string, unknown>
) {
  const errorLog: ErrorLog = {
    message,
    timestamp: new Date().toISOString(),
    severity,
    error,
    context,
  };

  errorLogs.push(errorLog);

  // In development, still show errors in console
  if (process.env.NODE_ENV === 'development') {
    const consoleMethod = severity === 'error' ? console.error : console.warn;
    consoleMethod(`[${severity.toUpperCase()}] ${message}`, error || '', context || '');
  }

  // Here you could add additional error reporting logic:
  // - Send to error tracking service
  // - Log to analytics
  // - Show user feedback if needed
}

/**
 * Get all logged errors
 */
export function getErrorLogs(): ErrorLog[] {
  return [...errorLogs];
}

/**
 * Clear all logged errors
 */
export function clearErrorLogs(): void {
  errorLogs.length = 0;
} 