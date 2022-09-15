import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Breadcrumb } from 'antd'
import { NavLink } from "react-router-dom";

export default function Home() {
    const chartRef = useRef(null);
    // 数据
    const option = {
        // toolbox: {
        //     feature: {
        //         magicType: {
        //             type: ['line', 'bar']
        //         }
        //     }
        // },

        legend: {
            data: [
                "3-11岁任务数",
                "11-21岁任务数",
                "21-51岁任务数"
            ],
        },

        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            textStyle: {
                color: "#fff",
                align: "left",
                fontSize: 14,
            },
            backgroundColor: "rgba(0,0,0,0.8)",
        },
        series: [
            {
                data: [{ name: "3-11岁任务数", value: 10 }, { name: "11-21岁任务数", value: 7 }, { name: "21-51岁任务数", value: 4 }],
                type: "pie",
                // roseType: 'radius',
                selectedMode: 'single',
                // radius: ['50%', '75%']
            },
        ],
    };
    useEffect(() => {
        let chartInstance = echarts.init(chartRef.current);

        chartInstance.setOption(option);
    }, []);

    return (
        <>
            {/* 面包屑 */}
            <Breadcrumb style={{ position: 'relative', bottom: 44, left: 64 }} >
                <Breadcrumb.Item> <NavLink to='/layout/home'>首页</NavLink> </Breadcrumb.Item>

            </Breadcrumb>
            {/* 图表 */}
            <div style={{ textAlign: "center" }}>
                <h2>React Echarts 饼图</h2>
                <div ref={chartRef} style={{ height: "400px", width: '1280px' }}></div>
            </div>
        </>
    );
}