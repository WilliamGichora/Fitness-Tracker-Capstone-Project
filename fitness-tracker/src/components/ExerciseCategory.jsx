import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchExerciseByCategoryID, fetchExerciseCategory } from "../services/api";
import abs from "../assets/abs.png";
import arms from "../assets/arms.png";
import back from "../assets/back.jpeg";
import calves from "../assets/calves.jpg";
import cardio from "../assets/cardio.png";
import chest from "../assets/chest.jpg";
import legs from "../assets/legs.jpg";
import shoulders from "../assets/shoulder.jpg";
import ExerciseCard from "./ExerciseCard";

// Fetches and displays categories of exercises --> 8 in number
function ExerciseCategory() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    //usewuery for fetching categories
    const { data: exerciseCategories, isError, isLoading } = useQuery({
        queryKey: ["exCategory"],
        queryFn: fetchExerciseCategory,
    });

    //use query for fetching category id, and happens only if a category is selected by the user
    const {
        data: exercisesOfCategory,
        isError: exercisesError,
        isLoading: exercisesLoading,
    } = useQuery({
        queryKey: ["exercises", selectedCategory],
        queryFn: () => fetchExerciseByCategoryID(selectedCategory),
        enabled: !!selectedCategory,
    });

    console.log(exercisesOfCategory);


    const images = [abs, arms, back, calves, cardio, chest, legs, shoulders];

    if (isLoading) return <div>Loading categories...</div>;
    if (isError) return <div>Error encountered while fetching the categories</div>;

    return (
        <section className="container mx-auto font-poppins rounded-lg bg-white/10 mt-4 w-full px-4 sm:px-2">
            <h2 className="text-center font-semibold text-lg mb-6">
                Select a Category to Display Exercise Types
            </h2>
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
                {exerciseCategories?.results.map((category, index) => (
                    <div
                        key={category.id}
                        className="flex flex-col items-center justify-center bg-white/20 p-3 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        <img
                            src={images[index]}
                            alt={`${category.name} category`}
                            className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full mb-2"
                        />
                        <p className="font-semibold text-gray-800 text-center text-xs sm:text-sm">{category.name}</p>
                    </div>
                ))}
            </section>

            {selectedCategory && (
                <section className="mt-8">
                    <h3 className="text-center font-semibold text-md mb-4">
                        Exercises in Selected Category
                    </h3>
                    {exercisesLoading ? (
                        <div>Loading exercises...</div>
                    ) : exercisesError ? (
                        <div>Error loading exercises</div>
                    ) : (
                        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-h-[400px] h-fit overflow-y-auto">
                            {exercisesOfCategory?.results.map((exercise) => (
                                <ExerciseCard key={exercise.id} exercise={exercise} />
                            ))}
                        </section>
                    )}
                </section>
            )}
        </section>
    );
}

export default ExerciseCategory;
