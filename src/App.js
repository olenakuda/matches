import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import axios from "axios";
import React from 'react';


export default class App extends React.Component {
  
  urlStatistics = `http://localhost:3000/matches`;  

  constructor(props){ 
      super(props) 
    
      this.state = {        
        statistics: []
      };
    }

  componentDidMount() {    
    const self = this;
    axios.get(this.urlStatistics).then(res => {
      self.setState({
        statistics : res.data.statistics
      });        
    })
  }

  render() {    
    return <div>

      {this.state.statistics.map(statisticsItem =>

        <div class="card mb-3">
          <img src="https://www.sportradar.com/wp-content/uploads/sites/21/2021/07/Sportradar-Header-Running_Female.jpg" class="card-img-top" alt="..."/>
          <div class="card-body">
            <h1 class="card-title">{statisticsItem.tournament.name}</h1>
            <p class="card-text">
              {statisticsItem.matches.map(match => 
                <div>
                  {Scores(match)}
                </div>
                )}
            </p>
          </div>
          <p class="card-text m-2"><small class="text-muted">Last update: {formatDate(Date.now())}</small></p>
        </div>
      )}


    </div>;
  }
}

function Scores(match){
  return (  
      <ul class="list-group mb-2">
         
        <li class="list-group-item d-flex justify-content-between align-items-center fs-5">
            <span>
              <span>{match.teams.home}</span>
              <span class="badge bg-primary rounded-pill ms-2 me-2">{match.score.home}</span>
              - 
              <span class="ms-2">{match.teams.away}</span>
              <span class="badge bg-primary rounded-pill ms-2">{match.score.away}</span>
            </span>
            
            <span class="badge bg-secondary rounded-pill align-"> {formatDate(match.dateTime)}</span>
        </li>
        <li class="list-group-item align-items-center fst-italic fw-light">
          {Events(match)}
        </li>
        
      </ul>
  );
}

function formatDate(dateTime){
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  const date = new Date(dateTime);
  return date.toLocaleDateString([],options);
}

function Events(match){
  const events = match.events.split(",");
  return (  events.map(event =>      
        <div class="mb-1">{event}
        </div>  
      )
  );
}
