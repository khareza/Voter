import ApexCharts from 'apexcharts';
import React, { Component } from 'react';

export default class VotingResultsChart extends Component {
    render() {

        return (<div id="chart"></div>)
    }

    componentDidMount = () => {
        console.log(this.props);

        this.options = {
            grid: {
                show: false,
                padding: {
                    left: 0,
                    right: 0,
                    top: 0
                }
            },
            chart: {
                type: 'donut',
                width: '50%'
            },
            series: [this.props.votes.unsignedVotes, this.props.votes.forVotes, this.props.votes.holdVotes, this.props.votes.againstVotes],
            labels: ["Unsigned", "For", "Hold", "Against"],
            colors: ['#69675E', '#00C851', '#ffbb33', '#FF4444'],
            responsive: [{
                breakpoint: 400,
                options: {
                    chart: {
                        width: '100%'
                    },
                    legend: {
                        show: true
                    }
                }
            }, {
                breakpoint: 550,
                options: {
                    chart: {
                        width: '80%'
                    },
                    legend: {
                        show: true
                    }
                }
            }, {
                breakpoint: 700,
                options: {
                    chart: {
                        width: '60%'
                    },
                    legend: {
                        show: true
                    }
                }
            }, {
                breakpoint: 1000,
                options: {
                    chart: {
                        width: '50%'
                    },
                    legend: {
                        show: true
                    }
                }
            }],
            legend: {
                position: 'top',
                offsetY: 0,
                height: 20
            },
            dataLabels: {
                style: {
                    colors: ['#000'],
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    },
                }
            },

        }
        var chart = new ApexCharts(
            document.querySelector("#chart"),
            this.options
        );
        chart.render();
    }
}
