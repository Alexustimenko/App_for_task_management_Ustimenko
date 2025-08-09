import React from 'react';
import { Stack } from 'expo-router';
import { TasksProvider } from '../src/storage/TasksContext';
import { COLORS } from '../src/constants/theme';

export default function RootLayout() {
    return (
        <TasksProvider>
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: '#0b1224' },
                    headerTintColor: COLORS.text,
                    headerTitleStyle: { fontWeight: '700' },
                    contentStyle: { backgroundColor: COLORS.bg },
                }}
            >
                <Stack.Screen name="index" options={{ title: 'Tasks' }} />
                <Stack.Screen name="add" options={{ title: 'Add Task' }} />
                <Stack.Screen name="task/[id]" options={{ title: 'Task Details' }} />
            </Stack>
        </TasksProvider>
    );
}
