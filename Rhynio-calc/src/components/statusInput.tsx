import { View, Image, Text, FlatList, ScrollView, Alert } from 'react-native';
import { Input } from '@/components/input';

type staticProps ={
    placeholder:string
    statics:string
    setStatics:(value: string) => void;
    link:string
}
export function StatatsInput({placeholder,statics,setStatics,link}:staticProps){
    return(
        <View className='flex-row items-center w-9/12'>
            <Image
                source={{uri: link }}
                style={{width:'30%', height: '60%', resizeMode:'contain'}}
                />
                <Input>
                    <Input.Field placeholder={placeholder}
                        value={statics}
                        onChangeText={setStatics}
                        keyboardType='numeric'
                        />
                    </Input>
        </View>
    )
}