import { LineChart } from '@mui/x-charts';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

type MyPieChartProps = {
    data: { id: number, value: number, label: string, color: string }[];
    width: number;
    height: number;
    classNames?: string;
};
export function MyPieChart({ data, width, height, classNames }: MyPieChartProps) {
    // alert(pieArcLabelClasses.root)
    return (
        <PieChart
            series={[
                {
                    data: data as any,
                    innerRadius: 60,
                    arcLabelRadius: 0,
                    arcLabel: (item) => `${item.value}%`,
                    valueFormatter: (item) => `${item.value}%`,
                },
            ]}
            aria-label='40%'
            sx={{
                [`& .${pieArcLabelClasses.root}`]: {
                    fontWeight: 'bold',
                    display: 'none'
                },
                [`& .${pieArcLabelClasses.root}:first-child`]: {
                    fontWeight: 'normal',
                    fontFamily: `"Roboto", sans-serif`,
                    display: 'block',
                    fontSize: '150%'
                },
            }}
            width={width}
            height={height}
        />
    );
}



type MyLineChartProps = {
    xData: number[];
    yData: number[];
    width: number;
    height: number;
    classNames?: string;
};
function formatNumberCleanK(num: number): string {
  if (Math.abs(num) < 1000) return num.toString();
  
  const thousands = num / 1000;
  return thousands % 1 === 0 
    ? `${thousands}K` 
    : `${thousands.toFixed(1)}K`;
}
export function MyLineChart({ }: MyLineChartProps) {
    return (
        <>
            {/* <LineChart
            xAxis={[{ data: [200, 400, 688] }]}
            series={[
                {
                    data: [1, 2, 3],
                    showMark: ({ index }) => index % 2 === 0,
                },
            ]}
            height={300}
            width={300}
        /> */}
            <LineChart
                xAxis={[{ 
                    scaleType: 'band', 
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                
                }]}
                yAxis={[
                    {
                        valueFormatter: (data: number) => formatNumberCleanK(data)
                    }
                ]}
                scale={60}
                series={[
                    {
                        showMark: false,
                        data: [ 150000, 175000, 300000, 350000, 325000, 450000, 680000]
                    },
                ]}
                grid={{ horizontal: true }}
                // sx={{
                //       '& .MuiChartsWrapper-root': {
                //             // strokeDasharray: '10 5',
                //             // strokeWidth: 4,
                //             transform: 'scale(0.5)'
                //         },
                // }}
                height={300}
                

            />
        </>
    );
}