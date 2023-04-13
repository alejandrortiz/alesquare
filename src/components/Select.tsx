import { ComponentPropsWithoutRef } from 'react'

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  label?: string
  name: string
  className?: string
  options: SelectOptionProps[]
  disabled?: boolean
}

interface SelectOptionProps {
  id: string
  value?: string
  label: string
}

export default function Select({
  label,
  name,
  className,
  options,
  disabled = false,
  ...props
}: SelectProps) {
  return (
    <div className='flex flex-col'>
      {label && (
        <label
          htmlFor={name}
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          {label}
        </label>
      )}
      <div className='mt-1'>
        <select
          id={name}
          name={name}
          disabled={disabled}
          className={`block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-cyan-200 peer ${
            disabled && 'cursor-not-allowed'
          } ${className}`}
          {...props}
        >
          {options.map((option: SelectOptionProps) => (
            <option key={option.id} value={option.value || option.id}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
