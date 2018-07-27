import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from "axios";
import API from "../utils/API"

const styles = theme => ({
  container: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class TextFields extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          topic: 'Spacex',
          startYear: '2017',
          endYear: '2018',
        };
    }

  handleChange = name => event => {
    event.preventDefault();
    this.setState({
      [name]: event.target.value,
    });
  };

  search = event => {
    event.preventDefault();
     let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=db026d26b06142ee99d383752d22ca82&q=${this.state.topic}`;
     if (parseInt(this.state.startYear,10)) { queryURL += `&begin_date=${this.state.startYear}0101` }
     if (parseInt(this.state.endYear,10))   { queryURL += `&end_date=${this.state.endYear}1231` }
     axios.get(queryURL)
        .then(response => {
            response.data.response.docs.forEach(article => {
                console.log(`ARTICLE: ${JSON.stringify(article,null,2)}`)
                API.savearticle(article)
                    .catch(error => console.log(`API ERROR: ${error.message}`))

            })
        })
        .catch(error => console.log(`NYT ERROR: ${error.message}`))
  }

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="topic"
          label="Topic"
          className={classes.textField}
          value={this.state.topic}
          onChange={this.handleChange('topic')}
          margin="normal"
        />
        <TextField
          id="endYear"
          label="startYear"
          defaultValue={this.state.startYear}
          className={classes.textField}
          onChange={this.handleChange('startYear')}
          margin="normal"
        />
        <TextField
          required
          id="endYear"
          label="endYear"
          defaultValue={this.state.endYear}
          className={classes.textField}
          onChange={this.handleChange('endYear')}
          margin="normal"
        />
        <Button
            color="primary"
            className={classes.button}
            onClick={event => this.search(event)}
        >
            Search
        </Button>
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
