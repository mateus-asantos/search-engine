import React, { Component } from 'react'
import { TextField, IconButton, SvgIcon, Select, Input, MenuItem, FormHelperText, FormControl } from '@material-ui/core';
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
            url: 'http://localhost:8000/initindex',
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
                addTypeInput: ''
            }),
                this.fetchTypes()
        })
    }

    //ADD ENTRY request
    handleAddEntryClick = async () => {
        const options = {
            method: 'post',
            url: 'http://localhost:8000/addvalue',
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
            url: 'http://localhost:8000/getindices',
        }

        await axios(options).then((response) => {
            console.log("response", response.data)
            this.setState({
                types: response.data
            }), console.log("state after fetch types", this.state)
        })
    }



    render() {
        window.addEventListener("load", () => {
            this.fetchTypes()
        }), console.log(Object.entries(this.state.types)[0])
        if (this.state.typeInput === "All") {
            this.setState({ typeInput: "" })
        }
        return (
            <div className="form">
                <TextField className="Add" placeholder="Add Entry" value={this.state.input} onChange={this.handleInput}></TextField><IconButton className="Add_Button" onClick={this.handleAddEntryClick}><SvgIcon><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></SvgIcon></IconButton>

                <FormControl className="form" >

                    <Select
                        open={this.state.selectOpen}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.typeInput}
                        onChange={this.handleTypeChange}
                        name="type"
                        displayEmpty
                        className="Select">

                        <MenuItem value="All">All</MenuItem>

                        {
                            Object.entries(this.state.types).map(item => {
                                return (<MenuItem key={item[0]} className="Item" value={item[0]}>{item[0]}</MenuItem>)
                            })
                        }

                        <MenuItem value="Add Type" className="Add_Type_Item">
                            <strong>Add Type</strong>
                        </MenuItem>
                    </Select>

                    <FormHelperText>Select the Type</FormHelperText>

                    {this.state.showAddTypeField ? <div className="NTextField">

                        <TextField
                            className="Add"
                            placeholder="Add a new Type"
                            value={this.state.addTypeInput}
                            onChange={this.handleAddTypeInput}>
                        </TextField>

                        <IconButton className="Add_Button" onClick={this.handleAddTypeClick}><SvgIcon><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" /></SvgIcon></IconButton>

                    </div> : null}

                </FormControl>
            </div>
        )
    };

}


export default AddField;

