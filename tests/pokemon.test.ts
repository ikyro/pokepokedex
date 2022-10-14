import { describe, it, expect } from 'vitest'
import {
  getRandomNumber,
  getPokemon,
  getRandomPokemon,
  getQueries,
} from 'lib/pokemon'

const keys = ['sprites', 'id', 'name', 'stats', 'types', 'height', 'weight']

describe.concurrent('pokemos', async () => {
  const { pokemon } = await getRandomPokemon()
  const { queries } = await getQueries()

  it('should be truthy', () => {
    expect(pokemon).toBeTruthy()
    expect(queries).toBeTruthy()
  })

  it('contains keys', () => {
    expect(Object.keys(pokemon)).toEqual(keys)
  })

  it('type cheacking', () => {
    expect(pokemon.sprites).toBeTypeOf('object')
    expect(pokemon.id).toBeTypeOf('number')
    expect(pokemon.name).toBeTypeOf('string')
    expect(Array.isArray(pokemon.stats)).toBe(true)
    expect(Array.isArray(pokemon.types)).toBe(true)
    expect(pokemon.height).toBeTypeOf('number')
    expect(pokemon.weight).toBeTypeOf('number')
  })
})
