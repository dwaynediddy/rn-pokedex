/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useState, useCallback, useEffect } from "react"
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList, 
  Image 
} from "react-native"

const pokePath = "https://pokeapi.co/api/v2/"
const pokeQuery = "pokemon?limit=151&offset=0"
const firstGenPokemon = `${pokePath}${pokeQuery}`


const App = () => {
  const [firstGen, setfirstGen] = useState([])

  useEffect(() => {
    const fetchFirstGenPokemon = async () => {
      const firstGenPokemonIdsResponse = await fetch(firstGenPokemon)
      const firstGenPokemonIdsBody = await firstGenPokemonIdsResponse.json()

      const firstGen = await Promise.all(
        firstGenPokemonIdsBody.results.map(async (p) => {
          const pDetails = await fetch(p.url)

          return await pDetails.json()
        })
      )

      setfirstGen(firstGen)
    }

    fetchFirstGenPokemon()
  }, [])

  const renderPokemon = ({ item }) => {
    return (
      <View style={styles.pokemonContainer}>
        <Text style={styles.pokemonTitle}>
          {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
        </Text>
        <Image
          style={styles.pokemonSprite}
          source={{
            uri: item.sprites.front_default,
          }}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>1st Gen Pokemon</Text>
      <FlatList data={firstGen} renderItem={renderPokemon} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 60,
  },
  title: {
    fontSize: 38,
    alignSelf: "center",
    marginBottom: 20,
  },
  pokemonContainer: { backgroundColor: "lightgrey", marginTop: 10 },
  pokemonTitle: {
    fontSize: 32,
    alignSelf: "center",
    marginTop: 10,
  },
  pokemonSprite: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
})

export default App
