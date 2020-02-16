import React, { Component } from 'react';
import axios from 'axios';

//CSS
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)

    this.state = ({
      users: [],
      modal: false,
      clickedId: "",
    })
  }

  componentDidMount = async () => {
    let users = await axios('https://randomuser.me/api/?results=15&inc=name,picture,%20login')
    this.setState({
      users: users.data.results
    })
  }

  openModal = (e, uuid) => {
    // e.stopPropagation()
    if (this.state.modal === false) {
      this.setState({
        modal: true,
        clickedId: uuid
      })
    }
    // else {
    //   this.setState({
    //     modal: false,
    //     clickedId: ""
    //   })
    // }
  }

  closeModal = (e) => {
    // e.stopPropagation()
    if (this.state.modal === true) {
      this.setState({
        modal: false,
        clickedId: ""
      })
    }
  }

  render() {
    return (
      <div className="App" >
        <ul>
          {this.state.users.map(user => (
            <li onClick={(e) => this.openModal(e, user.login.uuid)} className="user">
              <p>{user.name.first} {user.name.last}</p>
              <img src={user.picture.thumbnail} alt="user" />
              {this.state.modal === true && user.login.uuid === this.state.clickedId &&
                <div>
                  <div className="modal-background" onClick={(e) => this.closeModal(e)}></div>
                  <div className="modal">
                    <p onClick={(e) => this.closeModal(e)} >X</p>
                    <p>{user.name.first} {user.name.last}</p>
                    <img src={user.picture.thumbnail} alt="user" />
                  </div>
                </div>
              }
            </li>
          ))}
        </ul>
      </div >
    );
  }
}

export default App;
