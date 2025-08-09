import 'react-native-get-random-values';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import { STATUS } from '../constants/theme';

const STORAGE_KEY = '@tasks_v1';

const TasksContext = createContext(null);

export function TasksProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        (async () => {
            try {
                const raw = await AsyncStorage.getItem(STORAGE_KEY);
                if (raw) setTasks(JSON.parse(raw));
            } catch (e) {
                console.warn('Failed to load tasks', e);
                Alert.alert('Storage error', 'Could not load saved tasks.');
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    useEffect(() => {
        if (loading) return;
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch(() =>
            Alert.alert('Storage error', 'Could not save tasks.')
        );
    }, [tasks, loading]);

    const addTask = (data) => {
        const now = Date.now();
        const newTask = {
            id: uuidv4(),
            title: data.title.trim(),
            description: data.description?.trim() ?? '',
            datetime: data.datetime,
            location: data.location?.trim() ?? '',
            status: STATUS.TODO,
            createdAt: now,
            updatedAt: now,
        };
        setTasks((prev) => [newTask, ...prev]);
        return newTask.id;
    };

    const updateTask = (id, patch) => {
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, ...patch, updatedAt: Date.now() } : t
            )
        );
    };

    const removeTask = (id) => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const value = useMemo(
        () => ({ tasks, loading, addTask, updateTask, removeTask }),
        [tasks, loading]
    );

    return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
}

export function useTasks() {
    const ctx = useContext(TasksContext);
    if (!ctx) throw new Error('useTasks must be used within TasksProvider');
    return ctx;
}
