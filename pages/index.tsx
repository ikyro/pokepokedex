import type { InferGetStaticPropsType, NextPage } from 'next'
import Image from 'next/image'
import { Autocomplete } from 'components/Autocomplete'
import { getRandomPokemon, getQueries } from 'lib/pokemon'

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  pokemon,
  queries,
}) => {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-black p-5'>
      <h1 className='text-xl text-white'>{pokemon.name}</h1>

      <Image
        src={
          pokemon.sprites?.front_default ??
          pokemon.sprites?.back_default ??
          '/placeholder.png'
        }
        alt='random pokemon'
        width={100}
        height={100}
      />
      <Autocomplete autocomplete={queries} random={pokemon} />
    </div>
  )
}

export const getStaticProps = async () => {
  const { pokemon } = await getRandomPokemon()
  const { queries } = await getQueries()

  return {
    props: {
      pokemon,
      queries,
    },
  }
}

export default Home
