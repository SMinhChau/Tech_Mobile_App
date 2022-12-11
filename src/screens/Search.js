import React from "react";
import { ActivityIndicator, Dimensions, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import s from '../../styles/mainStyle';
import Tabs from "../components/tab";
import { useEffect, useState } from "react/cjs/react.development";
import apiData from "../../api/getApi";
import Ionicons from "@expo/vector-icons/FontAwesome";
import { SearchInput } from '../components/searchInput';
import { FlatList } from "react-native";
import { PRODUCT_LIST } from './../../assets/product';
import { useNavigation } from "@react-navigation/native";

export default function Search({ route, navigation }) {
    const [products,setProducts]=useState([]);
    const textSearch = route.params?.search;
	const [search, setSearch]=useState(textSearch);
	const [isLoading,setisLoading]=useState(true);

	const categorySearch=(data)=>{
		console.log(data);
	}
	const handleSearch = (text) => {
		navigation.navigate("Search", {
			search: search
		})
	}

    useEffect(() => {
        setisLoading(true)
		setTimeout(() => {
			setProducts(PRODUCT_LIST.filter(x => x.name?.toLowerCase().includes(textSearch?.toLowerCase())))
			setisLoading(false)
		}, 200)
    }, [textSearch])

    return (
        <ScrollView style={{ padding: 30 }}>
            <View style={[s.row, s.spacedBw, s.alItsCnt, { paddingTop: 0, paddingBottom: 25 }]}>
                <Ionicons name="arrow-left" size={20} style={{ flex: 0.2 }} onPress={() => navigation.navigate("Home")} />
				<SearchInput style={{flex: 0.8}}  value={search} onChange={text => setSearch(text)} onEnter={handleSearch}/>
            </View>
            
           <View style={{marginTop: 20, marginBottom: 20}}>
           <Text style={[s.f24, s.textCenter]}>
                 -- {textSearch} --
                </Text>
                    <Text style={[s.f24, s.textCenter]}>
                  Found 6 result
                </Text>
            </View>
            {isLoading ?
			<View style={[s.fl1,s.tocnt,s.mgtp20]}>
				<ActivityIndicator size={'small'} />
			</View>
			:  products.length ? <FlatList   
            data={products}
            renderItem={({item }, index) => <ItemShop item={item} index={index} navigation={navigation} />}
            keyExtractor={(item) => item.id}
            numColumns={2}
            /> : <ItemNotFound />
            }
            <View style={{height: 20}} />
        </ScrollView>
    )
}

const ItemNotFound =() => {

    return <View style={{alignItems: 'center',}}>
            <Image source={require('../../assets/not-found.png')} style={{width: 300, height: 200}}/>
            <Text style={[s.b, s.f24, s.textCenter]}>
            Item not found
                </Text>
                <Text style={[s.f20, s.textCenter]}>
                Try a more generic search term or try looking for alternative products.
                </Text>
           
    </View>
}

const ItemShop = ({item, index, navigation}) => {

	return <View style={[ s.border, {width: '42%', height: 300, margin: 15, borderRadius: 15, paddingTop: 20, marginTop: index % 2 != 0 ? 40: 0}]}>
			<TouchableOpacity  onPress={() => navigation.navigate('Detail', {product: item})}>
		<View style={[s.alItsCnt, { height: 150}]}>
			<Image source={{uri: item.image}}style={{width: 100, height: 150, resizeMode: 'contain'}} />
		</View>
		<View>
			<Text style={[s.b, s.textCenter, {fontSize: 20, marginTop: 20}]}>{item.name}</Text>
			<Text  style={[s.b, s.textCenter, {fontSize: 20, color: '#5956E9', marginTop: 10}]}>From ${item.price}</Text>
		</View>
        </TouchableOpacity>
	</View>
}
