import React, { Component } from 'react'
import ListContacts from './ListContacts'
import * as ContactsAPI from './utils/ContactsAPI'
import CreateContact from './CreateContact'
import { Route } from 'react-router-dom'

class App extends Component {
  state = {
    contacts: [],
  }

  componentDidMount() {
    ContactsAPI.getAll()
      .then((contacts) => {
        this.setState(() => ({
          contacts
        }))
        console.log(contacts)
      })
  }

  // becasue the state is in App class, so removeContact is in App 
  removeContact = (contact) => { // pass in the contact which is going to remove
    // remove the contact at front end browser
    this.setState((currentState) => ({
      contacts: currentState.contacts.filter((c) => {
        return c.id !== contact.id
      })
    }))

    // remove the contact at back end database
    ContactsAPI.remove(contact);
  }

  // add new contact
  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact) => {
        this.setState((currentState) => {
          contacts: currentState.contacts.concat([contact])
    })})
  }


  render() {
    return (
      <div>
        <Route exact path='/' render={() => (
            <ListContacts 
              contacts={this.state.contacts} 
              onDeleteContact={this.removeContact} 
            />
          )} />
        <Route path='/create' render={({ history }) => (
            <CreateContact
              onCreateContact={(contact) => {
                this.createContact(contact)
                history.push('/')
              }}
            />
          )}
        />
          
      </div>
    )
  }
}

export default App

// import React, { Component } from 'react'
// import ListContacts from './ListContacts'
// import * as ContactsAPI from './utils/ContactsAPI'
// import CreateContact from './CreateContact'
// import { Route } from 'react-router-dom'

// class App extends Component {
//   state = {
//     contacts: []
//   }
//   componentDidMount() {
//     ContactsAPI.getAll()
//       .then((contacts) => {
//         this.setState(() => ({
//           contacts
//         }))
//       })
//   }
//   removeContact = (contact) => {
//     this.setState((currentState) => ({
//       contacts: currentState.contacts.filter((c) => {
//         return c.id !== contact.id
//       })
//     }))

//     ContactsAPI.remove(contact)
//   }
//   createContact = (contact) => {
//     ContactsAPI.create(contact)
//       .then((contact) => {
//         this.setState((currentState) => ({
//           contacts: currentState.contacts.concat([contact])
//         }))
//       })
//   }
//   render() {
//     return (
//       <div>
//         <Route exact path='/' render={() => (
//           <ListContacts
//             contacts={this.state.contacts}
//             onDeleteContact={this.removeContact}
//           />
//         )} />
//         <Route path='/create' render={({ history }) => (
//           <CreateContact
//             onCreateContact={(contact) => {
//               this.createContact(contact)
//               history.push('/')
//             }}
//           />
//         )} />
//       </div>
//     )
//   }
// }

// export default App
