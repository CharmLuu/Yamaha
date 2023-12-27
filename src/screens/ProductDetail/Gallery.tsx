import React, {useState} from "react";
import {View, Text, Image, FlatList, TouchableOpacity} from "react-native";

export default function Gallery({child}) {
    const [mainImage, setMainImage] = useState(child.image.url);

    const renderGallery = ({ item }) => {
        return(
            <TouchableOpacity
                className={"px-1"}
                onPress={() => setMainImage(item.url)}
            >
                <Image
                    resizeMode={"cover"}
                    source={{uri: item.url}}
                    style={{
                        width: 80,
                        height: 120
                    }}
                />
            </TouchableOpacity>
        )
    }

    return(
        <View>
            <Image
                // resizeMode={"contain"}
                source={{uri: mainImage}}
                style={{
                    width: '100%',
                    height: 400
                }}
            />
            {child.media_gallery.length > 1 &&(
                <FlatList
                    horizontal
                    data={child.media_gallery}
                    renderItem={renderGallery}
                    keyExtractor={(item, index) => index}
                    contentContainerStyle={{
                        paddingVertical: 15,
                        paddingLeft: 10
                    }}

                />
            )}
        </View>
    )
}