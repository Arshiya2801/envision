/**
 * Formats an ISO date string to British English format in UTC (e.g., '15 Aug 2026').
 * @param {string} iso
 * @returns {string}
 */
export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });

/**
 * Extracts YYYY-MM-DD from an ISO string for pre-filling date inputs.
 * @param {string} iso
 * @returns {string}
 */
export const toDateInput = (iso) => (iso ? iso.slice(0, 10) : '');

/**
 * Returns today's date formatted as local YYYY-MM-DD.
 * @returns {string}
 */
export const todayYMD = () => new Date().toLocaleDateString('en-CA');

/**
 * Checks if a project/task deadline is overdue (past today and not Completed).
 * @param {string} iso
 * @param {string} status
 * @returns {boolean}
 */
export const isOverdue = (iso, status) =>
  status !== 'Completed' && Boolean(iso) && iso.slice(0, 10) < todayYMD();
