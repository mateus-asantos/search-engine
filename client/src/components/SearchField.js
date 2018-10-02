import React, { Component } from 'react'
import { Paper, Fade, Typography, TextField, Popper, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import zIndex from '@material-ui/core/styles/zIndex';

const styles = (theme) => ({
    searchField: {
        width: 200
    },
    dropdown: {
        borderRadius:0,
        width:200,
        zIndex:1
    },
  });

class SearchField extends Component {
    constructor(props) {
        super(props)
        this.state = {
            input: '',
            suggestions: [],
            renderMenu: false,
        }
    };

    fetchSuggestions = async (input) => {
        let result = []
        const options = {
            method: 'post',
            url: '/suggest',
            data: JSON.stringify({ "text": input }),
            headers: {
                'Content-Type': 'application/json'
            },
            json: true
        };
        await axios(options).then((response) => {
            console.log('response', response.data.hits.hits)
            this.setState({ ...this.state, suggestions: response.data.hits.hits })
            //result = response.data
        })


        //console.log('result', result)
        //return result
    };


    handleInput = (event) => {
        event.target.value ? (this.setState({
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
            renderMenu:false
        })
    }

    render() {
        const classes = this.props
        console.log('suggestions', this.state.suggestions)
        return (
            <div>
                <Typography variant='h3'>Search</Typography>
                <TextField className={classes.searchField} id="searchText" value={this.state.input} onChange={this.handleInput}></TextField>
                <Popper  open={this.state.renderMenu} anchorEl={() => document.getElementById('searchText')} >
                    {this.state.suggestions.map((item) => {
                        return (<Paper className = {classes.dropdown} key={item._id} onClick={() => this.handleClick(item._source.text)}>
                            <MenuItem className='typhography'>{item._source.text}</MenuItem>
                        </Paper>)
                    })}
                </Popper>
            </div>
        )
    }


};


export default withStyles(styles)(SearchField);
