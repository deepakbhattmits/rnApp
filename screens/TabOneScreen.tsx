import React, { useState } from 'react'
import uuid from 'react-native-uuid'
import {
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'

// import EditScreenInfo from '../components/EditScreenInfo'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { PrivateValueStore } from '@react-navigation/core'

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'TabOne'>) {
  const [text, setText] = useState<string>('')
  const [selected, setSelected] = useState<string[]>([])
  const [items, setItems] = useState<
    { title: string; id: string; completed: boolean }[]
  >([{ title: 'TODO LIST', id: 'label', completed: false }])
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.inputWrapper}>
        <TextInput style={styles.input} onChangeText={setText} value={text} />
        {/* <View style={styles.buttonTodo}> */}
        <TouchableOpacity
          style={styles.buttonTodo}
          disabled={!!!text}
          accessibilityLabel="addtodo"
          onPress={() => {
            if (!!text) {
              let id = `${uuid.v4()}`
              setItems((prevItems) => [
                ...prevItems,
                { title: text, id, completed: false },
              ])
              setText('')
            }
          }}
        >
          <Text style={styles.buttonText}>Add </Text>
        </TouchableOpacity>
        {/* </View> */}
      </SafeAreaView>
      <SafeAreaView>
        <FlatList
          data={items}
          renderItem={({ item }) => {
            return (
              <SafeAreaView style={styles.list} key={item.id}>
                {item.id?.match(/label/i) ? null : (
                  <Pressable
                    onPress={() => {
                      let updatedValue: {
                        id: string
                        title: string
                        completed: boolean
                      } = items?.find((el) => el?.id === item?.id)
                      if (!!updatedValue) {
                        // updatedValue['completed'] = true
                        if (item.id === updatedValue?.id) {
                          setSelected([])
                        }
                        // setItems((prevValue) => [...prevValue, updatedValue])
                      }
                      // console.log('TEST : ', updatedValue?.completed)

                      setItems((prevValue) => [...prevValue])

                      setSelected((prevValue) =>
                        Array.from(new Set([...prevValue, item.id])),
                      )
                    }}
                  >
                    <Ionicons
                      style={styles.checkmark}
                      name="checkmark-circle-outline"
                      size={24}
                      color={selected.includes(item.id) ? 'green' : 'black'}
                    />
                  </Pressable>
                )}
                <Text style={styles.item}>{item.title}</Text>
                {item.id?.match(/label/i) ? null : (
                  <Pressable
                    onPress={() => {
                      const updatedItems = items.filter(
                        (update) => update.id !== item.id,
                      )
                      setItems(updatedItems)
                    }}
                  >
                    <AntDesign
                      style={styles.remove}
                      name="delete"
                      size={24}
                      color="red"
                    />
                  </Pressable>
                )}
              </SafeAreaView>
            )
          }}
        />
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  input: {
    width: '80%',
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
  },
  buttonTodo: {
    width: '20%',
    padding: 10,
    height: 40,
    borderWidth: 1,
    borderColor: 'blue',
    backgroundColor: 'blue',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  checkmark: {
    // backgroundColor: 'grey',
  },
  remove: {
    marginRight: 10,
  },
})
