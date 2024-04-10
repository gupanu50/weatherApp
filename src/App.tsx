import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Weather from './Weather'

const App = () => {
  const city = 'Noida';
  return <Weather cityMain={city} />
}

export default App

const styles = StyleSheet.create({})