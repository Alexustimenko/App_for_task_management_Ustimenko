import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { COLORS, RADIUS, SPACING } from '../constants/theme';
import { validateTask } from '../utils/validation';
import FormRow from '../components/FormRow';
import { useTasks } from '../storage/TasksContext';

export default function AddTaskScreen() {
    const router = useRouter();
    const { addTask } = useTasks();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date());


    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);


    const [showInline, setShowInline] = useState(false);

    const [errors, setErrors] = useState({});

    const openPicker = () => {
        if (Platform.OS === 'android') {
            setShowDate(true);
        } else {
            setShowInline((v) => !v);
        }
    };

    const onAndroidDateChange = (event, selectedDate) => {
        setShowDate(false);
        if (event?.type !== 'set' || !selectedDate) return;
        const d = new Date(date);
        d.setFullYear(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
        setDate(d);
        setShowTime(true);
    };

    const onAndroidTimeChange = (event, selectedTime) => {
        setShowTime(false);
        if (event?.type !== 'set' || !selectedTime) return;
        const d = new Date(date);
        d.setHours(selectedTime.getHours(), selectedTime.getMinutes(), 0, 0);
        setDate(d);
    };

    const onIOSChange = (_event, selected) => {
        if (selected) setDate(selected);
    };

    const onSave = () => {
        const payload = { title, description, location, datetime: date.getTime() };
        const { valid, errors: e } = validateTask(payload);
        setErrors(e);
        if (!valid) {
            Alert.alert('Please fix the form', Object.values(e).join('\n'));
            return;
        }
        const id = addTask(payload);
        router.replace(`/task/${id}`);
    };

    return (
        <View style={styles.container}>
            <FormRow label="Title" error={errors.title}>
                <TextInput
                    placeholder="Enter title"
                    placeholderTextColor={COLORS.textDim}
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                />
            </FormRow>

            <FormRow label="Description">
                <TextInput
                    placeholder="Enter description"
                    placeholderTextColor={COLORS.textDim}
                    value={description}
                    onChangeText={setDescription}
                    style={[styles.input, { height: 90 }]}
                    multiline
                />
            </FormRow>

            <FormRow label="Date & Time" error={errors.datetime}>
                <Pressable onPress={openPicker} style={styles.pickerBtn}>
                    <Text style={styles.pickerText}>
                        {date.toLocaleString()}
                    </Text>
                </Pressable>

                {/* Android pickers */}
                {Platform.OS === 'android' && showDate && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onAndroidDateChange}
                    />
                )}
                {Platform.OS === 'android' && showTime && (
                    <DateTimePicker
                        value={date}
                        mode="time"
                        display="default"
                        onChange={onAndroidTimeChange}
                    />
                )}


                {Platform.OS === 'ios' && showInline && (
                    <DateTimePicker
                        value={date}
                        mode="datetime"
                        display="inline"
                        onChange={onIOSChange}
                    />
                )}
            </FormRow>

            <FormRow label="Location" error={errors.location}>
                <TextInput
                    placeholder="Enter address"
                    placeholderTextColor={COLORS.textDim}
                    value={location}
                    onChangeText={setLocation}
                    style={styles.input}
                />
            </FormRow>

            <Pressable style={styles.saveBtn} onPress={onSave}>
                <Text style={styles.saveTxt}>Save Task</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: SPACING.lg, gap: SPACING.md, backgroundColor: COLORS.bg },
    input: {
        backgroundColor: COLORS.card, color: COLORS.text, padding: SPACING.md,
        borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.divider,
    },
    pickerBtn: {
        backgroundColor: COLORS.card, padding: SPACING.md, borderRadius: RADIUS.md,
        borderWidth: 1, borderColor: COLORS.divider,
    },
    pickerText: { color: COLORS.text },
    saveBtn: {
        marginTop: SPACING.lg, backgroundColor: COLORS.accent, padding: SPACING.lg,
        borderRadius: RADIUS.lg, alignItems: 'center',
    },
    saveTxt: { color: 'white', fontWeight: '700' },
});
