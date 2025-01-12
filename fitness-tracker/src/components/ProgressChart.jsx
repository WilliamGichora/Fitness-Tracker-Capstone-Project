import useWorkoutStore from "../stores/useWorkoutStore";
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },

    },
};

//Line chart to show total accumulative weights lifted per day
function ProgressChart() {

    const workouts = useWorkoutStore(state => state.workouts);
    
    //reduc function to return total accumulatice weight lifted for all workouts per day
    const weightData = workouts.reduce((acc, workout) => {
        const date = new Date(workout.timestamp).toLocaleDateString();
        const totalWeight = workout.exercises.reduce((sum, ex) => sum + ex.weight * ex.reps * ex.sets, 0);

        acc[date] = (acc[date] || 0) + totalWeight;
        return acc;
    }, {});

    const labels = Object.keys(weightData);
    const displaydata = Object.values(weightData);

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Total Weight Lifted (kg)',
                data: displaydata,
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <section className="container mx-auto my-8 font-poppins">
            <Line data={chartData} options={options} className="mx-auto w-full" />
        </section>
    )
}

export default ProgressChart