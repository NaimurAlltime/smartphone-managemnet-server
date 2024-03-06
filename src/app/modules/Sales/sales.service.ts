import { TSales } from './sales.interface';
import { Sales } from './sales.model';

const createSalesIntoDB = async (payload: TSales) => {
  const result = await Sales.create(payload);
  return result;
};

const getSalesHistoryIntoDB = async (
  timeFrame: 'weekly' | 'daily' | 'monthly' | 'yearly',
): Promise<TSales[]> => {
  try {
    const now = new Date();
    let startDate: Date;

    // Calculate start date based on time frame
    if (timeFrame === 'weekly') {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
    } else if (timeFrame === 'daily') {
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 1);
    } else if (timeFrame === 'monthly') {
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    } else if (timeFrame === 'yearly') {
      startDate = new Date(now.getFullYear() - 1, 0, 1);
    } else {
      throw new Error('Invalid time frame specified');
    }

    // Query sales data from database based on the calculated start date
    const salesData: TSales[] = await Sales.find({
      sale_date: { $gte: startDate, $lte: now },
    });

    return salesData;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error retrieving sales history:', error.message);
    throw error;
  }
};

export const SalesServices = {
  createSalesIntoDB,
  getSalesHistoryIntoDB,
};
