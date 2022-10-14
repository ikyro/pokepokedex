import { useAutocomplete } from 'hooks/useAutocomplete'
import { getPokemon, Pokemon, Queries } from 'lib/pokemon'
import { useState } from 'react'
import { PokemonInfo } from 'components/PokemonInfo'

export const Autocomplete = ({
  autocomplete,
  random,
}: {
  autocomplete: Queries[]
  random: Pokemon
}) => {
  const { query, register } = useAutocomplete(autocomplete)
  const [selected, setSelected] = useState(random)

  return (
    <>
      <input
        type='text'
        className='w-60 rounded-sm bg-[#222224] p-2 text-center text-white outline-none lg:w-72 lg:p-3'
        placeholder='Search Pokemon'
        autoComplete='off'
        {...register('autocomplete')}
      />
      <div className='grid grid-rows-2 gap-2 lg:grid-cols-2 lg:grid-rows-none'>
        <ul className='scroll mt-2 flex max-h-72 w-60 flex-col gap-2 overflow-auto bg-[#222224] p-2 text-white lg:h-72 lg:w-72 lg:p-3'>
          {query.map(({ name, url }) => (
            <li
              className='w-full rounded-sm bg-[#ee1515] py-1 text-center text-sm'
              onClick={async () => {
                const pokemon = await getPokemon(url)
                setSelected(pokemon)
              }}
              key={name}
            >
              <button>{name}</button>
            </li>
          ))}
        </ul>
        <PokemonInfo selected={selected} />
      </div>
    </>
  )
}
