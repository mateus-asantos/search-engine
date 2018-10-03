import React, { Component } from 'react'
import { TextField, IconButton, SvgIcon, Typography } from '@material-ui/core';
import axios from 'axios';

class AddField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: ''
        }
    };

    handleInput = event => {
        this.setState({
            input: event.target.value
        })
    }

    handleClick = async() =>{
        const options = {
            method: 'post',
            url: '/adddocument',
            data: JSON.stringify({'text':this.state.input}),
            headers:{
                'Content-Type':'application/json'
            },
            json: true
        };

        await axios(options).then((response)=>{
            this.setState({
                input:''
            })
        })
    }


    render() {
        return (
            <div>
                <Typography variant='display1'>Add</Typography>
                <TextField value={this.state.input} onChange={this.handleInput}></TextField><IconButton onClick={this.handleClick}><SvgIcon><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></SvgIcon></IconButton>
            </div>
        )
    }

}

export default AddField;