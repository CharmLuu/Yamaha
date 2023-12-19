import React from 'react'
import {FlatList, StyleSheet, Text, View} from "react-native";
import {useQuery} from "@apollo/client";
import {CATEGORY_TREE} from "../data/queries/categoryTree";

export default function CategoryTree({id}) {
    const { loading, error, data } = useQuery(CATEGORY_TREE,{
        variables: {
            cateId: id
        }
    });

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error : {error.message}</Text>;

    const child = data?.categoryList[0].children

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.divider, styles.item]}>
                <Text> {item.name}</Text>
            </View>
        );
    };

    return (
        <View>
            <FlatList
                data={child}
                renderItem={renderItem}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    divider:{
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    item:{
        paddingHorizontal: 15,
        paddingVertical: 8
    }
})
