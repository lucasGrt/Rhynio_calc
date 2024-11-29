import React, { useState } from 'react';
import { Input } from '@/components/input';
import { View, Image, ScrollView, Alert } from 'react-native';
import { CustomButton } from '@/components/button';
import DinoSelect from '@/components/select';
import { StatatsInput } from '@/components/statusInput'

const options = [
"Brontosaurus",
"Carcharodontosaurus",
"Giganotosaurus",
"Paracer",
"Diplodocus",
"Magmasaur",
"Rex",
"Spinosaur",
"Reaper",
"Quetzal",
"Yutyrannus",
"RockDrake",
"Wyvern",
"Mammoth",
"WoollyRhino",
"Gasbags",
"Morellatops",
"Triceratops",
];

const dinoDrag: { [key: string]: Number } = {
    "Brontosaurus": 650,
    "Carcharodontosaurus": 650,
    "Giganotosaurus": 650,
    "Paracer": 600,
    "Diplodocus": 575,
    "Magmasaur": 550,
    "Rex": 550,
    "Spinosaur": 550,
    "Reaper": 525,
    "Quetzal": 500,
    "Yutyrannus": 500,
    "RockDrake": 425,
    "Wyvern": 416,
    "Mammoth": 400,
    "WoollyRhino": 375,
    "Gasbags": 300,
    "Morellatops": 300,
    "Triceratops": 300,
};


