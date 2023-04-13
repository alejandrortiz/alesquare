// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const transactions = [
  {
    id: 1,
    concept: 'Sushi N1',
    type: 'EXPENSE',
    occurred: '2023-04-13 13:30:00',
    amount: 35.65,
    currency: 'EUR',
    category: 'Food'
  },
  {
    id: 2,
    concept: 'Salary',
    type: 'INCOME',
    occurred: '2023-04-13 13:00:00',
    amount: 1500.1,
    currency: 'EUR',
    category: 'Salary'
  },
  {
    id: 3,
    concept: 'Loan',
    type: 'EXPENSE',
    occurred: '2023-04-12 13:00:00',
    amount: 500.65,
    currency: 'EUR',
    category: 'Loan'
  },
  {
    id: 4,
    concept: 'Lidl',
    type: 'EXPENSE',
    occurred: '2023-04-07 13:00:00',
    amount: 35.65,
    currency: 'EUR',
    category: 'Supermarket'
  },
  {
    id: 5,
    concept: 'Carrefour',
    type: 'EXPENSE',
    occurred: '2023-04-07 13:00:00',
    amount: 67.65,
    currency: 'EUR',
    category: 'Supermarket'
  },
  {
    id: 6,
    concept: 'Lidl',
    type: 'EXPENSE',
    occurred: '2023-04-01 13:00:00',
    amount: 135.65,
    currency: 'EUR',
    category: 'Supermarket'
  },
  {
    id: 7,
    concept: 'Ahorro del mes',
    type: 'TRANSFER',
    occurred: '2023-04-01 12:00:00',
    amount: 10,
    currency: 'EUR',
    category: 'Saving'
  }
]

type Data = {
  id: number,
  concept: string,
  type: string,
  occurred: string,
  amount: number,
  currency: string,
  category: string
}


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  res.status(200).json(transactions)
}
