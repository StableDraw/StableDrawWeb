import React, { Component } from "react";
import { Container } from "reactstrap";
import cl from "./Layout.module.scss";
//import { NavMenu } from './NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <div className={cl.wrap}>
        {/*<NavMenu />*/}
        <Container tag="main" className={cl.wrap}>
          {this.props.children}
        </Container>
      </div>
    );
  }
}