const Index: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [link,setLink]= useState('')
    const [damage, setDamage] = useState('');
    const [stamina, setStamina] = useState('');
    const [oxygen, setOxygen] = useState('');
    const [health, setHealth] = useState('');
    const [weight, setWeight] = useState('');
    const [food, setFood] = useState('');
    const [care, setCare ] = useState('')
    const [rhyniolvl, setRhyniolvl] =useState('')


    const [resultados, setResultados] = useState({
        dano: '',
        stamina: '',
        oxigenio: '',
        vida: '',
        peso: '',
        comida: '',
    });

    const handleClear = () => {
        setSelectedValue('');
        setLink('');
        setDamage('');
        setStamina('');
        setOxygen('');
        setHealth('');
        setWeight('');
        setFood('');
        setCare('');
        setRhyniolvl('');
        setResultados({
            dano: '',
            stamina: '',
            oxigenio: '',
            vida: '',
            peso: '',
            comida: '',
        });
    }

    const handleCalculate = () => {

        const DM = damage? (damage) : '0' ;
        const ST = stamina? (stamina) : '0' ;
        const OX = oxygen? (oxygen) : '0' ;
        const HP = health? (health) : '0' ;
        const WH = weight? (weight) : '0' ;
        const FD = food? (food) : '0' ;
        const NC = care? (care) : '0' ;
        const NR = rhyniolvl? (rhyniolvl) : '0' ;
        const HS = dinoDrag[selectedValue]
        const link = `https://www.dododex.com/media/creature/${selectedValue.toLowerCase()}.png`
        setLink(link)

        if(!selectedValue){
            setLink("")
            return(Alert.alert("Hospedeiro","Seleciona o hospedeiro utilizado"))
        }

        const CD = ((NC * 0.2) * 0.75 + 0.25);
        const SP = ((HS - 300) / 350 * 0.75 + 0.25);
        const RH = ((25 + ((NR / 5) * 2.5)) / 100);

        const SB = CD * SP * RH

         setResultados({
            dano:(Math.floor(parseFloat(DM)* SB)).toString(),
            stamina: (Math.floor(parseFloat(ST) * SB)).toString(),
            oxigenio: (Math.floor(parseFloat(OX) * SB)).toString(),
            vida: (Math.floor(parseFloat(HP) * SB)).toString(),
            peso: (Math.floor(parseFloat(WH) * SB)).toString(),
            comida: (Math.floor(parseFloat(FD) * SB)).toString(),
        });

        console.log(`${CD} -- ${SP} -- ${RH} -- ${SB*100}%`)

    }

    return (
        <ScrollView>
        <View className=" items-center justify-start mt-5 p-4 gap-5">
            <View className='w-full justify-center items-center gap-10'>

                <View className='w-10/12 h-80 justify-center items-center'>
                    <Image
                      source={selectedValue ?{uri:`https://www.dododex.com/media/creature/${selectedValue.toLowerCase()}.png`} : {uri:'https://www.dododex.com/media/creature/rhyniognatha.png'}}
                      style={{width:'100%', height: '100%', resizeMode:'contain'}}
                    />
                </View>
                <View>
                    <DinoSelect
                        selectedValue={selectedValue}
                        onValueChange={setSelectedValue}
                        options={options}
                    />
                </View>
            </View>
            <View className='flex-row justify-center gap-3 w-full '>
                <View className='w-52 gap-3 '>
                    <View className='flex-row items-center w-9/12'>
                        <Image
                        source={{uri:'https://static.wikia.nocookie.net/ark_ptbr_gamepedia/images/3/37/Dano_f%C3%ADsico.png'}}
                        style={{width:'30%', height: '60%', resizeMode:'contain'}}
                        />
                        <Input
                        >
                        <Input.Field placeholder='Dano' 
                        value={damage}
                        onChangeText={setDamage}
                        keyboardType='numeric'
                        />
                        </Input>
                    </View>

                    <StatatsInput placeholder="Estamina" statics={stamina} setStatics={setStamina} link='https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/8/8d/Stamina.png'/>

                    <StatatsInput placeholder='Oxigenio' statics={oxygen} setStatics={setOxygen} link='https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/1/19/Oxygen.png'/>

                    <View className='flex-row items-center w-9/12'>
                        <Image
                        source={{uri:'https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/0/0c/House.png'}}
                        style={{width:'30%', height: '60%', resizeMode:'contain'}}
                        />
                        <Input>
                        <Input.Field placeholder='N° cuidados'
                        value={care}
                        onChangeText={(value)=>
                        {
                            const numericValue = parseInt(value)
                            if (numericValue >= 1 && numericValue <= 5) {
                                setCare(value);
                            } else if (!numericValue) {
                                setCare(''); 
                            } else if (numericValue > 5) {
                                setCare('5'); 
                        }}}
                        keyboardType='numeric'
                        />
                        </Input>
                    </View>
                </View>
                <View className='w-52 gap-3'>

                    <StatatsInput placeholder="Vida" statics={health} setStatics={setHealth} link='https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/9/94/Health.png'/>

                    <StatatsInput placeholder="Peso" statics={weight} setStatics={setWeight} link='https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/6/6f/Weight.png'/>

                
                    <View className='flex-row items-center w-9/12'>
                        <Image
                        source={{uri:'https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/c/c6/Food.png'}}
                        style={{width:'30%', height: '60%', resizeMode:'contain'}}
                        />
                        <Input>
                        <Input.Field placeholder='Comida' 
                        value={food}
                        onChangeText={setFood}
                        keyboardType='numeric'
                        />
                        </Input>
                    </View>
                    <View className='flex-row items-center w-9/12'>
                        <Image
                        source={{uri:'https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/3/34/Levelup.png'}}
                        style={{width:'30%', height: '60%', resizeMode:'contain'}}
                        />
                        <Input>
                        <Input.Field placeholder='Lvl Rhynio'
                        value={rhyniolvl}
                        onChangeText={(value)=>
                            {
                                const numericValue = parseInt(value)
                                if (numericValue >= 1 && numericValue <= 150) {
                                    setRhyniolvl(value);
                                } else if (!numericValue) {
                                    setRhyniolvl(''); 
                                } else if (numericValue > 150) {
                                    setRhyniolvl('150'); 
                            }}}
                        keyboardType='numeric'
                        />
                        </Input>
                    </View>
                </View>
            </View>
            <View className='w-44 gap-3'>
            </View>
            <View className='flex-row gap-5'>
                <CustomButton title='Calcular' onPress={handleCalculate}  />
                <CustomButton title='Limpar' onPress={handleClear}  />
            </View>
            <View className='flex-row justify-start items-center w-full h-64 bg-slate-300 rounded-lg  border'>
                <View className='w-5/12 h-full  justify-center items-center mb-6'>
                    <Image
                    source={{uri: `https://www.dododex.com/media/creature/rhyniognatha.png`}}
                    style={{width:'90%', height: '80%', resizeMode:'contain'}}
                    />
                </View>
                <View className='w-20 h-20  justify-center items-center ml-[-110] mt-[100] bg-gray-500 rounded-full'>
                    
                    <Image
                    source={link? {uri: `${link}`}:{uri:'https://ark.wiki.gg/images/thumb/c/c5/Rhynio_Pheromone.png/30px-Rhynio_Pheromone.png'}}
                    style={link? {width:'90%', height: '100%', resizeMode:'contain'}:{width:'80%', height: '70%', resizeMode:'contain'}}
                    />
                </View>
               <View className='flex-row h-full w-7/12 justify-start items-center ml-6'>
                    <View className='w-1/2 gap-1'>
                        <View className='flex-row items-center w-9/12'>
                            <Image
                            source={{uri:'https://static.wikia.nocookie.net/ark_ptbr_gamepedia/images/3/37/Dano_f%C3%ADsico.png'}}
                            style={{width:'30%', height: '60%', resizeMode:'contain'}}
                            />
                            <Input>
                                <Input.Field value={resultados.dano}  editable={false} />
                            </Input>
                        </View>
                        <View className='flex-row items-center w-9/12'>
                        <Image
                        source={{uri:'https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/8/8d/Stamina.png'}}
                        style={{width:'30%', height: '60%', resizeMode:'contain'}}
                        />
                        <Input>
                        <Input.Field value={resultados.stamina} editable={false} />
                        </Input>
                    </View>
                    <View className='flex-row items-center w-9/12'>
                        <Image
                        source={{uri:'https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/1/19/Oxygen.png'}}
                        style={{width:'30%', height: '60%', resizeMode:'contain'}}
                        />
                        <Input>
                        <Input.Field value={resultados.oxigenio} editable={false}/>
                        </Input>
                    </View>
                    </View>
                    <View className='w-1/2 gap-1'>
                    <View className='flex-row items-center w-9/12'>
                        <Image
                        source={{uri:'https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/9/94/Health.png'}}
                        style={{width:'30%', height: '60%', resizeMode:'contain'}}
                        />
                        <Input >
                        <Input.Field value={resultados.vida} editable={false}/>
                        </Input>
                    </View>
                    <View className='flex-row items-center w-9/12'>
                        <Image
                        source={{uri:'https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/6/6f/Weight.png'}}
                        style={{width:'30%', height: '60%', resizeMode:'contain'}}
                        />
                        <Input>
                        <Input.Field value={resultados.peso} editable={false} />
                        </Input>
                        </View>
                        <View className='flex-row items-center w-9/12'>
                        <Image
                        source={{uri:'https://static.wikia.nocookie.net/arksurvivalevolved_gamepedia/images/c/c6/Food.png'}}
                        style={{width:'30%', height: '60%', resizeMode:'contain'}}
                        />
                        <Input>
                        <Input.Field value={resultados.comida} editable={false}/>
                        </Input>
                    </View>
                    </View>
                </View>
               
            </View>
        </View>
        </ScrollView>
    );
};

export default Index;