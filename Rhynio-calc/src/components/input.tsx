import { ReactNode } from "react"
import { TextInput, View, TextInputProps } from "react-native"
import { colors } from "@/styles/colors"

type InputProps ={
    children:ReactNode
}

export function Input({children}: InputProps){
return (
    <View
    className={(
        'w-full h-16 flex flex-row gap-2 items-center border rounded-lg px-4 bg-zinc-900 border-slate-50'
    )}>
        {children} 
    </View>)
}

function Field({ ...rest }:TextInputProps) {
return (
    <TextInput 
        className="flex-1 text-lg font-bold color-orange-500 "
        placeholderTextColor={colors.gray[200]}
        {...rest}
    />
)
}
Input.Field = Field
