import React, { Component } from 'react';


import './Custom.css'
import "bootstrap/dist/css/bootstrap.css";

import Movies from './components/movies'
import Header from './Header';
import ThemeContext from './context/ThemeContext';
import LangContext from './context/LangContext';
import {labels} from './context/LangContext';
import {themeConfig} from './context/ThemeContext';

class App extends Component {

  constructor() {
    super();
    this.state = {
      language: 'en',
      theme: 'light'
    }
    // this.toggleLanguage = this.toggleLanguage.bind(this);
    // this.toggleTheme = this.toggleTheme.bind(this);
  }
  toggleLanguage=(newLang) => {
    this.setState({
      language: newLang
    });
  }

  toggleTheme = (newTheme) => {
    this.setState({
      theme: this.state.theme === "dark" ? "light" : "dark"
    });
  }


  render() {



    return (
     
<ThemeContext.Provider value={{type: this.state.theme, config: themeConfig[this.state.theme]}}>
        <LangContext.Provider value={{name: this.state.language, labels: labels[this.state.language]}}>
            <Header toggleLanguage={this.toggleLanguage} toggleTheme={this.toggleTheme}/>
           
        <Movies />
        
        </LangContext.Provider>
      </ThemeContext.Provider>
    
      
    );
  }
}





export default App;
