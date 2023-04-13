import Head from 'next/head'
import Card from '@/components/Card'
import useUser from '@/hooks/useUser'
import { useEffect, useState } from 'react'

function Table({ transactions }: { transactions: any[] }) {
  const conceptColor = (type: string) => {
    switch (type) {
      case 'EXPENSE':
        return 'text-red-700'
      case 'INCOME':
        return 'text-green-700'
      case 'TRANSFER':
        return 'text-cyan-700'
      default:
        return 'text-gray-800'
    }
  }


  return (
    <div className='relative overflow-x-auto sm:rounded-lg'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Description
            </th>
            <th scope='col' className='px-6 py-3 text-center'>
              Amount
            </th>
            <th scope='col' className='px-6 py-3 text-center'>
              Date
            </th>
            <th scope='col' className='px-6 py-3 text-center'>
              Origin account
            </th>
            <th scope='col' className='px-6 py-3 text-center'>
              Destination account
            </th>
            <th scope='col' className='px-6 py-3 text-center'>
              Category
            </th>
            <th scope='col' className='px-6 py-3 text-center'>
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr
              key={transaction.id}
              className={`border-b ${
                index % 2 === 0
                  ? 'bg-white dark:bg-gray-900'
                  : 'bg-gray-50 dark:bg-gray-800'
              } dark:border-gray-700`}
            >
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                {transaction.concept}
              </th>
              <td className='px-6 py-4 text-center'>
                <span className={conceptColor(transaction.type)}>
                  {transaction.type === 'EXPENSE' && '-'}
                  {transaction.amount} {transaction.currency}
                </span>
              </td>
              <td className='px-6 py-4 text-center'>{transaction.occurred}</td>
              <td className='px-6 py-4 text-center'>Building progress..</td>
              <td className='px-6 py-4 text-center'>Building progress..</td>
              <td className='px-6 py-4 text-center'>
                <span className='bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300'>
                  {transaction.category}
                </span>
              </td>
              <td className='px-6 py-4 text-center'>
                <a
                  href='#'
                  className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function Home() {
  const user = useUser()
  const DEFAULT_AVATAR =
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/2040a-0180-v0492-1100-alteredv2-copia-1671204136.jpg?crop=0.429xw:0.815xh;0.175xw,0&resize=1200:*'

  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    fetch('/api/transactions')
      .then((res) => res.json())
      .then(setTransactions)
  }, [])

  console.log(user)

  return (
    <>
      <Head>
        <title>Home | AleSquare</title>
        <meta
          name='description'
          content='X | Financial, Assistant and Shop list'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='flex w-full relative h-full'>
        <div className='p-10 w-full'>
          <section className='pb-8'>
            <div className='flex items-center space-x-4'>
              <img
                className='w-14 h-14 p-1 rounded-full ring-2 ring-sky-400 dark:ring-sky-400'
                referrerPolicy='no-referrer'
                src={user?.avatar || DEFAULT_AVATAR}
                alt={user?.name}
              />
              <div className='font-medium dark:text-white'>
                <div className='font-bold text-2xl'>
                  Welcome back,{' '}
                  <span className='font-normal'>{user?.name}</span>
                  <span className='pl-2'>👋🏼</span>
                </div>
              </div>
            </div>
          </section>

          <section className='pb-8'>
            <Card className='p-4 sm:p-8'>
              <Table transactions={transactions} />
            </Card>
          </section>
        </div>
      </div>
    </>
  )
}
