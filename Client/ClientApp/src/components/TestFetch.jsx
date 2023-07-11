import React, { Component } from 'react';
import ApiTestConst from "./API/ApiTestConst";
import ApiToken from "./API/ApiToken";
import {logger} from "workbox-core/_private";

export class TestFetch extends Component {
    static displayName = TestFetch.name;

    constructor(props) {
        super(props);
        this.state = {
                tokens: [],

        };
    }

    componentDidMount() {
        this.TestApi();
        this.GetToken();
    }

    static renderAPI(s) {
        return (
            <table className="table table-striped" aria-labelledby="tableLabel">
                <thead>
                <tr>
                    <th>API info</th>
                    <th>Request (C)</th>
                    <th>Respons (F)</th>
                    <th>Result</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>data</td>
                        <td>request</td>
                        <td>{s}</td>
                        <td>token</td>
                    </tr>

                </tbody>
            </table>
        );
    }

    render() {
        let contents = TestFetch.renderAPI(this.state.tokens);

        return (
            <div>
                <h1 id="tableLabel">API Test</h1>
                <p>This component demonstrates fetching data from the server.</p>
                {contents}
            </div>
        );
    }

    async TestApi() {
        const data = await ApiTestConst.login("eve.holt@reqres.in", "cityslicka");
        // console.log()
        this.setState({tokens: data.token})
    }
    async GetToken(){
        const data = await ApiToken.token();
        console.log(data);
        this.setState({tokens: data})
    }
}
