import React, { Component } from 'react'
import { TextField, IconButton, SvgIcon, Popper } from '@material-ui/core';
import axios from 'axios';

class AddType extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            renderMenu:false,
        }
    };

    handleInput = event => {
        this.setState({
            input: event.target.value
        })
    }

    handleClick = async () => {
        const options = {
            method: 'post',
            url: '/addtype',
            data: JSON.stringify({ 'text': this.state.input }),
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };

        await axios(options).then((response) => {
            this.setState({
                input: ''
            })
        })
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleClick}>
                    <TextField placeholder="Add Type" value={this.state.input} onChange={this.handleInput}></TextField><IconButton onClick={this.handleClick}><SvgIcon><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></SvgIcon></IconButton>
                </form>
            </div>
        )
    }

}

export default AddField;