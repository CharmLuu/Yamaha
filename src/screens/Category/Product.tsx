import React from "react";
import {View, Text, Image, FlatList, TouchableOpacity} from "react-native";
import {useQuery} from "@apollo/client";
import {CATEGORY_PRODUCT} from "../../data/queries/categoryProduct";
import {Spinner} from "../../components/Spinner";
import {formatPrice} from "../../utils/price";
import {styleMessage} from "../../theme";
import {useNavigation} from "@react-navigation/native";

export default function Product({id}) {
    const navigation = useNavigation();
    const { loading, error, data } = useQuery(CATEGORY_PRODUCT,{
        variables: {
            cateId: id
        }
    });

    if (loading) return <Spinner />
    if (error) return <Text>Error : {error.message}</Text>;

    const child = data?.products?.items;

    const renderItem = ({ item }) => {
        const checkDiscount = item.price_range.maximum_price.discount.percent_off
        return (
            <View className={"w-1/2"}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ProductDetail", {
                        productSku: item.sku
                    })}
                >
                    <Image
                        resizeMode={"contain"}
                        source={{uri: item.image.url}}
                        style={{
                            width: '100%',
                            height: 120
                        }}
                    />
                    <Text className={"my-2"}>{item.name}</Text>
                    <View className={"flex-row flex-wrap gap-2 items-center"}>
                        <Text className={"text-base font-bold"}>
                            {formatPrice(item.price_range.maximum_price.final_price)}
                        </Text>
                        {checkDiscount > 0 && (
                            <Text className={"bg-pink-600 color-white text-xs px-1 py-[2px] rounded-xl"}>
                                {`-${Math.ceil(checkDiscount)}%`}
                            </Text>
                        )}
                    </View>

                    {checkDiscount > 0 && (
                        <Text className={"text-gray-400 line-through"}>
                            {formatPrice(item.price_range.maximum_price.regular_price)}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
        );
    };

    return(
        <View>
            {child.length > 0 ? (
                <FlatList
                    scrollEnabled={false}
                    data={child}
                    renderItem={renderItem}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    columnWrapperStyle={{
                        gap: 10,
                        marginBottom: 10,
                    }}
                />
            ) : (
                <View style={[styleMessage.container, styleMessage.containerWarning]}>
                    <Text style={styleMessage.textWarning}>Products are updating ...</Text>
                </View>
            )}
        </View>
    )
}