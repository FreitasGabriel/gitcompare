import React, { Component } from 'react'
import logo from '../../assets/logo.png'
import moment from 'moment';
import {Container, Form} from '../main/styles'
import CompareList from '../../components/CompareList';
import api from '../../services/api';


export default class Main extends Component {

        state = {
            loading: false,
            repositoryError: false,
            repositoryInput: '',
            repositories: [

            ],
        };

        handleAddRepository = async (e) => {
            e.preventDefault();

            this.setState({ loading: true})

            try {
                const {data: repository} = await api.get(`repos/${this.state.repositoryInput}`);

                repository.lastCommit = moment(repository.pushed_at).fromNow();

                this.setState({
                    repositoryError: false,
                    repositoryInput: '',
                    repositories: [...this.state.repositories, repository],
                })
            }catch(err) {
                this.setState({ repositoryError: true });
            }finally{
                this.setState({loading: false});
            }
        };

    render() {
        return(
        <Container>
            <img src={logo} alt="Github Compare"/>

            <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
                <input
                type="text"
                placeholder="usuário/repositório"
                value={this.state.repositoryInput}
                onChange={e => this.setState({repositoryInput: e.target.value })}/>
                <button type="submit">{this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
            </Form>
        <CompareList repositories={this.state.repositories} />
        </Container>
        );
    }
}
;
