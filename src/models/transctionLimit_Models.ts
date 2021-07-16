export interface TransactionLimit {
  title: string;
  perTransactionLimit: number;
  dailyCountLimit: number;
  remainingDailyCount: number;
  dailyAmountLimit: number;
  remainingDailyAmount: number;
  monthlyAmountLimit: number;
  remainingMonthlyAmount: number;
}
