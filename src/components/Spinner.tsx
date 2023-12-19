import {ActivityIndicator, StyleSheet, View} from "react-native";
import React from "react";

const colorTheme = '#48217a'

export const Spinner = () => {
    return (
        <View style={styles.whiteOverlay}>
            <ActivityIndicator
                size={30}
                color={colorTheme}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    whiteOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9,
        // backgroundColor: 'rgba(255, 255, 255, 0.8)'
    }
});