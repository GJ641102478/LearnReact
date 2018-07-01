import React, { Component } from 'react';
import Record from './Record';
import RecordForm from './RecordForm';
import AmountBox from './AmountBox';
import * as RecordAPI from '../utils/RecordsAPI';

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
        RecordAPI.getApi().then(
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
    
    addRecord(record){
        this.setState({
            error: null,
            isLoaded: true,
            records: [
                ...this.state.records,
                record
            ]
        })
    }

    updateRecord(record, data){
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.map((item, index) => {
            if(index !== recordIndex) {
                return item;
            }
            return {
                ...item,
                ...data
            };
        });
        this.setState({
            records: newRecords
        });
    }

    deleteRecord(record){
        const recordIndex = this.state.records.indexOf(record);
        const newRecords = this.state.records.filter((item, index) => index !== recordIndex);
        this.setState({
            records: newRecords
        });
    }

   credits(){
        let credits = this.state.records.filter((record) => {
            return record.amount >= 0;
        })
        return credits.reduce((pre, cur) => {
            return pre + Number.parseInt(cur.amount, 0);
        }, 0);
   }

   debits(){
        let credits = this.state.records.filter((record) => {
            return record.amount <= 0;
        })
        return credits.reduce((pre, cur) => {
            return pre + Number.parseInt(cur.amount, 0);
        }, 0);
   }

   balance(){
        return this.credits() + this.debits();
   }
    
    render(){
        const { error, isLoaded, records } = this.state;
        let recordsComponent;

        if(error) { //true
            recordsComponent =  <div>Error: { error.message } </div>;
        }else if(!isLoaded) {
            recordsComponent =  <div>正在加载中ing。。。</div>;
        }else{
            recordsComponent = (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>时间</th>
                            <th>标题</th>
                            <th>金额</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        { records.map((record) =>  
                            (<Record 
                                key={record.id} 
                                record={record} 
                                handleEditRecord={this.updateRecord.bind(this)} 
                                handleDeleteRecord={this.deleteRecord.bind(this)}/>
                            )
                        )}
                    </tbody>
                </table>
            )   
        }

        return (
            <div>
                <h2>Records</h2>
                <div>
                    <AmountBox text="收入" amount={this.credits()}/>
                    <AmountBox text="支出" amount={this.debits()}/>
                    <AmountBox text="结余" amount={this.balance()}/>
                </div>
                <div>
                    <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
                </div> 
                { recordsComponent }
            </div>
        );
    }
}
