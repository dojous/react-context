import React, { Component } from 'react';


import './Custom.css'
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";

import Movies from './components/movies'
import Header from './Header';
import ThemeContext from './context/ThemeContext';
import LangContext from './context/LangContext';
import {labels} from './context/LangContext';
import {themeConfig} from './context/ThemeContext';
import NavBar from './components/navBar'
class App extends Component {

  constructor() {
    super();
    this.state = {
      language: 'en',
      theme: 'light'
    }
    
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
           
         <NavBar/>

        <Movies />
        
        </LangContext.Provider>
      </ThemeContext.Provider>
    
      
    );
  }
}





export default App;
