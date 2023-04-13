import { ComponentPropsWithoutRef } from 'react'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  name: string
  type?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

export default function Input({
  label,
  name,
  type = 'text',
  placeholder,
  className,
  disabled = false,
  ...props
}: InputProps) {
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
        <input
          id={name}
          name={name}
          type={type}
          disabled={disabled}
          placeholder={placeholder ?? label}
          className={`block py-2.5 px-0 w-full text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-cyan-200 peer ${disabled && 'cursor-not-allowed'} ${className}`}
          {...props}
        />
      </div>
    </div>
  )
}
