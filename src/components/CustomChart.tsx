import { useTheme } from "styled-components";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import type { CustomChartProps } from "@/types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
)

function CustomChart(props: CustomChartProps) {
    const { data, labels, type } = props
    const theme = useTheme()
    const options = {
        responsive: true,
        scaleShowVerticalLines: false,
        scales: {
            x: {
                border: {
                    display: false,
                },
                grid: {
                    display: false,
                },
                ticks: {
                    color: theme.typographies.subtitle,
                }
            },
            y: {
                border: {
                    display: false,
                },
                grid: {
                   color: theme.appDefaultStroke
                },
                ticks: {
                    color: theme.typographies.subtitle,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
        },
    },
    }

    const chartData = {
        labels,
        datasets: [
            {              
                data: data,
                borderColor: 'rgb(12, 112, 242)',
                backgroundColor: 'rgb(12, 112, 242, 1)'
            },
        ],
    };
    return type === "bar" ? (
       <Bar data={chartData} options={options} />
        ) : (
        <Line data={chartData} options={options} />
        )
}

    export default CustomChart