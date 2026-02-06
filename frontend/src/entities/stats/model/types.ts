/**
 * Represents a statistical metric displayed on the administrative dashboard.
 * Includes visual styling hints and trend indicators.
 */
export interface DashboardStat {
    /** Descriptive label for the metric (e.g., 'Total Revenue') */
    label: string;

    /** Current numeric or string value to display */
    value: string;

    /** Textual description of the trend (e.g., '↑ 12% from last month') */
    trend: string;

    /** Whether the current trend is considered positive/upward */
    trendUp: boolean;

    /** Path or name for the icon representing the metric */
    icon: string;

    /** Visual style classes for the icon container (e.g., colors) */
    iconClass: string;

    /** Optional numeric percentage for a progress bar (0-100) */
    progress?: number;

    /** Optional styling classes for the progress bar itself */
    progressClass?: string;
}
