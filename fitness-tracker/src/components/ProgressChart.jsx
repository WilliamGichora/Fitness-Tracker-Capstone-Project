import useWorkoutStore from "../stores/useWorkoutStore";
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

 const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        
    },
};


function ProgressChart() {

    const workouts = useWorkoutStore(state => state.workouts);
    const data = workouts.reduce((acc, workout) => {
        const date = new Date(workout.timestamp).toLocaleDateString();
        acc[date] = (acc[date] || 0) + workout.exercises.map(exercise => exercise.weight) * workout.exercises.map(exercise => exercise.reps)
        return acc;
    }, {})

    console.log(data);

    const labels = Object.keys(data);
    const weightData = Object.values(data);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Total Weight Lifted (kg)',
                data: weightData,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <section className="container mx-auto my-8 font-poppins">
            <h2 className="text-center text-lg font-bold mb-4">Progress Tracking</h2>
            <Line data={chartData} options={options}/>
        </section>
    )
}

export default ProgressChart