import { useState, useEffect } from "react";
import useWorkoutStore from "../stores/useWorkoutStore";

function WorkoutHistoryAccordion() {
    const storedWorkouts = useWorkoutStore((state) => state.workouts);
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const sortedWorkouts = [...storedWorkouts].reverse();
        setWorkouts(sortedWorkouts);
    }, [storedWorkouts]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="bg-white/10 p-4 rounded-xl shadow-lg max-h-48 overflow-y-auto">
            {workouts.length > 0 ? (
                <div className="space-y-4">
                    {workouts.map((workout, index) => (
                        <div
                            key={index}
                            className="bg-white/20 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-lg font-semibold text-gray-700">
                                    {formatDate(workout.timestamp)}
                                </h3>
                            </div>
                            <ul className="space-y-2">
                                {workout.exercises.map((exercise, idx) => (
                                    <li
                                        key={idx}
                                        className="flex justify-between bg-white/10 p-2 rounded-md text-gray-100"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-700">
                                                {exercise.name}
                                            </p>
                                            <p className="text-sm text-lime-700">Sets: {exercise.sets}</p>
                                            <p className="text-sm text-lime-700">Reps: {exercise.reps}</p>
                                            <p className="text-sm text-lime-700">Weight: {exercise.weight}kg</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-400">
                    No workout history available. Log your first workout to get started!
                </p>
            )}
        </div>
    );
}

export default WorkoutHistoryAccordion;
