export interface DashboardStat {
    label: string;
    value: string;
    trend: string;
    trendUp: boolean;
    icon: string;
    iconClass: string;
    progress?: number;
    progressClass?: string;
}
