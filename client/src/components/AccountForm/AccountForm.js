import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'

import { Form, Field } from 'react-final-form'

import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  VIEWER_QUERY
} from '../../apollo/queries'
import { graphql, compose } from 'react-apollo'
import validate from './helpers/validation'

import styles from './styles'

class AccountForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      formToggle: true,
      errorMessage: null
    }
  }
  render() {
    const { classes, login, signup } = this.props

    const onSubmit = values => {
      this.state.formToggle
        ? login({
            variables: { user: values }
          }).catch(error =>
            this.setState({ errorMessage: error.graphQLErrors[0].message })
          )
        : signup({
            variables: { user: values }
          })
    }
    return (
      <Form
        onSubmit={onSubmit}
        validate={values => validate(values, this.state.formToggle)}
        render={({ handleSubmit, values, reset, hasValidationErrors }) => (
          <form onSubmit={handleSubmit} className={classes.accountForm}>
            {!this.state.formToggle && (
              <FormControl fullWidth className={classes.formControl}>
                <InputLabel htmlFor="fullname">Username</InputLabel>
                <Field name="fullname" component="input" type="text">
                  {({ input, meta }) => (
                    <Input
                      id="fullname"
                      type="text"
                      inputProps={{
                        autoComplete: 'off'
                      }}
                      value={input.value}
                      onChange={input.onChange}
                    />
                  )}
                </Field>
              </FormControl>
            )}
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Field name="email" component="input" type="text">
                {props => (
                  <Input
                    id="email"
                    type="text"
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    value={props.input.value}
                    onChange={props.input.onChange}
                  />
                )}
              </Field>
            </FormControl>
            <FormControl fullWidth className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Field name="password" component="input" type="password">
                {props => (
                  <Input
                    id="password"
                    type="password"
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    value={props.input.value}
                    onChange={props.input.onChange}
                  />
                )}
              </Field>
            </FormControl>
            <FormControl className={classes.formControl}>
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
              >
                <Button
                  type="submit"
                  className={classes.formButton}
                  variant="contained"
                  size="large"
                  color="secondary"
                  disabled={hasValidationErrors}
                >
                  {this.state.formToggle ? 'Enter' : 'Create Account'}
                </Button>
                <Typography>
                  <button
                    className={classes.formToggle}
                    type="button"
                    onClick={() => {
                      // @TODO: Reset the form on submit
                      this.setState({
                        formToggle: !this.state.formToggle
                      })
                    }}
                  >
                    {this.state.formToggle
                      ? 'Create an account.'
                      : 'Login to existing account.'}
                  </button>
                </Typography>
              </Grid>
            </FormControl>
            <Typography className={classes.errorMessage}>
              {this.state.errorMessage}
            </Typography>
          </form>
        )}
      />
    )
  }
}

export default compose(
  graphql(SIGNUP_MUTATION, {
    options: {
      refetchQueries: [{ query: VIEWER_QUERY }]
    },
    name: 'signup'
  }),
  graphql(LOGIN_MUTATION, {
    options: {
      refetchQueries: [{ query: VIEWER_QUERY }]
    },
    name: 'login'
  }),
  withStyles(styles)
)(AccountForm)
