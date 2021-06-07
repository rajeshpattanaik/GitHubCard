import './App.css';
import React from 'react';
import axios from 'axios';

const testData = [
    {name: "Dan Abramov", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4", company: "@facebook"},
    {name: "Sophie Alpert", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4", company: "Humu"},
    {name: "Sebastian Markbåge", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4", company: "Facebook"},
];

class Form extends React.Component{
  state = {userName: ''};
  handleSubmit = async (event)=>{
    event.preventDefault();
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({userName: ''});
  };
  render(){
    return (
      <form onSubmit={this.handleSubmit}> 
        <input type="text"
         placeholder="GitHub User" 
         value={this.state.userName}
         onChange={event => this.setState({userName: event.target.value})}
         required></input>   
        <button>Add Card</button>
      </form>
    );
  }
}


class Card extends React.Component
{
  render(){
   const profile = this.props;
    return (
      <div className="github-profile" style={{margin: '1rem'}}>
      <img alt="" src={profile.avatar_url}/>
        <div className="info" style={{display: 'inline-block', marginLeft: 10}}>
          <div className="name" style={{fontSize:'125%'}}>{profile.name}</div>
          <div className="company">{profile.company}</div>
        </div>
    </div>
    );
  }
}

class CardList extends React.Component {
  render() {
    {
      return (
        <div>
          {this.props.profile.map(profile => <Card key={profile.id} {...profile} />)}
        </div>
      );
    }
  }
}

class App extends React.Component
{
  state = {
    profile: []
  }; 
addNewProfile = (profileData) => {
  this.setState(prevState => ({
    profile: [...prevState.profile, profileData],
  }));
}

  render(){
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile}/>
        <CardList profile={this.state.profile}/>
      </div>
    );
  }
}

export default App;
