import { TouchableOpacity, Text } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
}

export function CustomButton({ title, onPress }: CustomButtonProps) {
  return (
    <TouchableOpacity className="bg-orange-500 p-4 rounded justify-center items-center" onPress={onPress}>
      <Text className="text-lg font-bold">{title}</Text>
    </TouchableOpacity>
  );
}