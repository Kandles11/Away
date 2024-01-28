import '../tamagui.css'

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { SplashScreen, Stack } from 'expo-router'
import { useColorScheme, AppState, Platform } from 'react-native'
import { TamaguiProvider } from 'tamagui'

import { config } from '../tamagui.config'
import { useFonts } from 'expo-font'
import { useEffect } from 'react'
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager
} from '@tanstack/react-query'
import type { AppStateStatus } from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import { useAppStore } from '../hooks'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

const queryClient = new QueryClient()

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}


onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected)
  })
})

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync()
    }
  }, [interLoaded, interError])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange)
  
    return () => subscription.remove()
  }, [])

  if (!interLoaded && !interError) {
    return null
  }


  return <RootLayoutNav />
}

function RootLayoutNav() {
  const hasHydrated = useAppStore(state => state._hasHydrated);
  
  const colorScheme = useColorScheme()

  if (!hasHydrated) {
    return <p>Loading...</p>
  }


  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </QueryClientProvider>
      </ThemeProvider>
    </TamaguiProvider>
  )
}
