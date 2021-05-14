import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import test from "./Test";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      isAdmin: false
    };

    
    
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.isAdmin()
  }
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    this.isAdmin()
  }


  isAdmin = async () =>{
    let is = false
    if(this.state.isAdmin === undefined){
      let url = 'api/Roles/' + test.user
      let response = await fetch(url)
      if (response.ok) {
        console.log('ok')
        is = true
      } else {
        console.log('bad')
      }
      this.setState({isAdmin: is})
    }

  }


  render () {
    const pnl = this.state.isAdmin ? 
        <NavItem>
          <NavLink tag={Link} className="text-dark" to="/admin">Admin Panel</NavLink>
        </NavItem> : null
    console.log(pnl)
    
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/" ><h2 className={'textGlitch'}>Кинотеарт</h2></NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />

            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>

              <ul className="navbar-nav flex-grow">
              <div>
                {pnl}
              </div>
                <LoginMenu>
                </LoginMenu>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
