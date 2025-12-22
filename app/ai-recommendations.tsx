import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

/* ---------- Expanded Mock Data ---------- */
const TASKS = [
  { id: 't1', name: 'Harvesting' },
  { id: 't2', name: 'Planting' },
  { id: 't3', name: 'Maintenance' },
  { id: 't4', name: 'Pruning' },
  { id: 't5', name: 'Manuring' },
  { id: 't6', name: 'Spraying' },
  { id: 't7', name: 'Weeding' },
  { id: 't8', name: 'Pest and Disease' },
  { id: 't9', name: 'Mechanisation Fleet' },
];

const WORKERS = [
  { id: 'w1', name: 'Ahmad', skill: 'Harvesting', suitabilityScore: 92, availability: 'Available', experience: 5, currentTasks: ['Harvesting section A'] },
  { id: 'w2', name: 'Faiz', skill: 'Harvesting', suitabilityScore: 84, availability: 'Available', experience: 3, currentTasks: ['Harvesting section B'] },
  { id: 'w3', name: 'Aiman', skill: 'Planting', suitabilityScore: 80, availability: 'Busy', experience: 4, currentTasks: ['Planting section C'] },
  { id: 'w4', name: 'Siti', skill: 'Harvesting', suitabilityScore: 75, availability: 'Available', experience: 2, currentTasks: ['Assisting Harvesting section B'] },
  { id: 'w5', name: 'Hafiz', skill: 'Harvesting', suitabilityScore: 78, availability: 'Busy', experience: 3, currentTasks: ['Harvesting section C'] },
  { id: 'w6', name: 'Maya', skill: 'Pruning', suitabilityScore: 88, availability: 'Available', experience: 4, currentTasks: ['Pruning section A'] },
  { id: 'w7', name: 'Zul', skill: 'Manuring', suitabilityScore: 85, availability: 'Available', experience: 3, currentTasks: ['Manuring section B'] },
  { id: 'w8', name: 'Lina', skill: 'Spraying', suitabilityScore: 90, availability: 'Busy', experience: 5, currentTasks: ['Spraying section C'] },
  { id: 'w9', name: 'Imran', skill: 'Weeding', suitabilityScore: 82, availability: 'Available', experience: 3, currentTasks: ['Weeding section D'] },
  { id: 'w10', name: 'Fauzi', skill: 'Pest and Disease', suitabilityScore: 87, availability: 'Available', experience: 6, currentTasks: ['Pest inspection section A'] },
  { id: 'w11', name: 'Hana', skill: 'Mechanisation Fleet', suitabilityScore: 91, availability: 'Busy', experience: 7, currentTasks: ['Tractor maintenance'] },
];

/* ------------------- Main Screen ------------------- */
export default function AssignTaskScreen() {
  const [search, setSearch] = useState('');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [selectedWorkers, setSelectedWorkers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  /* Filter tasks based on search (startsWith) */
  const filteredTasks =
    search.trim().length === 0
      ? []
      : TASKS.filter(task =>
          task.name.toLowerCase().startsWith(search.toLowerCase())
        );

  const recommendedWorkers = selectedTask
    ? WORKERS.filter(w => w.skill === selectedTask.name).sort(
        (a, b) => b.suitabilityScore - a.suitabilityScore
      )
    : [];

  const toggleWorkerSelection = (worker: any) => {
    if (!selectedWorkers.find(w => w.id === worker.id)) {
      setSelectedWorkers([...selectedWorkers, { ...worker, task: selectedTask.name }]);
    }
  };

  const removeWorker = (workerId: string) => {
    setSelectedWorkers(selectedWorkers.filter(w => w.id !== workerId));
  };

  const groupedWorkers = Object.entries(
    selectedWorkers.reduce((acc: Record<string, any[]>, worker) => {
      if (!acc[worker.task]) acc[worker.task] = [];
      acc[worker.task].push(worker);
      return acc;
    }, {} as Record<string, any[]>)
  ) as [string, any[]][]; // TypeScript fix

  const assignTasks = () => {
    if (selectedWorkers.length === 0) {
      Alert.alert('No workers selected', 'Please select at least one worker.');
      return;
    }
    Alert.alert('Success', 'Workers assigned successfully!');
    setSelectedWorkers([]);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />

      {/* Header */}
      <Text style={styles.title}>Assign Task</Text>
      <Text style={styles.subtitle}>
        Search task → choose the best workers for the task
      </Text>

      {/* Task Search */}
      <TextInput
        style={styles.input}
        placeholder="Search task (e.g. Harvesting)"
        value={search}
        onChangeText={text => {
          setSearch(text);
          setSelectedTask(null);
        }}
      />

      {/* Task Results */}
      {filteredTasks.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tasks</Text>
          {filteredTasks.map(task => (
            <TouchableOpacity
              key={task.id}
              style={[
                styles.card,
                selectedTask?.id === task.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedTask(task)}
            >
              <Text style={styles.cardTitle}>{task.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Recommended Workers */}
      {selectedTask && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Recommended Workers for "{selectedTask.name}"
          </Text>

          {recommendedWorkers.map(worker => (
            <TouchableOpacity
              key={worker.id}
              style={[
                styles.workerCard,
                selectedWorkers.find(w => w.id === worker.id) &&
                  styles.selectedCard,
              ]}
              onPress={() => toggleWorkerSelection(worker)}
            >
              <View style={styles.rowBetween}>
                <Text style={styles.workerName}>{worker.name}</Text>
                <Text style={styles.score}>{worker.suitabilityScore}%</Text>
              </View>

              <Text style={styles.smallText}>Skill: {worker.skill}</Text>
              <Text style={styles.smallText}>
                Availability: {worker.availability}
              </Text>
              <Text style={styles.smallText}>
                Experience: {worker.experience} years
              </Text>
              <Text style={styles.smallText}>
                Current Tasks: {worker.currentTasks.join(', ')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Selected Workers Summary */}
      {selectedWorkers.length > 0 && (
        <View style={styles.assignmentSection}>
          {groupedWorkers.map(([taskName, workers]) => (
            <View key={taskName} style={{ marginBottom: 20 }}>
              <Text style={styles.taskTitle}>{taskName.toUpperCase()}</Text>
              {workers.map(worker => (
                <View key={worker.id} style={styles.workerSummaryCard}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.workerSummaryName}>{worker.name}</Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeWorker(worker.id)}
                    >
                      <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.workerSummaryText}>
                    Availability: {worker.availability}
                  </Text>
                  <Text style={styles.workerSummaryText}>
                    Experience: {worker.experience} years
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}

      {/* Assign Task Button */}
      {selectedWorkers.length > 0 && (
        <TouchableOpacity
          style={[styles.assignButton, loading && styles.disabledButton]}
          onPress={assignTasks}
        >
          <Text style={styles.assignButtonText}>Assign Task</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

/* ------------------- Styles ------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFE',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 8,
  },
  selectedCard: {
    borderColor: '#9C27B0',
    backgroundColor: '#F3E5F5',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  workerCard: {
    backgroundColor: '#FFF',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DDD',
    marginBottom: 10,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  workerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  score: {
    fontWeight: 'bold',
    color: '#9C27B0',
  },
  smallText: {
    fontSize: 13,
    marginTop: 2,
    color: '#555',
  },
  assignmentSection: {
    marginTop: 30,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 12,
  },
  workerSummaryCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  workerSummaryName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  workerSummaryText: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  removeButton: {
    backgroundColor: '#E53935',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  assignButton: {
    backgroundColor: '#1A237E',
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  assignButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: '#999',
  },
});
