import React, { Component } from 'react';

class Header extends Component {
  state = { page: '' }

  componentDidMount() {
    this.setState({ page: this.getPageName(window.location.hash) });
  }

  getPageName = (path) => {
    if (path == '#/') return 'Home';
    return path.charAt(2).toUpperCase() + path.slice(3)
  }

  render() {
    const { page } = this.state;
    return (
      <div className="Header">
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
              <div className="m-3">
                <a className="navbar-brand" href="/">
                  <span className="Name">Jacob Atzori</span>
                </a>
                <div className="PageTitle">
                  {page}
                </div>
              </div>
              <span className="navbar-nav">
                <a className="nav-link nav-item" onClick={() => this.setState({page: 'Home'})} href="/#/">Home</a>
                <a className="nav-link nav-item" onClick={() => this.setState({page: 'Projects'})} href="/#/projects">Projects</a>
                <a className="nav-link nav-item" onClick={() => this.setState({page: 'About'})} href="/#/about">About</a>
              </span>
            </div>
          </nav>
      </div>
    );
  }
}

export default Header;
