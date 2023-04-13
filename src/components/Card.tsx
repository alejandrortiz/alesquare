type props = {
  className?: string
  children: React.ReactNode
  header?: string
}

export default function Card({ className, children, header }: props) {
  return (
    <article
      className={` w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ${className}`}
    >
      {header && (
        <header>
          <h1 className='text-lg font-light mb-2'>{header}</h1>
        </header>
      )}
      {children}
    </article>
  )
}
