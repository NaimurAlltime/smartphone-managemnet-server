import mongoose from 'mongoose';
import { Sales } from './sales.model';
import { TSales } from './sales.interface';
import { Smartphone } from '../smartphone/smartphone.model';

const createSalesIntoDB = async (payload: TSales) => {
  // check product ID is valid or not
  const product = await Smartphone.findById(payload.productId).select(
    'quantity name productImage price',
  );

  if (!product) {
    throw new Error('Invalid product id!');
  }

  // check product quantity is available or not
  const currentQuantity = product.quantity;
  const futureQuantity = currentQuantity - payload.quantity;

  if (currentQuantity > 0 && futureQuantity < 0) {
    throw new Error('Product quantity is not sufficient!');
  }

  // set product name and image, so that if the product will delete then sale info can be consistent
  const saleProductInfo = {
    productName: product.name,
    productPrice: product.price,
    quantity: payload.quantity,
    buyerName: payload.buyerName,
    saleDate: payload.saleDate,
  };

  // start session
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const result = await Sales.create([saleProductInfo], { session });

    if (!result[0]) {
      throw new Error('Sales product is not successfull!');
    }

    // decrement quantity from product
    const decrementedProduct = await Smartphone.findByIdAndUpdate(
      payload.productId,
      { quantity: futureQuantity },
      { new: true, runValidators: true, session },
    );

    if (!decrementedProduct) {
      throw new Error('Decrement product quantity is not successfull!!');
    }

    await session.commitTransaction();

    return result[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    await session.abortTransaction();
    throw new Error(err.message);
  } finally {
    await session.endSession();
  }
};

const getSalesHistoryIntoDB = async (query: Record<string, unknown>) => {
  const historyType = query?.historyType;
  // create pipeline array
  const pipeline = [];

  pipeline.push({
    $addFields: {
      month: { $month: { $toDate: '$saleDate' } },
      year: { $year: { $toDate: '$saleDate' } },
    },
  });

  if (historyType === 'weekly') {
    pipeline.push({
      $group: {
        _id: {
          week: { $week: { $toDate: '$saleDate' } },
          year: '$year',
        },
        totalSale: { $sum: 1 },
        sales: {
          $push: '$$ROOT',
        },
      },
    });
  } else if (historyType === 'daily') {
    pipeline.push({
      $group: {
        _id: {
          day: { $dayOfMonth: { $toDate: '$saleDate' } },
          month: '$month',
          year: '$year',
        },
        totalSale: { $sum: 1 },
        sales: {
          $push: '$$ROOT',
        },
      },
    });
  } else if (historyType === 'monthly') {
    pipeline.push({
      $group: {
        _id: {
          month: '$month',
          year: '$year',
        },
        totalSale: { $sum: 1 },
        sales: {
          $push: '$$ROOT',
        },
      },
    });
  } else if (historyType === 'yearly') {
    pipeline.push({
      $group: {
        _id: {
          year: '$year',
        },
        totalSale: { $sum: 1 },
        sales: {
          $push: '$$ROOT',
        },
      },
    });
  }

  pipeline.push({
    $project: {
      totalSale: 1,
      month: 1,
      'sales.productId': 1,
      'sales.quantity': 1,
      'sales.buyerName': 1,
      'sales.saleDate': 1,
      'sales.productName': 1,
      'sales.productPrice': 1,
    },
  });

  pipeline.push({
    $sort: {
      '_id.month': -1,
      '_id.day': -1,
      '_id.week': -1,
      '_id.year': -1,
    } as Record<string, 1 | -1>,
  });

  const result = await Sales.aggregate(pipeline);

  return result;
};

export const SalesServices = {
  createSalesIntoDB,
  getSalesHistoryIntoDB,
};
