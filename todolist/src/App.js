import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState('');
  const [goals, setGoals] = useState([]);
  const [editId, setEditId] = useState(null);

  const addOrEditGoalHandler = () => {
    if (enteredGoal.trim().length === 0) {
      Alert.alert('Oops!', 'Please enter something first');
      return;
    }

    if (editId) {
      setGoals((currentGoals) =>
        currentGoals.map((g) =>
          g.id === editId ? { ...g, text: enteredGoal } : g
        )
      );
      setEditId(null);
    } else {
      setGoals((currentGoals) => [
        {
          id: Math.random().toString(),
          text: enteredGoal,
          completed: false,
        },
        ...currentGoals,
      ]);
    }
    setEnteredGoal('');
  };

  const deleteGoalHandler = (id) => {
    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    );
  };

  const toggleCompleteHandler = (id) => {
    setGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === id
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  };

  const startEditHandler = (item) => {
    setEnteredGoal(item.text);
    setEditId(item.id);
  };

  const GoalItem = ({ item }) => (
    <View style={styles.goalCard}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          item.completed && styles.checkedBox,
        ]}
        onPress={() => toggleCompleteHandler(item.id)}
      >
        {item.completed && <Text style={styles.checkMark}>✓</Text>}
      </TouchableOpacity>

      <Text
        style={[
          styles.goalText,
          item.completed && styles.completedText,
        ]}
      >
        {item.text}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => startEditHandler(item)}
          style={styles.editBtn}
        >
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => deleteGoalHandler(item.id)}
          style={styles.deleteBtn}
        >
          <Text style={styles.actionText}>Del</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Tasks</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.inputSection}
      >
        <View style={styles.inputRow}>
          <TextInput
            placeholder="Add new task..."
            style={styles.input}
            value={enteredGoal}
            onChangeText={setEnteredGoal}
          />

          <TouchableOpacity
            style={styles.addButton}
            onPress={addOrEditGoalHandler}
          >
            <Text style={styles.addButtonText}>
              {editId ? 'Update' : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GoalItem item={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingTop: 70,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 25,
  },

  inputSection: {
    marginBottom: 20,
  },

  inputRow: {
    flexDirection: 'row',
  },

  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 14,
    marginRight: 10,
    fontSize: 16,
    elevation: 3,
  },

  addButton: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 18,
    justifyContent: 'center',
    borderRadius: 14,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  goalCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
    marginVertical: 10,
    elevation: 4,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#6366F1',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedBox: {
    backgroundColor: '#6366F1',
  },

  checkMark: {
    color: '#FFF',
    fontWeight: 'bold',
  },

  goalText: {
    flex: 1,
    fontSize: 16,
    color: '#1E293B',
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },

  actions: {
    flexDirection: 'row',
  },

  editBtn: {
    marginRight: 10,
  },

  deleteBtn: {},

  actionText: {
    color: '#EF4444',
    fontWeight: '600',
  },
});