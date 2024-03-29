import { Link, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Form, Input, YStack, Button, ToggleGroup, Select } from 'tamagui'
import { useLoginMutation } from '../hooks'

export default function NotFoundScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = useLoginMutation()
  return (
    <>
      <Stack.Screen options={{ title: 'Login!' }} />
      <View margin={10}>
      <Form onSubmit={()=>{
        console.log({ email})
          login.mutate({requestBody:{ email, password}})
      }}>
      <YStack
      minHeight={250}
      overflow="hidden"
     
    >
      {login.isError && <Text>Login Error: {login.error?.message}</Text>}
      {login.isPending && <Text>Logging in....</Text>}
      <Input flex={1} value={email} onChangeText={(e)=>setEmail(e)} autoComplete='email' placeholder={`Email`} />
      <Input flex={1} value={password} onChangeText={(e)=>setPassword(e)} placeholder={`Password`} autoComplete={'current-password'} secureTextEntry />
      <Form.Trigger asChild>
        <Button >Continue</Button>
      </Form.Trigger>
      </YStack>
    </Form>
    <Link href="/register" asChild>
    <Button>
      Switch to Register
    </Button>
      </Link>
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
