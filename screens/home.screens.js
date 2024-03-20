import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { fetchOutkastStats, fetchOutkastStatsOpensea } from '../tools/outkast.api';
import { NordTheme } from '../components/theme';
import { CommonStyles } from '../styles/common.styles';

const LoginScreen = ({ navigation }) => {
    const buttons = ['Top Holders', 'Top Lava Holders', 'Top Nova Holders', "Top Purplerain Holders", 'Top Female Holders '];
    const [statsData, setStatsData] = useState(null);
    const [dataSet, setDataSet] = useState(null);
    const [summarySet, setSummarySet] = useState(null);
    const [selectedButton, setSelectedButton] = useState(buttons[0]);

    const handleButtonPress = (buttonIndex, data) => {
        setSelectedButton(buttons[buttonIndex]);
        setDataSet(data);
    };

    const formatOwnerText = (owner) => {
        if (owner.length > 7) {
            return `${owner.substring(0, 4)}...${owner.substring(owner.length - 4)}`;
        }
        return owner;
    };


    useEffect(() => {
        const fetchStats = async () => {
            const stats = await fetchOutkastStats();
            setStatsData(stats);
            setDataSet(stats.top_holders)
        };
        const fetchStatsOs = async () => {
            const stats = await fetchOutkastStatsOpensea();
            setSummarySet(stats);
        };
        fetchStats();
        fetchStatsOs();
    }, []);

    
    if (!statsData || !summarySet) {
        return (
            <View style={CommonStyles.container}>
                <Text style={CommonStyles.header}>Loading data ...</Text>
            </View>
        );
    }

    return (
        <View style={CommonStyles.container}>
            <Text style={CommonStyles.header}>Summary</Text>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Floor price: {summarySet.total.floor_price.toFixed(3)} {summarySet.total.floor_price_symbol}</Text>
                <Text style={styles.summaryText}>Owners: {summarySet.total.num_owners}</Text>
                <Text style={styles.summaryText}>1 day sales: {summarySet.intervals[0].sales} | avg price: {summarySet.intervals[0].average_price.toFixed(3)} ETH</Text>
                <Text style={styles.summaryText}>7 day sales: {summarySet.intervals[1].sales} | avg price: {summarySet.intervals[1].average_price.toFixed(3)} ETH</Text>
                <Text style={styles.summaryText}>30 days sales: {summarySet.intervals[2].sales} | avg price: {summarySet.intervals[2].average_price.toFixed(3)} ETH</Text>
                <Text style={styles.holderText}>Data provided by OpenSea</Text>
            </View>
            <Text style={CommonStyles.header}>{selectedButton}</Text>
            <Text style={styles.creditText}>   Data provided by @JayK {'\n'}</Text>
            <FlatList
                style={styles.holderContainerParent}
                data={dataSet}
                renderItem={({ item, index }) => (
                    <View style={styles.holderContainer}>
                        <Text style={styles.holderText}>{index + 1}: {formatOwnerText(item.owner)}</Text>
                        <Text style={styles.levelText}>Count: {item.total_owned}</Text>
                    </View>
                )}
            />
            <View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}
                    style={styles.buttonNavContainer}>
                    <TouchableOpacity onPress={() => handleButtonPress(0, statsData.top_holders)}
                        style={selectedButton === buttons[0] ? styles.buttonNavSel : styles.buttonNav}>
                        <Text style={styles.buttonText}>{buttons[0]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(1, statsData.top_holders_lava)}
                        style={selectedButton === buttons[1] ? styles.buttonNavSel : styles.buttonNav}>
                        <Text style={styles.buttonText}>{buttons[1]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(2, statsData.top_holders_nova)}
                        style={selectedButton === buttons[2] ? styles.buttonNavSel : styles.buttonNav}>
                        <Text style={styles.buttonText}>{buttons[2]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(3, statsData.top_holders_purplerain)}
                        style={selectedButton === buttons[3] ? styles.buttonNavSel : styles.buttonNav}>
                        <Text style={styles.buttonText}>{buttons[3]}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleButtonPress(4, statsData.top_holders_female)}
                        style={selectedButton === buttons[4] ? styles.buttonNavSel : styles.buttonNav}>
                        <Text style={styles.buttonText}>{buttons[4]}</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    creditText: {
        color: NordTheme.text,
    },
    holderContainer: {
        backgroundColor: NordTheme.container,
        borderRadius: 15,
        padding: 10,
        marginBottom: 10
    },
    holderText: {
        color: NordTheme.primary,
        fontSize: 16,
    },
    levelText: {
        color: NordTheme.secondary,
        fontSize: 14,
    },
    buttonNavContainer: {
        backgroundColor: NordTheme.back
    },
    buttonNav: {
        backgroundColor: NordTheme.container,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderColor: NordTheme.secondary,
        borderWidth: 1,
    },
    buttonNavSel: {
        backgroundColor: NordTheme.secondary,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    buttonText: {
        padding: 5,
        margin: 5,
        color: NordTheme.text
    },
    holderContainerParent: {
        backgroundColor: NordTheme.background,
        flex: 2
    },
    summary: {
        backgroundColor: NordTheme.container,
        margin: 5,
        padding: 5,
        borderRadius: 10
    },
    summaryText: {
        color: NordTheme.text,
        fontSize: 16,
        margin: 2,
        fontWeight: 'bold',
        borderRadius: 10,
    },
});

export default LoginScreen;
