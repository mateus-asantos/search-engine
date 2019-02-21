import React, { Component } from 'react'
import { TextField, Button, Select, MenuItem, FormHelperText, FormControl, Typography } from '@material-ui/core';
import axios from 'axios';

class AddField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: "",
            types: "",
            type: "",
            typeInput: "All",
            selectOpen: false,
            showAddTypeField: false,
            addTypeInput: ""
        }
    };

    // controls the "ADD" text field
    handleInput = event => {
        this.setState({
            input: event.target.value
        })
    }

    // controls the select component;
    // controls the visibility of "ADD FIELD" component
    handleTypeChange = event => {
        this.setState({
            typeInput: event.target.value,
            showAddTypeField: event.target.value === "Add Type" ? true : false
        })
    }

    handleClose = () => {
        this.setState({ selectOpen: false });
    };

    handleOpen = () => {
        this.setState({ selectOpen: true });
    };
    /*
    handleTypeInput = event => {
        this.setState({
            typeInput: event.target.value
        })
    }*/

    //controls ADD TYPE text field
    handleAddTypeInput = event => {
        this.setState({
            addTypeInput: event.target.value
        })
    }

    //ADD TYPE request
    handleAddTypeClick = async () => {
        const options = {
            method: 'post',
            url: 'http://localhost:3000/initindex',
            data: JSON.stringify({
                'text': this.state.addTypeInput,
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };

        await axios(options).then((response) => {
            console.log(response)
            this.setState({
                showAddTypeField: false,
                addTypeInput: '',
            })
            this.fetchTypes()
        })
    }

    //ADD ENTRY request
    handleAddEntryClick = async () => {
        const options = {
            method: 'post',
            url: 'http://localhost:3000/addvalue',
            data: JSON.stringify({
                'text': this.state.input,
                'type': this.state.typeInput
            }),
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



    fetchTypes = async () => {
        const options = {
            method: 'get',
            url: 'http://localhost:3000/getindices',
        }

        await axios(options).then((response) => {
            console.log("types response", response.data)
            this.setState({
                types:
                    Object.entries(response.data).map(item => {
                        return (<MenuItem key={item[0]} className="Item" value={item[0]}>{item[0]}</MenuItem>)
                    })
            })
            this.props.onRequestTypes()
        })
    }

    render() {
        window.addEventListener("load", () => {
            this.fetchTypes()
        })
        /*         if (this.state.typeInput === "All") {
                    this.setState({ typeInput: "" })
                } */
        return (
            <div className="form">
                <FormControl className="subform">
                    <div className="subform2 Add">
                        <TextField value={this.state.input} onChange={this.handleInput} color="primary"></TextField>
                        <FormHelperText>Write the text that you want to add</FormHelperText>
                    </div>
                </FormControl>
                <FormControl className="form" >

                    <Select
                        open={this.state.selectOpen}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.typeInput}
                        onChange={this.handleTypeChange}
                        name="type"
                        className="Select"
                        color="primary">

                        {this.state.types}

                        <MenuItem value="Add Type" className="Add_Type_Item">
                            <strong>Add Type</strong>
                        </MenuItem>
                    </Select>

                    <FormHelperText>Select the Type</FormHelperText>
                </FormControl>
                <Button
                    className="Add_Button"
                    onClick={this.handleAddEntryClick}
                    variant="contained"
                    color="primary"
                ><strong>Add</strong></Button>
                {this.state.showAddTypeField ? <div className="NTextField">


                    <TextField
                        className="Add"
                        placeholder="Add a new Type"
                        value={this.state.addTypeInput}
                        onChange={this.handleAddTypeInput}>
                    </TextField>

                    <Button
                        className="Add_Button"
                        onClick={this.handleAddTypeClick}
                        variant="contained"
                        color="primary"
                    ><strong>Add</strong></Button>

                </div> : null}


            </div>
        )
    };

}


export default AddField;

