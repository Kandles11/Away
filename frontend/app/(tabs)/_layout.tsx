import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { Text } from 'tamagui'
import { Home, Plane, ScanBarcode, Luggage, UserCircle2} from '@tamagui/lucide-icons'
import { YStack } from 'tamagui'


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {height: 90},
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: '',
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 0,
            backgroundColor: 'transparent',
          },

          tabBarIcon: ( focused ) => {
            return <YStack alignItems="center" >
              <Home />
              <Text fontSize={10}>Home</Text>
              </YStack>;
          },
          headerRight: () => (
            <Link href='/modal' asChild>
              <Pressable>
                <UserCircle2 margin={15}/>
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='travel'
        options={{
          title: '',
          tabBarIcon: () => {
            return <YStack alignItems="center" >
              <Plane/>
              <Text fontSize={10}>Travel</Text>
              </YStack>;
          },
        }}
      />
      <Tabs.Screen
        name='pack'
        options={{
          title: '',
          tabBarIcon: ({ focused }) => {
            return <YStack alignItems="center" >
              <Luggage/>
              <Text fontSize={10}>Pack</Text>
              </YStack>;
          },
        }}
      />
      <Tabs.Screen
        name='scan'
        options={{
          title: '',
          tabBarIcon: () => {
            return <YStack alignItems="center" >
              <ScanBarcode/>
              <Text fontSize={10}>Scan</Text>
              </YStack>;
          },
        }}
      />
    </Tabs>
  )
}
