import Card from '@/components/Card'
import Input from '@/components/Input'
import Select from '@/components/Select'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useState } from 'react'

export default function ComposeTransaction() {
  const [concept, setConcept] = useState('')
  const [amount, setAmount] = useState('')
  const [currency, setCurrency] = useState('EUR')
  const [type, setType] = useState('EXPENSE')
  const [occurred, setOccurred] = useState(
    new Date().toISOString().slice(0, 10)
  )
  const [category, setCategory] = useState('')
  const [destinationAccount, setDestinationAccount] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleConceptChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConcept(event.target.value)
  }

  const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value)
  }

  const handleCurrencyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCurrency(event.target.value)
  }

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value)
  }

  const handleOccurredChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOccurred(event.target.value)
  }

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value)
  }

  const handleDestinationAccountChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    setDestinationAccount(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const transaction = {
      concept,
      amount: parseFloat(amount),
      currency,
      type,
      occurred,
      category,
      destinationAccount
    }

    try {
      await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(transaction)
      })
      router.push('/transactions')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>X | AleSquare</title>
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
            <Card className='p-4 sm:p-8'>
              <form onSubmit={handleSubmit}>
                <div className='grid md:grid-cols-3 grid-cols-1 md:gap-10 gap-4'>
                  <div className='grid grid-cols-1 gap-4'>
                    <Input
                      type='text'
                      name='concept'
                      label='Concept'
                      value={concept}
                      onChange={handleConceptChange}
                      required
                    />
                    <Select
                      name='sourceAccount'
                      label='Source Account'
                      disabled
                      options={[]}
                    />
                    <Select
                      name='destinationAccount'
                      label='Destination Account'
                      disabled
                      options={[]}
                    />
                    <Input
                      type='date'
                      name='occurred'
                      label='Occurred'
                      value={occurred}
                      onChange={handleOccurredChange}
                      required
                    />
                  </div>
                  <div className='grid grid-cols-3 gap-4'>
                    <div className='col-span-2'>
                      <Input
                        type='number'
                        name='amount'
                        label='Amount'
                        value={amount}
                        onChange={handleAmountChange}
                        required
                      />
                    </div>
                    <div className='col-span-1'>
                      <Select
                        name='currency'
                        label='Currency'
                        value={currency}
                        onChange={handleCurrencyChange}
                        required
                        options={[
                          { id: 'EUR', label: 'EUR' },
                          { id: 'USD', label: 'USD' }
                        ]}
                      />
                    </div>
                  </div>
                  <div>
                    <Select
                      name='category'
                      label='Category'
                      value={category}
                      onChange={handleCategoryChange}
                      required
                      options={[
                        { id: 'FOOD', label: 'Food' },
                        { id: 'TRANSPORT', label: 'Transport' },
                        { id: 'SHOPPING', label: 'Shopping' },
                        { id: 'ENTERTAINMENT', label: 'Entertainment' },
                        { id: 'HEALTH', label: 'Health' },
                        { id: 'OTHER', label: 'Other' }
                      ]}
                    />
                  </div>
                </div>
                <div className='mt-4'>
                  <button
                    type='submit'
                    className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                  >
                    Save
                  </button>
                </div>
              </form>
            </Card>
          </section>
        </div>
      </div>
    </>
  )
}
