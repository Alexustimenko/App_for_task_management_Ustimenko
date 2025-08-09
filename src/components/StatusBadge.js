import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, STATUS } from '../constants/theme';

export default function StatusBadge({ status }) {
    const color =
        status === STATUS.COMPLETED ? COLORS.success :
            status === STATUS.IN_PROGRESS ? COLORS.accent :
                status === STATUS.CANCELLED ? COLORS.danger :
                    COLORS.warning;

    return (
        <View style={[styles.badge, { backgroundColor: color + '33', borderColor: color }]}>
            <Text style={[styles.text, { color }]}>{status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    badge: {
        borderWidth: 1,
        paddingHorizontal: SPACING.sm,
        paddingVertical: 4,
        borderRadius: RADIUS.md,
        alignSelf: 'flex-start',
    },
    text: {
        fontSize: 12,
        fontWeight: '600',
    },
});
