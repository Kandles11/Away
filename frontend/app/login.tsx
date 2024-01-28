import { Link, Stack } from 'expo-router'
import { useState } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Form, Input, YStack, Button } from 'tamagui'
import { useRegisterMutation } from '../hooks'

export default function NotFoundScreen() {
  const [email, setEmail] = useState('')
  const [name, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const register = useRegisterMutation()
  return (
    <>
      <Stack.Screen options={{ title: 'Login!' }} />
      <View margin={10}>
      <Form onSubmit={()=>{
        console.log({username: name, password})
        register.mutate({requestBody:{name, email, password}})
      }}>
      <YStack
      minHeight={250}
      overflow="hidden"
     
    >
      <Input flex={1} value={name} onChangeText={(e)=>setUsername(e)} placeholder={`Username`} />
      <Input flex={1} value={email} onChangeText={(e)=>setEmail(e)} placeholder={`Email`} />
      <Input flex={1} value={password} onChangeText={(e)=>setPassword(e)} placeholder={`Password`} />
      <Form.Trigger asChild>
        <Button >Continue</Button>
      </Form.Trigger>
      </YStack>
    </Form>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
})
