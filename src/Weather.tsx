import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import moment from 'moment';

const Weather = (props: any) => {
    const { cityMain } = props;
    const [weatherData, setWeatherData] = useState<any>();
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchWeather();
    }, []);
    const fetchWeather = async () => {
        setLoading(true);
        try {
            const apiKey = 'c59e118ef3c96fadee64e2dd90b87056';
            const city = cityMain;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            if (response.ok) {
                setWeatherData(data);
                setLoading(false);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setLoading(false);
        }
    };
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View style={styles.main}>
                    <View style={styles.flexView}>
                        <Text style={styles.cityText}>{moment().format('DD/MM/YYYY')}</Text>
                        <View>
                            <Text style={styles.cityText}>{cityMain}</Text>
                            <View style={styles.flexView1}>
                                <Image source={{
                                    uri:
                                        `https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@4x.png`
                                }}
                                    style={styles.iconStyle} />
                                <Text style={[styles.cityText, { alignSelf: 'center', fontWeight: '400' }]}>{weatherData?.main?.temp}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.flexView1, { justifyContent: 'space-between' }]}>
                        <TouchableOpacity onPress={() => fetchWeather()}>
                            <Image source={require('./refresh.png')} style={styles.refImg} />
                        </TouchableOpacity>
                        <Text style={[styles.cityText, { alignSelf: 'center', fontWeight: '400' }]}>{weatherData?.weather[0]?.description}</Text>
                    </View>
                </View>
            </SafeAreaView>
            {loading && <View style={styles.activityIndicator}>
                <ActivityIndicator size={'large'} color={'#0000ff'} />
                <Text style={styles.textLoading}>Loading</Text>
            </View>}
        </View>
    )
}

export default Weather

const styles = StyleSheet.create({
    activityIndicator: {
        height: '100%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'gray',
        alignItems: 'center'
    },
    textLoading: {
        color: 'white',
        fontSize: 15,
        marginLeft: 10,
        fontWeight: '400'
    },
    container: {
        flex: 1,
        backgroundColor: 'rgba(245, 253, 255, 1)'
    },
    cityText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20
    },
    main: {
        flex: 1,
        marginHorizontal: 15
    },
    flexView: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flexView1: {
        // backgroundColor: 'red'
        flexDirection: 'row'
    },
    iconStyle: { height: 40, width: 40 },
    refImg: {
        height: 15,
        width: 15
    }
})