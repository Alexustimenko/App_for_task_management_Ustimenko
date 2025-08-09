import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import StatusBadge from './StatusBadge';
import { formatDateTime } from '../utils/format';

export default function TaskCard({ task, onPress }) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.8 }]}>
            <View style={styles.row}>
                <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
                <StatusBadge status={task.status} />
            </View>
            <Text style={styles.datetime}>{formatDateTime(task.datetime)}</Text>
            {task.location ? <Text style={styles.location}>📍 {task.location}</Text> : null}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.card,
        borderRadius: RADIUS.lg,
        padding: SPACING.lg,
        gap: 6,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
    title: { color: COLORS.text, fontSize: 16, fontWeight: '700', flex: 1 },
    datetime: { color: COLORS.textDim, fontSize: 13 },
    location: { color: COLORS.textDim, fontSize: 13 },
});
