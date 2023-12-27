import {ScrollView,} from "react-native";
import React from "react";
import Product from "./Category/Product";

const Category = ({
                             route: {
                                 params: { categoryId },
                             },
                         }) => {


    return (
        <ScrollView className={"py-6 px-[15px]"}>
            <Product id={categoryId}/>
        </ScrollView>
    )
}
export default Category;