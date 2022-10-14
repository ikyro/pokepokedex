export type Pokemon = Partial<{
  name: string
  sprites: {
    back_default?: string
    back_female?: string
    back_shiny?: string
    back_shiny_female?: string
    front_default?: string
    front_female?: string
    front_shiny?: string
    front_shiny_female?: string
  }
  stats: {
    name: string
    url: string
  }[]
  types: {
    name: string
    url: string
  }[]
  height: number
  weight: number
  id: number
}>

type Stats = Partial<{
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}>

type Types = Partial<{
  slot: number
  type: {
    name: string
    url: string
  }
}>

export type Queries = {
  name: string
  url: string
}

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getPokemon = async (url: string) => {
  const data = await fetch(url)
  const {
    sprites: {
      back_default,
      back_female,
      back_shiny,
      back_shiny_female,
      front_default,
      front_female,
      front_shiny,
    },
    id,
    name,
    height,
    weight,
    ...res
  } = await data.json()
  const stats = (res?.stats as Stats[]).map(({ stat }) => ({ ...stat }))
  const types = (res?.types as Types[]).map(({ type }) => ({ ...type }))

  return {
    sprites: {
      back_default,
      back_female,
      back_shiny,
      back_shiny_female,
      front_default,
      front_female,
      front_shiny,
    },
    id,
    name,
    stats,
    types,
    height,
    weight,
  } as Pokemon
}

export const getRandomPokemon = async () => {
  const url = `https://pokeapi.co/api/v2/pokemon/${getRandomNumber(0, 905)}`
  const pokemon = await getPokemon(url)

  return {
    pokemon,
  }
}

export const getQueries = async () => {
  const url = new URL('https://pokeapi.co/api/v2/pokemon')
  url.searchParams.append('limit', '100000')

  const data = await fetch(url)
  const { results } = await data.json()

  return {
    queries: results as Queries[],
  }
}
