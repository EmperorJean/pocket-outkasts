// CommonStyles.js
import { StyleSheet } from 'react-native';
import { NordTheme } from '../components/theme';

export const CommonStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: NordTheme.background,
        paddingTop: 20
    },
    header: {
        color: NordTheme.text,
        fontSize: 30,
        textAlign: 'left',
        marginBottom: 10,
        fontWeight: 'bold',
        marginLeft: 10
    }
});
