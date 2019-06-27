import React, { Component } from 'react';
import Chart from 'chart.js';

export default class VotingResultsChart extends Component {
    render() {

        return (<div className="chartContainer"><canvas id="myChart"></canvas></div>)
    }

    componentDidMount = () => {
        var ctx = document.getElementById('myChart');
        new Chart(ctx, {
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
