import '@/styles/global.css'
import { View, StatusBar } from 'react-native'
import { Slot } from 'expo-router'
import { Loading } from '@/components/loading'
import {
    useFonts,
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
} from '@expo-google-fonts/roboto'


export default function Layout(){

    const [fontLoaded] = useFonts({
        Roboto_700Bold,
        Roboto_500Medium,
        Roboto_400Regular,
    })

    if (!fontLoaded){
        return <Loading/>
    }

    return (
        <View className='flex-1 bg-green-500'>
            <StatusBar
            barStyle='light-content'
            backgroundColor="transparent"
            translucent
            />
            <Slot />
        </View>
    ) 
    
    
}