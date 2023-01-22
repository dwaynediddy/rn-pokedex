/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const pokeIndex = 'https://pokeapi.co/api/v2/'
const pokeQuery = 'pokemon?limit=151&offset=0'
const firstGenPokemon = `${pokeIndex}${pokeQuery}`

function App() {
  const [ firstGen, setFirstGen ] = useState([])

  useEffect(() => {
    const fetchFirstGenPokemon = async() => {
      const res = await fetch(firstGenPokemon)
      setFirstGen(await res.json())
    }
    fetchFirstGenPokemon()
  },[])

  console.log(firstGen)

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text>hello world</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
})

export default App;
