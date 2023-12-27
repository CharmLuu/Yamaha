import React, {useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity, FlatList} from "react-native";
import {useQuery} from "@apollo/client";
import {PRODUCT_DETAIL} from "../data/queries/productDetail";
import {Spinner} from "../components/Spinner";
import {formatPrice} from "../utils/price";
import Gallery from "./ProductDetail/Gallery";
import Options from "./ProductDetail/Options";

const ProductDetail = ({
                           route: {
                               params: { productSku },
                           },
                       }) => {
    const { loading, error, data } = useQuery(PRODUCT_DETAIL, {
        variables: {
            sku: productSku
        }
    });

    if (loading) return <Spinner />
    if (error) return <Text>Error : {error.message}</Text>;
    const child = data?.products?.items[0];
    const checkDiscount = data?.products?.items[0].price_range.maximum_price.discount.percent_off






    return(
        <ScrollView
            contentContainerStyle={{
                paddingBottom: 30
            }}
        >
            <Gallery child={child} />
            <View className={"px-[15px]"}>
                <Text className={"mb-2"}>{child.name}</Text>
                <Text className={"text-gray-600 mb-2"}>SKU: {child.sku}</Text>
                <View className={"flex-row flex-wrap gap-2 items-center"}>
                    <Text className={"text-xl font-bold"}>
                        {formatPrice(child.price_range.maximum_price.final_price)}
                    </Text>
                    {checkDiscount > 0 && (
                        <Text className={"bg-pink-600 color-white text-xs px-1 py-[2px] rounded-xl"}>
                            {`-${Math.ceil(checkDiscount)}%`}
                        </Text>
                    )}
                </View>
                {checkDiscount > 0 && (
                    <Text className={"text-gray-400 line-through"}>
                        {formatPrice(child.price_range.maximum_price.regular_price)}
                    </Text>
                )}

                {child.__typename == "ConfigurableProduct" && (
                    <Options child={child} />
                )}
            </View>

        </ScrollView>
    )
}

export default ProductDetail;