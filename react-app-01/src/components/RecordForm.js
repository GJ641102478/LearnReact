import React, { Component } from 'react';
import * as RecordsAPI from '../utils/RecordsAPI';

export default class RecordForm extends Component {

    constructor(props){
        super(props);
        this.state = {
            date: "",
            title: "",
            amount: ""
        };
    }    

    isValid(){
        return this.state.date && this.state.title && this.state.amount;
    }

    handleChange(even){
        let name, obj;
        name = even.target.name;
        this.setState((
            obj={},
            obj["" + name] = even.target.value,
            obj
        ));
    }

    handleSubmit(event){
        event.preventDefault();
        const data = {
            date: this.state.date,
            title: this.state.title,
            amount: Number.parseInt(this.state.amount, 0)
        }
        RecordsAPI.create(data).then(
            response => {
                this.props.handleNewRecord(response.data);
                this.setState({
                    date: "",
                    title: "",
                    amount: ""
                })
            }
        ).catch(
            error => console.log(error.message)
        )
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit.bind(this)}>
                <div>
                    <input type="text" placeholder="Date" value={this.state.date}  name="date"  onChange={this.handleChange.bind(this)} />
                    <input type="text" placeholder="title" value={this.state.title} name="title" onChange={this.handleChange.bind(this)}  />
                    <input type="text" placeholder="amount" value={this.state.amount} name="amount" onChange={this.handleChange.bind(this)} />
                    <button type="submit" disabled={!this.isValid()} >Create Record</button>
                </div>
            </form>
        );
    }
}
