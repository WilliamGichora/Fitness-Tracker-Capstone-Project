import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useWorkoutStore from "../stores/useWorkoutStore"

ChartJS.register(ArcElement, Tooltip, Legend);
function ExerciseTypeDoughnutChart() {
    const workouts = useWorkoutStore(state => state.workouts);

    const exerciseCounts = {};
    workouts.forEach((workout) => {
        workout.exercises.forEach((exercise) => {
            if (exerciseCounts[exercise.name]) {
                exerciseCounts[exercise.name]++;
            } else {
                exerciseCounts[exercise.name] = 1;
            }
        });
    });

    const data = {
        labels: Object.keys(exerciseCounts),
        datasets: [
            {
                data: Object.values(exerciseCounts),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        return `${label}: ${value} times`;
                    },
                },
            },
        },
    };

    return (
        <div className="bg-white/10">
            <h2 className="text-lg font-semibold mb-4 text-center ">
                Exercise Type Distribution
            </h2>
            <div className="w-full h-[25rem]">
                <Doughnut data={data} options={options} className="mx-auto md:mx-0 lg:mx-auto" />
            </div>
        </div>
    );
}

export default ExerciseTypeDoughnutChart;
