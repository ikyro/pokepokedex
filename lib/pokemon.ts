export type Pokemon = {
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
    base_stat: number
    effort: number
    stat: {
      name: string
      url: string
    }
  }
  types: {
    slot: number
    type: {
      name: string
      url: string
    }
  }[]
  height: number
  weight: number
  id: number
}

export type Records = {
  name: string
  url: string
}

const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getPokemon = async (url: string) => {
  const data = await fetch(url)
  const { sprites, id, name, stats, types, height, weight } = await data.json()

  return {
    sprites,
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

export const getRecords = async () => {
  const url = new URL('https://pokeapi.co/api/v2/pokemon')
  url.searchParams.append('limit', '100000')

  const data = await fetch(url)
  const { results } = await data.json()

  return {
    records: results as Records[],
  }
}
