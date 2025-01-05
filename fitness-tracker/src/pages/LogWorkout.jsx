import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useWorkoutStore from "../stores/useWorkoutStore";
import { fetchExercises } from "../services/api";
import { useQuery } from "@tanstack/react-query"

const schema = yup
    .object({
        exercise: yup.string().required("Please select an exercise"),
        sets: yup
            .number()
            .typeError("Sets must be a number")
            .positive("Sets must be positive")
            .integer("Sets must be a whole number")
            .required("Please enter the number of sets"),
        reps: yup
            .number()
            .typeError("Reps must be a number")
            .positive("Reps must be positive")
            .integer("Reps must be a whole number")
            .required("Please enter the number of reps"),
        weight: yup
            .number()
            .typeError("Weight must be a number")
            .positive("Weight must be positive")
            .required("Please enter the weight"),
    })
    .required();

function LogWorkout() {
    const { isLoading, isError, data: exercises } = useQuery({
        queryKey: ['exercises'],
        queryFn: fetchExercises
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const addWorkout = useWorkoutStore((state) => state.addWorkout);

    const onSubmit = (data) => {
        addWorkout({ ...data, timestamp: new Date().toISOString() });
        reset();
    };

    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error!!!</div>


    return (
        <div className="container mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Log a Workout</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Exercise Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Exercise
                    </label>
                    <select
                        {...register("exercise")}
                        className={`w-full p-2 border ${errors.exercise ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring focus:ring-blue-200`}
                    >
                        <option value="">-- Select an Exercise --</option>
                        {exercises.results.map((exercise, index) => (<option key={index} value={exercise.name}>{exercise.name}</option>))}
                    </select>
                    {errors.exercise && (
                        <p className="text-red-500 text-sm mt-1">{errors.exercise.message}</p>
                    )}
                </div>

                {/* Sets Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Sets
                    </label>
                    <input
                        type="number"
                        {...register("sets")}
                        className={`w-full p-2 border ${errors.sets ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring focus:ring-blue-200`}
                        placeholder="Enter the number of sets"
                    />
                    {errors.sets && (
                        <p className="text-red-500 text-sm mt-1">{errors.sets.message}</p>
                    )}
                </div>

                {/* Reps Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Reps
                    </label>
                    <input
                        type="number"
                        {...register("reps")}
                        className={`w-full p-2 border ${errors.reps ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring focus:ring-blue-200`}
                        placeholder="Enter the number of reps"
                    />
                    {errors.reps && (
                        <p className="text-red-500 text-sm mt-1">{errors.reps.message}</p>
                    )}
                </div>

                {/* Weight Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weight (kg)
                    </label>
                    <input
                        type="number"
                        {...register("weight")}
                        className={`w-full p-2 border ${errors.weight ? "border-red-500" : "border-gray-300"
                            } rounded-lg focus:outline-none focus:ring focus:ring-blue-200`}
                        placeholder="Enter the weight used"
                    />
                    {errors.weight && (
                        <p className="text-red-500 text-sm mt-1">{errors.weight.message}</p>
                    )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="w-1/2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Log Workout
                    </button>
                </div>
            </form>
        </div>
    );
}

export default LogWorkout;
