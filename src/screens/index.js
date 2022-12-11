import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import Icon from '@expo/vector-icons/Ionicons'
import s from '../../styles/mainStyle';

export default function Index({navigation}) {
  return (
    <View  style={[s.fl1,s.tocnt,s.alItsCnt,s.bgMain]}>
        <Text style={[s.f65,s.b,{color:'white'}]}>Find your{'\n'}Gadget</Text>
        <Image style={{width:'90%',height:400}} source={require('../../assets/index1.png')}></Image>
        <TouchableOpacity onPress={()=>{navigation.navigate('SignIn')}} style={[s.mgtp20,s.alItsCnt,s.toCenter,{width:'90%',backgroundColor:'white', height:60, borderRadius:20}]}>
          <Text style={[s.f24,s.b,{color:'blue'}]}>Get stated</Text>
        </TouchableOpacity>
    </View>
  );
}

