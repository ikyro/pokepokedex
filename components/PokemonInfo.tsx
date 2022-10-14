import { motion } from 'framer-motion'
import { Pokemon } from 'lib/pokemon'
import Image from 'next/image'

export const PokemonInfo = ({ selected }: { selected: Pokemon }) => {
  return (
    <div className='mt-2 h-72 w-60 bg-[#222224] p-2.5 text-center text-white'>
      <h1 className='text-lg'>{selected.name}</h1>
      <h2 className='text-xs'>{`#${selected.id}`}</h2>
      <Image
        src={
          selected.sprites?.front_default ??
          selected.sprites?.back_default ??
          '/placeholder.png'
        }
        alt={`pokemon from image`}
        width={100}
        height={100}
      />
      <Image
        src={
          selected.sprites?.back_default ??
          selected.sprites?.front_default ??
          '/placeholder.png'
        }
        alt={`pokemon back image`}
        width={100}
        height={100}
      />
      <span className='text-ms'>width: {selected.weight}</span>
      <span className='text-ms ml-4'>height: {selected.weight}</span>

      <ul className='mt-4 flex flex-wrap items-center justify-center gap-2'>
        {selected.types?.map(({ name }) => (
          <motion.li
            className='rounded-sm bg-[#ee1515] py-1 px-2 text-center text-sm'
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            key={name}
          >
            {name}
          </motion.li>
        ))}
      </ul>
    </div>
  )
}
