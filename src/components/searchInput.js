import Ionicons from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TextInput, View, StyleSheet, ScrollView, TabBarIOSItem } from 'react-native'

export const SearchInput = ({style = {},value, onEnter,onChange}) => {

    const navigation = useNavigation()

    return (

        <View style={[styles.container, style]}>
            <Ionicons name="search" size={24} style={styles.icon} onPress={() => navigation.navigate("Checkout")}/>
            <TextInput placeholder="Search" value={value} style={styles.searchInput} onChangeText={onChange} onSubmitEditing={onEnter} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        color: "#000",
        position: 'relative'
    },
    icon: {
        position: 'absolute', 
        left: 20,
        top: 10,
    },  
    searchInput: {
        height: 50,
        borderWidth: 2, 
        borderColor: '#808080',
        borderStyle: 'solid',
        borderRadius: 30,
        paddingLeft: 50,
      
    },
    itemActive: {
        paddingBottom: 10,
        borderWidth: 1.4,
        borderColor: "red"

    }
})
