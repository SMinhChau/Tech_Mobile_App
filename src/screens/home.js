
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {View, ScrollView, ActivityIndicator, Text, Image, TouchableOpacity} from 'react-native';
import Tabs from '../components/tab.js';
import s from '../../styles/mainStyle';
import getApi from '../../api/getApi';
import Ionicons from '@expo/vector-icons/FontAwesome';
import { SearchInput } from '../components/searchInput.js';
import { TabView, SceneMap } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native';
import { PRODUCT_LIST } from '../../assets/product.js';

export default function Home() {
	
	const [products,setProducts]=useState([]);
	const [allproduct,setAllProduct]=useState(PRODUCT_LIST);
	const [isLoading,setisLoading]=useState(true);
	const [popcat,setpopCat]=useState([
		{"id":4,"name":"All","icon":"building-o","colors":"#155C9E"},
		{"id":0,"name":"Wearable","icon":"building-o","colors":"#155C9E"},
		{"id":1,"name":"Laptops","icon":"tshirt","colors":"#155C9E"},
		{"id":2,"name":"Phones","icon":"mobile","colors":"#155C9E"},
		{'id':3, "name":'Drones',Icon:'desktop',colors:"#d4d4d4"},
	  ])

	const [activeCat, setActiveCat]=useState(4);
	const [search, setSearch]=useState("");

    useEffect(()=>{
		setisLoading(true)
		setTimeout(() => {
			if(activeCat == 4) {
				setProducts(PRODUCT_LIST)
			} else {
				setProducts(PRODUCT_LIST.filter(pr => pr.type == activeCat))
			}
			setisLoading(false)
		}, 300)
    },[activeCat])

	const categorySearch=(data)=>{
		console.log(data);
	}
    const navigation = useNavigation()
    
	const handleSearch = (text) => {
		navigation.navigate("Search", {
			search: search
		})
	}

  return (
    	<ScrollView style={{padding: 30}}>
			<View style={[s.row, s.spacedBw, s.alItsCnt, {paddingTop: 0, paddingBottom: 25}]}>
				<Ionicons name="bars" size={20} style={{flex: 0.2}} onPress={() => navigation.navigate("Menus")} />
				<SearchInput style={{flex: 0.8}} onChange={text => setSearch(text)} onEnter={handleSearch}/>
			</View>
			<View style={ {paddingTop: 25, paddingBottom: 25}}>
				<Text style={[s.f28, s.b]}>
					Order online {"\n"}collect in store
				</Text>
			</View>
		{isLoading ?
			<View style={[s.fl1,s.tocnt,s.mgtp20]}>
				<ActivityIndicator size={'small'} />
			</View>
			:
			<>
			<Tabs
				data={popcat}
				bgcolor="transparent" 
				tabVal={activeCat}
				settabData={setActiveCat}
			/>
				<View style={{marginTop: 20}}>
			<ScrollView horizontal >
					{products?.map(item => <ItemHome item={item} />)}
			</ScrollView>
			<View style={{alignItems: 'flex-end',marginTop: 20}}>
				<Text style={{ color: '#5956E9'}}>View more <Ionicons name='arrow-right' size={20} /></Text>
			</View>
		</View>
			</>
		}
		</ScrollView>
      
  );
}

const ItemHome = ({item}) => {

	const navigation = useNavigation();

	return <View style={[ s.border, {width: 200, height: 300, margin: 15, borderRadius: 15, paddingTop: 20}]}
		>
			<TouchableOpacity  onPress={() => navigation.navigate('Detail', {product: item})}>
			<View style={[s.alItsCnt, {width: 200, height: 150}]}>
				<Image  source={{uri: item.image}} style={{width: 150, height: 150, resizeMode: 'contain'}} />
			</View>
			<View>
				<Text style={[s.b, s.textCenter, {fontSize: 20, marginTop: 20}]}>{item.name}</Text>
				<Text  style={[s.textCenter, {fontSize: 17, color: '#868686', marginTop: 10}]}>{item.des}</Text>
				<Text  style={[s.b, s.textCenter, {fontSize: 20, color: '#5956E9', marginTop: 10}]}>$ {item.price}</Text>
			</View>
			</TouchableOpacity>
	</View>
}
