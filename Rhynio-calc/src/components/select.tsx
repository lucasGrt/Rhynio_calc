import React from 'react';
import { Picker } from '@react-native-picker/picker';

interface DinoSelectProps {
    selectedValue: string;
    onValueChange: (itemValue: string) => void;
    options: string[];
}

const DinoSelect: React.FC<DinoSelectProps> = ({ selectedValue, onValueChange, options }) => {
    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={onValueChange}
            style={{ backgroundColor: '#1F2937', color: 'white', width: 400, borderStyle:'solid', borderColor:"white" }}
        >
            <Picker.Item label="Selecione um hospedeiro" value="" />

            {options.map((option, index) => (
                <Picker.Item key={index} label={option} value={option} />
            ))}
        </Picker>
    );
}

export default DinoSelect;