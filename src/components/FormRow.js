import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

export default function FormRow({ label, error, children }) {
    return (
        <View style={styles.row}>
            <Text style={styles.label}>{label}</Text>
            {children}
            {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    row: { marginBottom: SPACING.lg },
    label: { color: COLORS.text, marginBottom: 6, fontWeight: '600' },
    error: { color: COLORS.danger, marginTop: 6, fontSize: 12 },
});
