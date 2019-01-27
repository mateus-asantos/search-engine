import React, { Component } from 'react'
import { Paper, TextField, Popper, MenuItem, Select, FormHelperText,FormControl } from '@material-ui/core'
import axios from 'axios'



class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            suggestions: [],
            renderMenu: false,
            renderFilterMenu: false,
            typeFilter: "_all",
            types: ""
        }
    };

    fetchSuggestions = async (input) => {
        const options = {
            method: 'post',
            url: '/suggest',
            data: JSON.stringify({ "text": input, "typeName": this.state.typeFilter }),
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };
        await axios(options).then((response) => {
            console.log('response', response.data.hits.hits)
            this.setState({ ...this.state, suggestions: response.data.hits.hits })
        })


    };

    // controls the select component;
    // controls the visibility of "ADD FIELD" component
    handleTypeChange = event => {
        this.setState({
            typeFilter: event.target.value,
        })
    }


    handleClose = () => {
        this.setState({ selectOpen: false });
    };

    handleOpen = () => {
        this.setState({ selectOpen: true });
    };

    fetchTypes = async () => {
        const options = {
            method: 'get',
            url: '/getindices',
        }

        await axios(options).then((response) => {
            console.log("response", response.data)
            this.setState({
                types: response.data
            }), console.log("state after fetch types", this.state)
        })
    }

    handleInput = (event) => {
        !!event.target.value ? (this.setState({
            ...this.state,
            input: event.target.value,
            renderMenu: true
        }), this.fetchSuggestions(event.target.value)
        ) : this.setState({
            ...this.state,
            input: event.target.value,
            renderMenu: false
        })

    };


    handleClick = (value) => {
        this.setState({
            ...this.state,
            input: value,
            renderMenu: false
        })
    }

    render() {
        window.addEventListener("load", () => {
            this.fetchTypes()
        }), console.log(Object.entries(this.state.types)[0])
        console.log('suggestions', this.state.suggestions)

        return (
            <div className="form">
                <FormControl>

                    <TextField placeholder="Search" className="searchField" id="searchText" value={this.state.input} onChange={this.handleInput}></TextField>
                    <Popper open={this.state.renderMenu} anchorEl={() => document.getElementById('searchText')} >
                        {this.state.suggestions.map((item) => {
                            return (<Paper className="dropdown" key={item._id} onClick={() => this.handleClick(item._source.text)}>
                                <MenuItem >{item._source.text}</MenuItem>
                            </Paper>)
                        })}
                    </Popper>
                    <Popper open={this.state.renderFilterMenu} anchorEl={() => document.getElementById('searchText')}></Popper>

                    <Select
                        open={this.state.selectOpen}
                        onClose={this.handleClose}
                        onOpen={this.handleOpen}
                        value={this.state.typeFilter}
                        onChange={this.handleTypeChange}
                        name="type"
                        displayEmpty
                        className="select Type">

                        <MenuItem value="_all">All</MenuItem>

                        {
                            Object.entries(this.state.types).map(item => {
                                return (<MenuItem key={item[0]} className="Item" value={item[0]}>{item[0]}</MenuItem>)
                            })
                        }
                    </Select>

                    <FormHelperText>Filter by Type</FormHelperText>
                </FormControl>

            </div>
        )
    }


};


export default (SearchField);
