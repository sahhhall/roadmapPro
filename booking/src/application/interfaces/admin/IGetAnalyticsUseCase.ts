
export interface IGetAnalyticsUseCase {
    execute(days: string): Promise<any[] | null>
}