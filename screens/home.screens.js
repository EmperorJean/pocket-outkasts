import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fetchOutkastStatsOpensea } from '../tools/outkast.api';
import { NordTheme } from '../components/theme';
import { CommonStyles } from '../styles/common.styles';

const HomeScreen = ({ navigation }) => {
    const [summarySet, setSummarySet] = useState(null);

    useEffect(() => {
        const fetchStatsOs = async () => {
            const stats = await fetchOutkastStatsOpensea();
            setSummarySet(stats);
        };
        fetchStatsOs();
    }, []);


    if (!summarySet) {
        return (
            <View style={CommonStyles.container}>
                <Text style={CommonStyles.header}>Loading data ...</Text>
            </View>
        );
    }

    return (
        <View style={CommonStyles.container}>
            <Text style={CommonStyles.header}>Home</Text>
            <View style={styles.floor}>
                <Text style={styles.label}>Floor price</Text>
                <Text style={styles.textBig}>{summarySet.total.floor_price.toFixed(3)} {summarySet.total.floor_price_symbol}</Text>
                <Text style={styles.label}>{(summarySet.total.floor_price * summarySet.payment_tokens[0].usd_price).toFixed(2)} USD</Text>
            </View>
            <View style={styles.boxContainer}>
                <Text style={styles.label}>Sales/Average Price</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <View style={styles.box}>
                        <Text style={styles.labelSmall}>1 Day</Text>
                        <Text style={styles.textSmall}>{summarySet.intervals[0].sales} Sales</Text>
                        <Text style={styles.textSmall}>{summarySet.intervals[0].average_price.toFixed(3)} {summarySet.total.floor_price_symbol}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.labelSmall}>7 Day</Text>
                        <Text style={styles.textSmall}>{summarySet.intervals[1].sales} Sales</Text>
                        <Text style={styles.textSmall}>{summarySet.intervals[1].average_price.toFixed(3)} {summarySet.total.floor_price_symbol}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.labelSmall}>30 Day</Text>
                        <Text style={styles.textSmall}>{summarySet.intervals[2].sales} Sales</Text>
                        <Text style={styles.textSmall}>{summarySet.intervals[2].average_price.toFixed(3)} {summarySet.total.floor_price_symbol}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.boxContainer}>
                <Text style={styles.label}>Collection Data</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <View style={styles.box}>
                        <Text style={styles.labelSmall}>Owners</Text>
                        <Text style={styles.textMedium}>{summarySet.total.num_owners}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.labelSmall}>Supply</Text>
                        <Text style={styles.textMedium}>{summarySet.total_supply}</Text>
                    </View>
                </View>
            </View>

            <Text style={{color: NordTheme.primary, textAlign: 'center'}}>Data from OpenSea</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    floor: {
        flex: 1,
        backgroundColor: NordTheme.container,
        margin: 5,
        padding: 5,
        borderRadius: 10,
        alignContent: 'center',
        justifyContent: 'center'
    },
    label: {
        color: NordTheme.textGreyed,
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 10,
        textAlign: 'center'
    },
    labelSmall: {
        color: NordTheme.textGreyed,
        fontSize: 14,
        fontWeight: 'bold',
        borderRadius: 10,
        textAlign: 'center'
    },
    textBig: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: NordTheme.text,
        fontSize: 30
    },
    textMedium: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: NordTheme.text,
        fontSize: 25
    },
    textSmall: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: NordTheme.text,
        fontSize: 15
    },
    box: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        margin: 5,
        backgroundColor: NordTheme.container,
        height: 100,
        borderRadius: 10
    },
    boxText: {
        fontSize: 16,
    },
    boxContainer: {
        flex: 1,
        justifyContent: 'center'
    }
});

export default HomeScreen;
