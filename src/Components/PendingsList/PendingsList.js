import React, { Component } from 'react';
import PendingCard from "./../PendingCard/PendingCard";

export default class PendigList extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            arrayWorkerToShow: [],
            sortedByPriority: false
        }
    }
    orderByDate = ()=>{
        const { arrayWorkerToShow, sortedByPriority } = this.state;
        let auxArrayWorkers = [...arrayWorkerToShow];
        if ( sortedByPriority ) {
            auxArrayWorkers.sort( (worker0, worker1)=>{
                if (worker0.registrationDate > worker1.registrationDate) { return 1 }
                if (worker0.registrationDate < worker1.registrationDate) { return -1 }
                return 0;
            } )
            this.setState({arrayWorkerToShow: auxArrayWorkers, sortedByPriority: false});
        }
        else {
            auxArrayWorkers.sort( (worker0, worker1)=>{
                if (worker0.registrationDate > worker1.registrationDate) { return -1 }
                if (worker0.registrationDate < worker1.registrationDate) { return 1 }
                return 0;
            } )
            this.setState({arrayWorkerToShow: auxArrayWorkers, sortedByPriority: true});
        }
    }
    
    componentWillReceiveProps(props) { this.setState({arrayWorkerToShow: this.props.arrayWorkerToShow}) }

    componentDidMount() {
        this.setState({arrayWorkerToShow: this.props.arrayWorkerToShow})
    }

    render() {
        const { arrayWorkerToShow } = this.state;
        return (
            <section className="cardlist-container">
            {
                arrayWorkerToShow && (
                    <>
                        <table className="table" cellSpacing="0">
                            <thead className="table-thead">
                                <tr>
                                    <th className="date">
                                        <button 
                                            className="orderByDate"
                                            onClick={this.orderByDate} 
                                        >
                                            FECHA
                                        </button>
                                    </th>
                                    <th>NOMBRE</th>
                                    <th>CATEGORÍA</th>
                                    <th>ZONA</th>
                                    <th>ACCIONES</th>
                                </tr>
                            </thead>

                            <tbody className="table-tbody">
                                {
                                    arrayWorkerToShow[0] && arrayWorkerToShow.map(worker => {
                                        return (
                                            <PendingCard
                                                key={worker.id}
                                                worker={worker}
                                                loadData={this.props.loadData}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </>
                )
            }
            </section>
        );
    }
}
