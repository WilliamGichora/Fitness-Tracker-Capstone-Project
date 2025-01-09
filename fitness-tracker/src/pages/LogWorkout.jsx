import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useWorkoutStore from "../stores/useWorkoutStore";
import { fetchExercises } from "../services/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from 'react-infinite-scroll-component';

//Input validation schema
const schema = yup.object({
    exercises: yup.array().of(
        yup.object({
            name: yup.string().required("Exercise is required"),
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
    ).min(1, "Atleast 1 is required"),
}).required();

function LogWorkout() {
    //Decided to use useInfiniteQuery to impplement infinitescroll of the exercise names, because the api provides pagination
    const { data: exercises, fetchNextPage, hasNextPage, isLoading, isError } = useInfiniteQuery({
        queryKey: ["exercises"],
        queryFn: fetchExercises,
        getNextPageParam: (lastPage) => lastPage.next || null,
    });

    const finalExercises = exercises?.pages.reduce((acc, page) => acc.concat(page.results), []);

    //React Form Hook
    const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            exercises: [],
        },
    });

    //useFieldArray hook to track the selcted exercise name and render dynamically the input fields. So cool
    const { fields, append, remove } = useFieldArray({ control, name: "exercises" });

    const addWorkout = useWorkoutStore((state) => state.addWorkout);

    const onSubmit = (data) => {
        console.log(data);
        
        const workout = {
            timestamp: new Date().toISOString(),
            exercises: data.exercises,
        };
        addWorkout(workout);
        reset();
    };

    //function to 
    const handleAddExercise = (exerciseName,exerciseID) => {
        if (!fields.find((field) => field.name === exerciseName)) {
            append({ name: exerciseName,id:exerciseID, sets: "", reps: "", weight: "" });
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error!!!</div>;

    return (
        <div className="container min-h-96 mx-auto p-4 bg-gray-50 rounded-lg shadow-lg font-poppins">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Log a Workout</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {errors.exercises && (
                    <p className="text-red-500 text-sm">{errors.exercises.message}</p>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select an Exercise
                    </label>
                    <InfiniteScroll
                        dataLength={finalExercises ? finalExercises.length : 0}
                        next={fetchNextPage}
                        hasMore={hasNextPage}
                        loader={<div className="text-center py-4 text-gray-500">Loading more exercises...</div>}
                        scrollThreshold={0.95}
                        scrollableTarget="exercise-list"
                    >
                        <div
                            id="exercise-list"
                            className="max-h-80 overflow-y-auto border border-gray-300 rounded-lg p-2"
                        >
                            {finalExercises?.map((exercise) => (
                                <div
                                    key={exercise.id}
                                    onClick={() => handleAddExercise(exercise.name,exercise.id)}
                                    className={`p-3 mb-2 border rounded-md cursor-pointer ${fields.find((field) => field.name === exercise.name)
                                            ? "bg-green-100 border-green-400"
                                            : "bg-white hover:bg-gray-100"
                                        }`}
                                >
                                    {exercise.name}
                                </div>
                            ))}
                        </div>
                        
                    </InfiniteScroll>
                </div>

                {fields.map((field, index) => (
                    <div key={field.id} className="border p-4 rounded-lg">
                        <h3 className="font-semibold">{field.name}</h3>
                        <div>
                            <label>Sets</label>
                            <input
                                type="number"
                                {...register(`exercises.${index}.sets`)}
                                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                            {errors.exercises?.[index]?.sets && (
                                <p className="text-red-500 text-sm">{errors.exercises[index].sets.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Reps</label>
                            <input
                                type="number"
                                {...register(`exercises.${index}.reps`)}
                                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                            {errors.exercises?.[index]?.reps && (
                                <p className="text-red-500 text-sm">{errors.exercises[index].reps.message}</p>
                            )}
                        </div>
                        <div>
                            <label>Weight (kg)</label>
                            <input
                                type="number"
                                {...register(`exercises.${index}.weight`)}
                                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                            />
                            {errors.exercises?.[index]?.weight && (
                                <p className="text-red-500 text-sm">{errors.exercises[index].weight.message}</p>
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="bg-red-500 text-white px-2 py-1 rounded-md"
                        >
                            Remove
                        </button>
                    </div>
                ))}

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