import { create } from 'zustand';

const useWorkoutStore = create((set,get) => ({
    //state
    workouts: JSON.parse(localStorage.getItem('workouts')) || [],

    //add workout to store and local storage
    addWorkout: (workout) => {
        const updatedWorkouts = [...get().workouts, workout];
        set({ workouts: updatedWorkouts });
        localStorage.setItem('workouts', JSON.stringify(updatedWorkouts));
    },

    //Delete a specific workout
    deleteWorkout: (timestamp) => {
        const updatedWorkouts = get().workouts.filter(workout => workout.timestamp !== timestamp)
        set({ workouts: updatedWorkouts });
        localStorage.setItem('workouts', JSON.stringify(updatedWorkouts))
    },
    
    // Action to clear all workouts
    clearWorkouts: () => {
        set({ workouts: [] });
        localStorage.removeItem("workouts");
    },
}));

export default useWorkoutStore;