import React, { Component } from 'react';
import Chart from 'chart.js';

//series: [this.props.votes.unsignedVotes, this.props.votes.forVotes, this.props.votes.holdVotes, this.props.votes.againstVotes],
//    labels: ["Unsigned", "For", "Hold", "Against"],
//        colors: ['#69675E', '#00C851', '#ffbb33', '#FF4444'],
export default class VotingResultsChart extends Component {
    render() {

        return (<div className="chartContainer"><canvas id="myChart"></canvas></div>)
    }

    componentDidMount = () => {
        console.log(this.props);
        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['For', 'Against', 'Hold', 'Unsigned'],
                datasets: [{
                    label: '# of Votes',
                    data: [this.props.votes.forVotes, this.props.votes.againstVotes, this.props.votes.holdVotes, this.props.votes.unsignedVotes],
                    backgroundColor: [
                        '#00C851',
                        '#FF4444',
                        '#ffbb33',
                        '#69675E'
                    ],
                    borderColor: [
                        '#fff',
                        '#fff',
                        '#fff',
                        '#fff'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    position: 'top',
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                }
            }
        });
    }
}
