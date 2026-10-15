import React from 'react'
import {
    StyleSheet,
    View,
    FlatList,
} from 'react-native'
import { roundCelsius, momentHourOnly, getWeatherIcon } from '../utils/functions'

const Hourly = (data) => {

    const renderRenderItem = (itemData) => {
        return (
            <View>
                <Text>
                {momentHourOnly(itemData.item.dt)}
                </Text>
                <Text>
                {roundCelsius(itemData.item.temp)}
                </Text>
                <Text>
                {getWeatherIcon(itemData.item.weather[0].icon)}
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                keyExtractor={(item, index) => `${index}`}
                data={data}
                renderItem={renderRenderItem}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
    }
})

export default Hourly