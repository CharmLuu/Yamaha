import React from 'react'
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useQuery} from "@apollo/client";
import {CATEGORY_TREE} from "../data/queries/categoryTree";
import {useNavigation} from "@react-navigation/native";

export default function CategoryTreeGrid({id, showImg}) {
    const navigation = useNavigation()

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
            <View
                className={"w-1/2"}
                style={styles.item}
            >
                <TouchableOpacity
                    onPress={() => navigation.navigate("Category", {
                        categoryId: item.id
                    })}
                >
                    {showImg && (
                        <Image
                            resizeMode={"contain"}
                            source={{uri: item.image,}}
                            style={{
                                width: '100%',
                                height: 120
                            }}
                        />
                    )}
                    <Text className={"text-center mt-2 font-bold"}> {item.name}</Text>
                </TouchableOpacity>

            </View>
        );
    };

    return (
        <FlatList
            scrollEnabled={false}
            data={child}
            renderItem={renderItem}
            numColumns={2}
            keyExtractor={(item, index) => index}
            columnWrapperStyle={{
                gap: 10,
                marginBottom: 10,
                // flexGrow: 1
            }}
            // contentContainerStyle={{
            //     backgroundColor: 'pink',
            //     flexGrow: 1
            // }}
        />
    )
}

const styles = StyleSheet.create({
    item:{
        // flexBasis: 50%
    }
})
