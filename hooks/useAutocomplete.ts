import { useEffect, useState } from 'react'
import { Records } from 'lib/pokemon'
import { useForm } from 'react-hook-form'

type Inputs = {
  autocomplete: string
}

export const useAutocomplete = (initial: Records[]) => {
  const [query, setQuery] = useState<Records[]>(initial)
  const { register, watch } = useForm<Inputs>()

  useEffect(() => {
    const subscription = watch(({ autocomplete }) => {
      const filtered = initial.filter(({ name }) =>
        name.toLowerCase().includes(autocomplete?.toLowerCase() as string)
      )

      setQuery(filtered)
      console.log({ autocomplete, filtered })
    })

    return () => subscription.unsubscribe()
  }, [watch, initial])

  return {
    register,
    query,
  }
}
