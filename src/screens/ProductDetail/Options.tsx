import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import {styleButton, styleForm} from "../../theme";
import i18n from "../../utils/i18n";
import {isNonEmptyValue} from "../../utils";

export type SelectedConfigurableProductOptions = { [key: string]: number };

export default function Options({child}){
    const [
        selectedConfigurableProductOptions,
        setSelectedConfigurableProductOptions,
    ] = useState<SelectedConfigurableProductOptions>({});
    const [checkValid, setCheckValid] = useState(false)
    console.log(selectedConfigurableProductOptions)

    useEffect(() => {
        child.configurable_options.forEach(item => {
            setSelectedConfigurableProductOptions(prevState => ({
                ...prevState,
                [item.label]: null,
            }));
        })
    }, []);

    const checkOption = Object.keys(selectedConfigurableProductOptions).filter(key => {
        return selectedConfigurableProductOptions[key] === null
    })
    console.log(checkOption)

    const handleSelectedConfigurableOptions = ( optionCode, valueIndex) => {
        setSelectedConfigurableProductOptions(prevState => ({
            ...prevState,
            [optionCode]: valueIndex,
        }));
    };

    const findSelectedProductVariant = () => {
        let variants = child.variants;
        const content = Object.values(selectedConfigurableProductOptions);
        content.forEach(code => {
            variants = variants.filter(variant => {
                return variant.attributes.find(attr => attr.value_index === code)
            })

        })
        return variants?.[0].product.sku
    }

    const handleAddToCart = () => {
        if(checkOption.length > 0){
            setCheckValid(true)
            console.log('fail nhe')
        } else{
            console.log(findSelectedProductVariant())
        }

    };

    return(
        <View>
            {child.configurable_options.map((val, ind) => {
                const labelOption = val.label
                return(
                    <View key={ind}>
                        <Text className={"mb-2 font-semibold"}>{labelOption}</Text>
                        <View className={"flex-row flex-wrap gap-2 mb-4"}>
                            {val.values.map((value, index) => (
                                <TouchableOpacity
                                    className={"border border-gray-400 rounded min-w-[40px] items-center px-2 py-1"}
                                    key={String(value.value_index)}
                                    onPress={() => handleSelectedConfigurableOptions(labelOption, value.value_index)}
                                    style={
                                        Object.values(selectedConfigurableProductOptions).includes(value.value_index)?
                                        styles.activeOption : null
                                    }
                                >
                                    <Text
                                        style={
                                            Object.values(selectedConfigurableProductOptions).includes(value.value_index)?
                                                styles.activeOptionLabel : null
                                        }
                                    >{value.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {
                            checkValid && checkOption.find(lb => lb === labelOption) && (
                                <Text style={styleForm.errorText}>{i18n.t('requireField')}</Text>
                            )
                        }
                    </View>
                )
            })}
            <TouchableOpacity
                style={styleButton.btnTheme}
                onPress={handleAddToCart}
            >
                <Text style={styleButton.btnTextTheme}>Add to cart</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    activeOption:{
        backgroundColor: 'red',

    },
    activeOptionLabel:{
        color: 'white'
    }
})