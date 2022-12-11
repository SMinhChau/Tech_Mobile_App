import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet, ScrollView, TabBarIOSItem } from 'react-native'

const Tabs = (props) => {

    const tab = (a) => {
        console.log('OK')
    }

    return (

        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', paddingTop: 5 }}>

            <ScrollView
                horizontal
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    backgroundColor: props.bgcolor,
                    height: 60
                }}>
                {props.data?.map((data, i) => {
                    return (
                        <TouchableOpacity key={i} onPress={() => props.settabData( data.id )} style={[styles.item, props.tabVal === data.id && styles.itemActive]} >
                            <Text style={[styles.tab, props.tabVal === data.id && styles.textActive]}>{data.title ? data.title : data.name}</Text>
                        </TouchableOpacity>
                    )
                })

                }

            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    tab: {
        color: "#9A9A9D",
        fontSize: 20,
    }, container: {
        flex: 1, flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    item: {
        // backgroundColor: '#d9deea90',
        paddingLeft: 15,
        paddingRight: 15,
        padding: 7,
        marginLeft: 10,
        marginRight: 8,
        marginTop: 'auto',
        marginBottom: 'auto'
    },
    textActive: {

        color: '#5956E9',
    },
    itemActive: {
        borderColor: '#5956E9',
        borderBottomWidth: 2,
    }
})

export default Tabs;