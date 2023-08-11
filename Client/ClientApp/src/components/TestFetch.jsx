import React, { Component } from 'react';
import ApiTestConst from "../API/ApiTestConst";
import ApiToken from "../API/ApiToken";
import ApiLogin from "../API/ApiLogin";
import {AuthorizeService} from "./api-authorization/AuthorizeService";
import Drawing from "./Drawing";

export class TestFetch extends Component {
    static displayName = TestFetch.name;

    constructor(props) {
        super(props);
        this.state = {
                token: "",
                tokenstest: ""

        };
    }

    componentDidMount() {
        this.TestApi();
        this.GetToken();
    }

    static renderAPI(TestToken) {
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
                <div>
                </div>
                <tbody>
                    <tr>
                        <td>data</td>
                        <td>request</td>
                        <td>{TestToken}</td>
                    </tr>

                </tbody>
            </table>

        );
    }

    render() {
        // let contents = TestFetch.renderAPI(this.state.tokenstest);

        return (
            <div>
                {/*<h1 id="tableLabel">API Test</h1>*/}
                {/*<p>This component demonstrates fetching data from the server.</p>*/}
                {/*<code>*/}
                {/*    {this.state.token}*/}
                {/*</code>*/}
                {/*{contents}*/}
                {/*<div>*/}
                {/*    <button onClick={this.Login}>login</button>*/}
                {/*    <button onClick={this.Logout}>logout</button>*/}
                {/*</div>*/}
                <br/>
                <hr/>
                <Drawing />
            </div>
        );
    }

    async TestApi() {
        const data = await ApiTestConst.login("eve.holt@reqres.in", "cityslicka");
        this.setState({tokenstest: data.token})
    }
    async GetToken(){
        const data = await ApiToken.token();
        this.setState({token: data})
    }
    async Login() {
        const data = await ApiLogin.Login("test", "123456")
        console.log(data)
    }
    async Logout() {
        return await ApiLogin.Logout()
    }
}
