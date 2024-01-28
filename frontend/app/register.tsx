import { Link, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Form, Input, YStack, Button, ToggleGroup, Select } from 'tamagui'
import { useRegisterMutation } from '../hooks'

export default function RegisterScreen() {
  const [email, setEmail] = useState('')
  const [name, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const register = useRegisterMutation()
  
  return (
    <>
      <Stack.Screen options={{ title: 'Register' }} />
      <View margin={10}>
      <Form onSubmit={()=>{
        console.log({ email, name})
        register.mutate({requestBody:{name, email, password}})
      }}>
      <YStack
      minHeight={250}
      overflow="hidden"
     
    >
      {register.isError && <Text>Registration Error: {register.error?.message}</Text>}
      {register.isPending && <Text>Registering....</Text>}
      
      <Input flex={1} value={name} autoComplete='given-name' onChangeText={(e)=>setUsername(e)} placeholder={`Username`} />
      <Input flex={1} value={email} onChangeText={(e)=>setEmail(e)} autoComplete='email' placeholder={`Email`} />
      <Input flex={1} value={password} onChangeText={(e)=>setPassword(e)} placeholder={`Password`} autoComplete={'new-password'} secureTextEntry />
      <Form.Trigger asChild>
        <Button >Register</Button>
      </Form.Trigger>
      </YStack>
    </Form>
    <Link href="/login">Switch to Login</Link>
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
