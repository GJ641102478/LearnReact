import React, { Component } from 'react';
import Record from './Record';
import axios from 'axios';

export default class Records extends Component {

    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            records: []
        }
    }

    componentDidMount(){
        axios.get("https://5b350c8143559600147d58e8.mockapi.io/api/v1/records").then(
            respoonse => this.setState({
                isLoaded: true,
                records: respoonse.data
            })
        ).catch(
            error => this.setState({
                error,
                isLoaded: true,
            })
        ) 
    }
    
    render(){

        const { error, isLoaded, records } = this.state;
        if(error) { //true
            return <div>Error: { error.message } </div>;
        }else if(!isLoaded) {
            return <div>正在加载中ing。。。</div>;
        }

        return (
            <div>
                <h2>Records</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>时间</th>
                            <th>标题</th>
                            <th>金额</th>
                        </tr>
                    </thead>
                    <tbody>
                        { records.map((record) => 
                            <Record key={record.id} {...record} />
                        ) }
                    </tbody>
                </table>
            </div>
        );
    }
}
