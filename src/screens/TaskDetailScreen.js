import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTasks } from '../storage/TasksContext';
import { COLORS, RADIUS, SPACING, STATUS } from '../constants/theme';
import StatusBadge from '../components/StatusBadge';
import { formatDateTime } from '../utils/format';

export default function TaskDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { tasks, updateTask, removeTask } = useTasks();

    const task = useMemo(() => tasks.find((t) => t.id === id), [tasks, id]);

    if (!task) {
        return (
            <View style={styles.container}>
                <Text style={styles.dim}>Task not found.</Text>
            </View>
        );
    }

    const setStatus = (status) => updateTask(task.id, { status });

    const onDelete = () =>
        Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', style: 'destructive', onPress: () => { removeTask(task.id); router.back(); } },
        ]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <StatusBadge status={task.status} />
            <Text style={styles.label}>When</Text>
            <Text style={styles.value}>{formatDateTime(task.datetime)}</Text>
            <Text style={styles.label}>Where</Text>
            <Text style={styles.value}>{task.location || '-'}</Text>
            <Text style={styles.label}>Description</Text>
            <Text style={styles.value}>{task.description || '-'}</Text>

            <View style={styles.row}>
                <Pressable style={[styles.btn, { backgroundColor: '#1f2937' }]} onPress={() => setStatus(STATUS.IN_PROGRESS)}>
                    <Text style={styles.btnTxt}>In Progress</Text>
                </Pressable>
                <Pressable style={[styles.btn, { backgroundColor: '#064e3b' }]} onPress={() => setStatus(STATUS.COMPLETED)}>
                    <Text style={styles.btnTxt}>Completed</Text>
                </Pressable>
            </View>
            <View style={styles.row}>
                <Pressable style={[styles.btn, { backgroundColor: '#7c2d12' }]} onPress={() => setStatus(STATUS.CANCELLED)}>
                    <Text style={styles.btnTxt}>Cancelled</Text>
                </Pressable>
                <Pressable style={[styles.btn, { backgroundColor: COLORS.danger }]} onPress={onDelete}>
                    <Text style={styles.btnTxt}>Delete</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: SPACING.lg, gap: 10, backgroundColor: COLORS.bg },
    title: { color: COLORS.text, fontSize: 22, fontWeight: '800' },
    label: { color: COLORS.textDim, marginTop: 16, fontSize: 12, letterSpacing: 0.3 },
    value: { color: COLORS.text, fontSize: 15, marginTop: 4 },
    row: { flexDirection: 'row', gap: SPACING.md, marginTop: SPACING.lg },
    btn: {
        flex: 1, padding: SPACING.md, borderRadius: RADIUS.md, alignItems: 'center',
        borderWidth: 1, borderColor: COLORS.divider,
    },
    btnTxt: { color: 'white', fontWeight: '700' },
    dim: { color: COLORS.textDim },
});
