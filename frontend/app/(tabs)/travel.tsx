import { Text, View, ZStack } from 'tamagui'
import { H1, H2, H3, H4, H5, H6, Heading, XStack, Image, Paragraph, Button, ScrollView, YStack } from 'tamagui'
import { Card } from 'tamagui'
import type { CardProps } from 'tamagui'
import { Link, Tabs } from 'expo-router'
import { useUserQuery } from '../../hooks'




export default function TabTwoScreen() {
    const { data, isLoading, isError, error } = useUserQuery()
  if (isLoading) {
    return <Text>Loading...</Text>
  }
  if (isError) {
    return <Text>Error: {error?.message}</Text>
  }
    return (
        <View flex={1} alignItems='center'>
            <YStack alignItems="center" margin={5}>
                <YStack alignItems="left">
                    <H4>Hey {data?.name},</H4>
                    <H2>Let's Travel!</ H2>
                </YStack>
            </YStack>
            <DemoCard />
        </View>
    )
}

export function DemoCard(props: CardProps) {
    return (
        <Card elevate size="$4" bordered {...props} margin={18}
            width={250}
            height={300}
            scale={0.9}
            hoverStyle={{ scale: 0.925 }}
            pressStyle={{ scale: 0.875 }} >
            <Card.Header padding >
                <YStack alignItems='center'>
                    <H4>San Diego</H4>
                    <H6>Sun 7:30AM</H6>
                </YStack>

            </Card.Header>
            <YStack alignItems='center'>
                <Image  borderRadius={300} width="50%"
                    height="65%" source={{ width: 150, height: 150, uri: "https://images.unsplash.com/photo-1566353820592-c81f362cbd46?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}} />
            </YStack>            
            <Card.Footer padded>
                <XStack flex={1} />
                <Link href='/modal' asChild>
                    <Button borderRadius="$10">View Info</Button>
                </Link>

            </Card.Footer>
            <Card.Background>


            </Card.Background>
        </Card>
    )
}