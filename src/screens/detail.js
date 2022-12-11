import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import s from '../../styles/mainStyle';
import Ionicons from "@expo/vector-icons/FontAwesome";
import {useState} from "react";

export default function Detail({navigation, route}) {
  const product = route.params?.product
  const [item,setItem] = useState(product)
 
//   {id:0,name:"Fjallraven",image:'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',des:'Visit site',desDetail:'Available when you purchase any new iPhone, iPad, iPod Touch, Mac or Apple TV, £4.99/month after free trial.', price: 12}
 console.log('====================================');
 console.log(product);
 console.log('====================================');
  return (
    <View  style={[s.fl1,s.alItsCnt,{justifyContent:'space-between',padding:20}]}>
        <View style={{width:'90%',alignItems:'flex-start'}}>
            <TouchableOpacity>
                <Ionicons name="arrow-left" size={25} color="black" onPress={() => navigation.goBack()} />
            </TouchableOpacity>
        </View>
        <Image source={{uri:item.image}} style={{width:'50%',height:'35%',resizeMode: 'cover'}}/>
        <View style={{}}>
            <Text style={[s.b,s.textCenter,{fontSize: 28}]}>{item.name}</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between',marginTop:20}}>
                <TouchableOpacity style={[s.alItsCnt,{flexDirection:'row', width:110, marginRight: 10,height:40,borderRadius:10,borderColor:'blue',borderWidth:1,justifyContent:'center'}]}>
                    <View style={{width:20,height:20,borderRadius:20,backgroundColor:'#5956E9',marginRight:5}}></View>
                    <Text style={[s.b]}>Sky Blue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.alItsCnt,{flexDirection:'row', width:110, marginRight: 10,height:40,borderRadius:10,borderColor:'blue',borderWidth:1,justifyContent:'center'}]}>
                    <View style={{width:20,height:20,borderRadius:20,backgroundColor:'#da74f1',marginRight:5}}></View>
                    <Text style={[s.b]}>Rose Gold</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[s.alItsCnt,{flexDirection:'row', width:110, marginRight: 10,height:40,borderRadius:10,borderColor:'blue',borderWidth:1,justifyContent:'center'}]}>
                    <View style={{width:20,height:20,borderRadius:20,backgroundColor:'#09e883',marginRight:5}}></View>
                    <Text style={[s.b]}>Green</Text>
                </TouchableOpacity>
            </View>
            <Text style={[s.b,{fontSize: 18, color: 'black', marginTop: 20}]}>{item.des}</Text>
            <Text style={[{fontSize: 17, color: '#868686',marginTop: 10}]}>{item.desDetail}</Text>
            <View style={{alignItems: 'flex-start',marginTop: 10}}>
                <Text style={[s.b,{ color: '#5956E9'}]}>Full description <Ionicons name='arrow-right' size={20} /></Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop: 30}}>
                <Text style={[{fontSize: 20, color: '#5956E9'}]}>Total</Text>
                <Text style={[s.b, {fontSize: 20, color: '#5956E9'}]}>$ {item.price}</Text>
            </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Basket", {product: item})} style={[s.toCenter,s.alItsCnt,{backgroundColor:'#5956E9',width:'90%',height:55, borderRadius:20}]}>
            <Text style={[s.f22,s.b,{color:'white'}]}>Add to basket</Text>
        </TouchableOpacity>
    </View>
  );
}

