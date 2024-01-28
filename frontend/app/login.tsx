import { Link, Stack } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { View, Text, Form, Input, YStack, Button, ToggleGroup } from 'tamagui'
import { useLoginMutation, useRegisterMutation } from '../hooks'

const AuthType = {
  LOGIN: 'Login',
  REGISTER: 'Register',
} as const
const INITIAL_AUTH_TYPE = AuthType.REGISTER
export default function NotFoundScreen() {
  const [email, setEmail] = useState('')
  const [name, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const register = useRegisterMutation()
  const login = useLoginMutation()
  const [currentAuthType, setCurrentAuthType] = useState<typeof AuthType[keyof typeof AuthType]>(INITIAL_AUTH_TYPE)
  useEffect(() => {
    console.log({ currentAuthType })
  }, [currentAuthType])
  
  return (
    <>
      <Stack.Screen options={{ title: 'Login!' }} />
      <View margin={10}>
      <Form onSubmit={()=>{
        console.log({ email, name, password})
        if (currentAuthType === AuthType.LOGIN) {
          login.mutate({requestBody:{ email, password}})
        } else {
          register.mutate({requestBody:{name, email, password}})
        }
      }}>
      <YStack
      minHeight={250}
      overflow="hidden"
     
    >
      {register.isError && <Text>Error: {register.error?.message}</Text>}
      {register.isPending && <Text>Loading....</Text>}
      {}
      <ToggleGroup loop={false} disableDeactivation defaultValue={INITIAL_AUTH_TYPE} value={currentAuthType} onValueChange={(d)=>{
        console.log({d})
        const v = d
        setCurrentAuthType(v as any)}
        } type="single">
      <ToggleGroup.Item value={AuthType.LOGIN}><Text>Login</Text></ToggleGroup.Item>
      <ToggleGroup.Item value={AuthType.REGISTER}><Text>Register</Text></ToggleGroup.Item>
    </ToggleGroup>
      {currentAuthType === AuthType.REGISTER&&<Input flex={1} value={name} autoComplete='given-name' onChangeText={(e)=>setUsername(e)} placeholder={`Username`} />}
      <Input flex={1} value={email} onChangeText={(e)=>setEmail(e)} autoComplete='email' placeholder={`Email`} />
      <Input flex={1} value={password} onChangeText={(e)=>setPassword(e)} placeholder={`Password`} autoComplete={currentAuthType===AuthType.LOGIN ? 'current-password' : 'new-password'} secureTextEntry />
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
