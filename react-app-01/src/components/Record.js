import React, { Component } from 'react';
import * as RecordAPI from '../utils/RecordsAPI';
import PropTypes from 'prop-types';

export default class Record extends Component {

    constructor(props){
        super(props);
        this.state = {
            edit: false,
            // record: {
            //     date: props.date,
            //     title: props.title,
            //     amount: props.amount
            // }
        };
    }

    recordRow(){
        return (
            <tr>
                <td>{ this.props.record.date   }</td>
                <td>{ this.props.record.title  }</td>
                <td>{ this.props.record.amount }</td>
                <td>
                    <button onClick={this.handleEdit.bind(this)}>编辑</button>    
                    <button onClick={this.handleDelete.bind(this)}>删除</button>
                </td>
            </tr>
      );
    }

    recordForm() {
        return (
            <tr>
                <td>
                    <input type="text" name="date" defaultValue={this.props.record.date} ref="date"/>
                </td>
                <td>
                    <input type="text" name="title" defaultValue={this.props.record.title} ref="title"/>
                </td>
                <td>
                    <input type="text" name="amount" defaultValue={this.props.record.amount} ref="amount"/>
                </td>
                <td>
                    <button onClick={this.handleUpdate.bind(this)}>更新</button>
                    <button onClick={this.handleEdit.bind(this)}>取消</button>
                </td>
            </tr>
        );
    }

    handleEdit(){
        this.setState({
            edit: !this.state.edit
        });
    }

    handleDelete(event){
        event.preventDefault();
        RecordAPI.remove(this.props.record.id)
        .then(
            response => this.props.handleDeleteRecord(this.props.record)
        ).catch(
            error => console.log(error.message)
        )
    }

    handleUpdate(event){
        event.preventDefault();
        const id = this.props.record.id;
        RecordAPI.update(id, {
            date: this.refs.date.value,
            title: this.refs.title.value,
            amount: Number.parseInt(this.refs.amount.value, 0)
        }).then( 
            response => {
                this.setState({
                        edit: false
                    });
                this.props.handleEditRecord(this.props.record, response.data);

                // this.setState({
                //     edit: false,
                //     record: {
                //         date: response.data.date,
                //         title: response.data.title,
                //         amount: response.data.amount
                //     }
                // })
            }
        ).catch( 
            error => console.log(error)
        )
    }

    render(){
        if (this.state.edit) {
            return this.recordForm();
        }else {
            return this.recordRow();
        }
    }
}

Record.propTypes = {
    id: PropTypes.string,
    date: PropTypes.string,
    title: PropTypes.string,
    amount: PropTypes.number
};