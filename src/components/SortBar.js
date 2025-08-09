import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

export default function SortBar({ mode, onChange }) {
    return (
        <View style={styles.wrap}>
            {[
                { key: 'DATE_ADDED', label: 'By Date Added' },
                { key: 'STATUS', label: 'By Status' },
            ].map((opt) => (
                <Pressable
                    key={opt.key}
                    onPress={() => onChange(opt.key)}
                    style={[styles.btn, mode === opt.key && styles.btnActive]}
                >
                    <Text style={[styles.txt, mode === opt.key && styles.txtActive]}>
                        {opt.label}
                    </Text>
                </Pressable>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    wrap: { flexDirection: 'row', gap: SPACING.sm, marginBottom: SPACING.md },
    btn: {
        paddingHorizontal: SPACING.md,
        paddingVertical: 8,
        borderRadius: RADIUS.md,
        backgroundColor: COLORS.card,
        borderWidth: 1,
        borderColor: COLORS.divider,
    },
    btnActive: { borderColor: COLORS.accent, backgroundColor: '#1f2937' },
    txt: { color: COLORS.textDim, fontSize: 13, fontWeight: '600' },
    txtActive: { color: COLORS.text },
});
