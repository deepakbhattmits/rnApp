import React, { useState } from 'react'
import { StyleSheet, Button } from 'react-native'
import { Text, View } from '../components/Themed'

export default function TabTwoScreen() {
  const [count, setCount] = useState<number>(0)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Counter : {count}</Text>
      <View style={styles.button}>
        <Button
          title="Increase"
          accessibilityLabel="increment"
          onPress={() => {
            setCount((prevState) => prevState + 1)
          }}
          color="blue"
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Decrease"
          accessibilityLabel="decrease"
          disabled={count === 0}
          onPress={() => {
            setCount((prevState) => (prevState > 0 ? prevState - 1 : prevState))
          }}
          color="green"
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    margin: 10,
  },
})
