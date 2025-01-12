import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from "chart.js";
import { Bar } from "react-chartjs-2";
import useWorkoutStore from "../stores/useWorkoutStore";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartWeeklyVisualization = () => {

    const workouts = useWorkoutStore(state => state.workouts);

    //returns the current week number based on the number of days past the first day of the year
    const getWeekNumber = (date) => {
        const startOfYear = new Date(date.getFullYear(), 0, 1);
        const days = Math.floor((date - startOfYear) / (24 * 60 * 60 * 1000));
        return Math.ceil((days + startOfYear.getDay() + 1) / 7);
    };

    // This is the total number of workouts by week
    const workoutCountsByWeek = {};
    workouts.forEach((workout) => {
        const date = new Date(workout.timestamp);
        const year = date.getFullYear();
        const week = getWeekNumber(date);
        const weekKey = `Week ${week}, ${year}`; 

        if (workoutCountsByWeek[weekKey]) {
            workoutCountsByWeek[weekKey] += 1;
        } else {
            workoutCountsByWeek[weekKey] = 1;
        }
    });

    //chart labels -->
    const labels = Object.keys(workoutCountsByWeek);
    const data = {
        labels,
        datasets: [
            {
                label: "Workouts Completed",
                data: Object.values(workoutCountsByWeek),
                backgroundColor: "rgba(75, 192, 192, 0.5)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Workouts Completed per Week",
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Week",
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Number of Workouts",
                },
                beginAtZero: true,
                ticks: {
                   stepSize:1, 
                },
            },
        },
    };

    return (
        <div className="p-4 bg-white shadow rounded-md">
            <h2 className="text-lg font-semibold mb-4 text-center">Weekly Workouts</h2>
            <Bar options={options} data={data} />
        </div>
    );
};

export default BarChartWeeklyVisualization;
