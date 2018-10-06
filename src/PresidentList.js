import React, { Component } from 'react';

const President = (props) => (
  <tr key={props.name}>
      <td>{props.name}</td>
      <td>{new Intl.DateTimeFormat('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: '2-digit' 
        }).format(Date.parse(props.birthDay))}</td>
      <td>{props.birthPlace}</td>
      <td>{props.deathDay === null ? "" : new Intl.DateTimeFormat('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: '2-digit'
        }).format(Date.parse(props.deathDay))}</td>
      <td>{props.deathPlace}</td>
  </tr>
)

class PresidentList extends Component {
  url;

  constructor(props){
    super();
    this.state = {
      presidents: [],
      historySortBy: '',
      isDescending: false
    }
  };

  componentDidMount() {
    this.loadData('');
  }

  componentWillReceiveProps(props) {
    this.setState({presidents: []})
    this.loadData(props.sortValue);
  }

  loadData(sortBy) {
    this.url = 'https://globantpresidentservice.azurewebsites.net/api/President';
    if (sortBy)
    {
      this.url = this.url + '?sortBy=' + sortBy;
      if (sortBy === this.state.historySortBy)
      {
        this.url = this.url + "&isDescending=" + (this.state.isDescending === false ? true : false)
        this.setState({isDescending: (this.state.isDescending === false ? true : false)})
      }
    }

    //alert(this.url);
    fetch(this.url)
    .then(response => response.json())
    .then(presidents => {
      presidents.forEach(element => {
        let data = {
          name: element.name,
          birthDay: element.birthDay,
          birthPlace: element.birthPlace,
          deathDay: element.deathDay,
          deathPlace: element.deathPlace
        }
        this.setState({presidents: this.state.presidents.concat([data]), historySortBy: sortBy, isDescending: (this.state.isDescending === false ? true : false)})
      });
    })
  }

  render(){
    console.log( this.state.presidents.length )
    if( this.state.presidents.length > 0 ){
      return(
        <tbody>
          { this.state.presidents.map(element => 
          <President key={element.name} 
          name={element.name} 
          birthPlace={element.birthPlace}
          birthDay={element.birthDay} 
          deathDay={element.deathDay} 
          deathPlace={element.deathPlace} />) }
        </tbody>
      )
  
    }
    return(
      <tbody>
        <tr>
          <td colSpan="5"><p>Loading presidents list...</p></td>
        </tr>
      </tbody>
    )
  }
}

export default PresidentList;