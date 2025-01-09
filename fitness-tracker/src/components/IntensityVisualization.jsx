import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useWorkoutStore from "../stores/useWorkoutStore"

ChartJS.register(ArcElement, Tooltip, Legend);
function IntensityVisualization() {
    const workouts = useWorkoutStore(state=>state.workouts)

    const categories = {
        Light: 0,      
        Moderate: 0,   
        Heavy: 0,      
    };

    workouts.forEach((workout) => {
        const totalWeight = workout.exercises.reduce(
            (sum, ex) => sum + ex.weight * ex.reps * ex.sets,
            0
        );

        if (totalWeight < 500) categories.Light++;
        else if (totalWeight <= 1000) categories.Moderate++;
        else categories.Heavy++;
    });

    const data = {
        labels: ["Light Workouts", "Moderate Workouts", "Heavy Workouts"],
        datasets: [
            {
                data: Object.values(categories),
                backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
                hoverBackgroundColor: ["#FFCE56", "#36A2EB", "#FF6384"],
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
                        return `${label}: ${value} workouts`;
                    },
                },
            },
        },
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mb-4 text-center">
                Workouts by Intensity
            </h2>
            <div className="w-full h-[25rem]">
                <Doughnut data={data} options={options} className="mx-auto md:mx-0 lg:mx-auto" />
            </div>
        </div>
    );
}

export default IntensityVisualization;