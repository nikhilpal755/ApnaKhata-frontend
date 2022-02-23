import React from 'react'

import ReactApexChart from 'react-apexcharts'
export default function BarGraph({ paymentHistory }) {


    let paymentDates = [];
    let paymentAmounts = [];

    paymentHistory.forEach(payment => {
        const newDate = new Date(payment?.datePaid);
        paymentDates.push(newDate.toLocaleDateString());
    })

    paymentHistory.forEach(payment => {
        paymentAmounts.push(payment?.amountPaid);
    })

    // console.log(paymentDates, paymentAmounts)

    const series = [{
        name: 'Payment Received',
        data: paymentAmounts
    }]

    const options = {
        chart: {
    
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false
            }
        },
       
        stroke: {
            curve: "smooth"

        },
        xaxis: {
            type: "datetime",
            categories: paymentDates

        },
        tooltip: {
            x: {
                format: "dd/MM/yy"
            }

        },
        dataLabels: {
            enabled: false
        }

    }

    return (
        <>
            <div className="barChart" style={{
                backgroundColor: "white",
                textAlign: "center",
                width: '90%',
                margin: '40px auto',
                padding: '10px'
            }}>
                <ReactApexChart
                    options={options}
                    series={series}
                    type="bar"
                    height="350"
                />

            </div>

        </>
    )
}
