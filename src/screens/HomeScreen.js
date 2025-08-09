import React, { useMemo, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTasks } from '../storage/TasksContext';
import { COLORS, RADIUS, SPACING, DEFAULT_SORT } from '../constants/theme';
import TaskCard from '../components/TaskCard';
import SortBar from '../components/SortBar';
import { compareByStatus } from '../utils/format';

export default function HomeScreen() {
    const router = useRouter();
    const { tasks, loading } = useTasks();
    const [sortMode, setSortMode] = useState(DEFAULT_SORT);

    const sorted = useMemo(() => {
        const copy = [...tasks];
        if (sortMode === 'STATUS') copy.sort(compareByStatus);
        else copy.sort((a, b) => b.createdAt - a.createdAt);
        return copy;
    }, [tasks, sortMode]);

    return (
        <View style={styles.container}>
            <SortBar mode={sortMode} onChange={setSortMode} />
            {loading ? (
                <Text style={styles.dim}>Loading…</Text>
            ) : sorted.length === 0 ? (
                <Text style={styles.dim}>No tasks yet. Tap + to add one.</Text>
            ) : (
                <FlatList
                    data={sorted}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={{ height: SPACING.md }} />}
                    renderItem={({ item }) => (
                        <TaskCard task={item} onPress={() => router.push(`/task/${item.id}`)} />
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}

            <Pressable style={styles.fab} onPress={() => router.push('/add')}>
                <Text style={styles.fabText}>＋</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, padding: SPACING.lg, gap: SPACING.md, backgroundColor: COLORS.bg,
    },
    dim: { color: COLORS.textDim },
    fab: {
        position: 'absolute', right: SPACING.lg, bottom: SPACING.lg,
        backgroundColor: COLORS.accent, borderRadius: RADIUS.xl, width: 56, height: 56,
        alignItems: 'center', justifyContent: 'center', elevation: 4,
    },
    fabText: { color: 'white', fontSize: 30, lineHeight: 30 },
});
