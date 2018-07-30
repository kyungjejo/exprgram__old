import React, { Component } from 'react';

import { Container, Form, Segment, Header } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './index.css';

import { HOST_URL, countryOptions, languageOptions, levelOptions, 
        familiarityOptions, reasonOptions, resideOptions } from './common';

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: '', email: '',
            country: '', native: '', english: '', familiarity: '', reside: '', reason: '',
            registerselect: false,
            errorId: false, errorEmail: false, 
            errorCountry: false, errorNative: false, errorEnglish: false, errorFamiliarity: false, errorReside: false, errorReason: false,
            redirect: false
        }
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit = () => {
        const { id, email, registerselect, country, native, english, familiarity, reside, reason } = this.state;
        // this.setState({ submittedId: id, submittedCountry: country, submittedMotivation: motivation,
        //     submittedNative: native, submittedEnglish: english, submittedFamiliarity: familiarity
        // })
        if ( !registerselect ) {
            fetch(HOST_URL+"/login?register=True&id="+id+"&email="+email, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }})
                .then(res => res.json())
                .then((result) => result['success'] === 'success' ? this.setState({redirect: true}) : this.setState({errorId: true,errorEmail: true}))
                .catch((error) => this.setState({errorId: true,errorEmail: true}))

        }
        else{
            if ( !id ) {
                this.setState({errorId: true});
            }
            if ( !email ) {
                this.setState({errorEmail: true})
            }
            if ( !country ) {
                this.setState({errorCountry: true});
            }
            if ( !native ) {
                this.setState({errorNative: true});
            }
            if ( !english ) {
                this.setState({errorEnglish: true});
            }
            if ( !familiarity ) {
                this.setState({errorFamiliarity: true});
            }
            if ( !reside ) {
                this.setState({errorReside: true});
            }
            if ( !reason ) {
                this.setState({errorReason: true});
            }
            if ( country && native && english && familiarity && reason && reside )
            {
                this.setState({error:false})
                fetch(HOST_URL+'/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        submittedId: id, submittedEmail: email, submittedCountry: country, submittedNative:native,
                        submittedReside: reside, submittedReason: reason,
                        submittedEnglish: english, submittedFamiliarity: familiarity
                    })
                    })
                    .then((response) => response.json())
                    .then((responseJSON) => this.setState({redirect: true}))
                    .catch((error) => {console.error(error)})
            }
        }
      }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/home/"+this.state.id} />;
        }

        return(
            <Container className="form-container">
                <Segment className="form-segment">
                    <Header className="form-text" textAlign="center">
                        Exprgram
                    </Header>
                    <Form onSubmit={this.handleSubmit}>

                        {/* <div style={{display:!(this.state.registerselect)? 'block' : 'none'}}>
                            <div className="form-button">
                                <Button className="button-choice" onClick={() => this.setState({idselect: true})}>ID</Button>
                            </div>
                            <Header as="h5" className="form-text">Otherwise, proceed with:</Header>
                            <div className="form-button ">
                                <Button className="button-choice" onClick={() => this.setState({infoselect: true})}>Without ID</Button>
                            </div>
                        </div> */}

                        <div>
                            <Form.Field
                                className="form-text"
                                name="id"
                                onChange={(e) => this.setState({id: e.target.value})}
                                error={this.state.errorId}
                                required>
                                <label>ID</label>
                                <input id="userid" placeholder='Enter your ID' />
                            </Form.Field>
                            <Form.Field
                                className="form-text"
                                name="email"
                                onChange={(e) => this.setState({email: e.target.value})}
                                error={this.state.errorEmail}
                                required>
                                <label>Email</label>
                                <input id="email" placeholder='Enter your email' />
                            </Form.Field>
                                <Header style={{display:(!this.state.registerselect && (this.state.errorEmail || this.state.errorId)) ? 'block' : 'none'}} 
                                    className="form-text" as='h5' textAlign='center'>
                                    <span style={{color: 'red'}}>Please check your id and email again.</span>
                                </Header>
                                <Header style={{display:!this.state.registerselect ? 'block' : 'none'}} 
                                    className="form-text" as='h5' textAlign='center'>
                                    If you don't have an ID, please <span className="hyperlink" onClick={() => this.setState({registerselect: true})}>register here</span>.
                                </Header>
                        </div>

                        <div style={{display: this.state.registerselect ? 'block' : 'none'}}>
                        <Form.Dropdown label="Country" 
                                    className="form-text"
                                    name="country"
                                    placeholder='Select or search your country' 
                                    options={countryOptions}
                                    onChange={(e, { value }) => value ? this.setState({country: value, errorCountry: false}) : null}
                                    search
                                    fluid
                                    selection
                                    required 
                                    error={this.state.errorCountry}/>
                        <Form.Dropdown label="Mother tongue" 
                                    className="form-text"
                                    name="Mother tongue"
                                    placeholder='Select or search your native language' 
                                    options={languageOptions}
                                    onChange={(e, { value }) => value ? this.setState({native: value, errorNative: false}) : null}
                                    search
                                    fluid
                                    selection
                                    required 
                                    error={this.state.errorNative}/>
                        <Form.Select label="Select your English level"
                                    className="form-text" 
                                    name="english"
                                    onChange={(e, { value }) => value ? this.setState({english: value, errorEnglish: false}) : null}
                                    placeholder='Choose one of below'
                                    options={levelOptions}
                                    required 
                                    error={this.state.errorEnglish}/>
                         <Form.Group grouped>
                            <label>How familiar are you with American sitcom <a className="hyperlink" href={'https://www.imdb.com/title/tt0108778/'}>Friends</a>?
                            <Form.Select
                                        className="form-text"
                                        name="familiarity"
                                        onChange={(e, { value }) => value ? this.setState({familiarity: value, errorFamiliarity: false}) : null}
                                        placeholder="Choose the most appropriate"
                                        options={familiarityOptions}
                                        required 
                                        error={this.state.errorFamiliarity} />
                            </label>
                        </Form.Group>
                        <Form.Select label="Have you ever studied in an English speaking country?"
                                    className="form-text"
                                    name="reside"
                                    onChange={(e, { value }) => value ? this.setState({reside: value, errorReside: false}) : null}
                                    placeholder="Choose the most appropriate"
                                    options={resideOptions}
                                    required 
                                    error={this.state.errorReside}/>
                        <Form.Select label="What is the reason for studying English?"
                                    className="form-text"
                                    name="reason"
                                    onChange={(e, { value }) => value ? this.setState({reason: value, errorReason: false}) : null}
                                    placeholder="Choose the most appropriate"
                                    options={reasonOptions}
                                    required 
                                    error={this.state.errorReason}/>
                        </div>

                        <div>
                            <Form.Button type="submit" className="form-button">
                                Submit
                            </Form.Button>
                        </div>

                    </Form>
                </Segment>
            </Container>
        )
    }
}

export default Forms;