
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import { COLORS } from '../constants/theme';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#0b1224' },
                headerTintColor: COLORS.text,
                headerTitleStyle: { fontWeight: '700' },
                contentStyle: { backgroundColor: COLORS.bg },
            }}
        >
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Tasks' }} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Add Task' }} />
            <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: 'Task Details' }} />
        </Stack.Navigator>
    );
}
