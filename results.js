async function getData(){
    const response = await fetch("data.csv"); // .. moves up one folder level
    const data = await response.text(); //CSV in text format

    const xDays = [];
    const ySBControl = [];
    const yIBControl = [];
    const ySBRootGraft = [];
    const yIBRootGraft = [];

    const table = data.split('\n').slice(1);

    table.forEach (row => {
        const columns = row.split(',');

        const day = parseFloat(columns[0]);
        xDays.push(day);

        const SBControl = parseFloat(columns[1]);
        ySBControl.push(SBControl);
        const IBControl = parseFloat(columns[2]);
        yIBControl.push(IBControl);
        const SBRootGraft = parseFloat(columns[3]);
        ySBRootGraft.push(SBRootGraft);
        const IBRootGraft = parseFloat(columns[4]);
        yIBRootGraft.push(IBRootGraft);
    })
    return {xDays, ySBControl, yIBControl, ySBRootGraft, yIBRootGraft};
}

async function createChart(){
    const data = await getData();   //wait for getData to send formatted data to createChart
    const lineChart = document.getElementById('lineChart');

    const myChart = new Chart(lineChart, {
        type: 'line',
        data: {
            labels: data.xDays, //x-axis labels
            datasets: [
                {
                    label: `Height of Sweet Basil Self-Grafts in cm`,
                    data: data.ySBControl,
                    fill:false,          //does not fill area under the data
                    backgroundColor: 'rgb(73, 105, 64)',
                    borderColor: 'rgb(73, 105, 64)',
                    borderWidth: 1
                },
                {
                    label: `Height of Italian Basil Self-Grafts in cm`,
                    data: data.yIBControl,
                    fill:false,          //does not fill area under the data
                    backgroundColor: 'rgb(166,77,121)',
                    borderColor: 'rgb(166,77,121)',
                    borderWidth: 1
                },
                {
                    label: `Height of Sweet Basil Rootstock Interspecific Grafts in cm`,
                    data: data.ySBRootGraft,
                    fill:false,          //does not fill area under the data
                    backgroundColor: 'rgb(130,191,162)',
                    borderColor: 'rgb(130,191,162)',
                    borderWidth: 1
                },
                {
                    label: `Height of Italian Basil Rootstock Interspecific Grafts in cm`,
                    data: data.yIBRootGraft,
                    fill:false,          //does not fill area under the data
                    backgroundColor: 'rgb(242, 157, 213)',
                    borderColor: 'rgb(242, 157, 213)',
                    borderWidth: 1
                }
            ]
        },
        options:{
            responsive: true,   //resize based on screen size
            maintainAspectRatio: false,
            scales: { //display options for x and y axes
                x: {
                    title: {
                        display: true,
                        text: 'Days',       //x-axis title
                        font: {             //font properties
                            size:14
                        },
                    },
                    ticks: {
                        callback: function(val, index){
                            return index % 2 === 0 ? this.getLabelForValue(val) : '';
                        },
                        font:{
                            size: 14
                        }
                    },
                    grid: {
                        color: '#6c767e'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Height (cm)',       //y-axis title
                        font: {             //font properties
                            size:14
                        },
                    },
                    ticks: {
                        maxTicksLimit: (data.ySBControl.length)+10,
                        font:{
                            size: 12
                        }
                    },
                    grid: {
                        color: '#6c767e'
                    }
                }
            },
            plugins: { //display options for title and legend
                title:{
                    display:true,   //diaply chart title
                    text: 'Basil Graft Height (cm) over Time',
                    font:{
                        size: 24
                    },
                    color: '#black',
                    padding: {
                        top:10,
                        bottom: 30
                    }
                },
                legend: {
                    align:'start',
                    position:'bottom'
                }
            }
        }
    });
}

createChart();