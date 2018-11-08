import React, { Component } from "react";

import { getMovies, deleteMovie, addMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Movie from "./movie";
import LangContext from "../context/LangContext";
import ThemeContext from "../context/ThemeContext";
import ListGroup from "../components/listGroup";

import Pagination from "../components/Pagination"
import {pagination} from '../utils/pagination'
import _ from 'lodash'

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Movies extends Component {
  state = {
    numbers: 0,
    movies: [],
    genres: [],
    title: null,
    genre: null,
    stock: null,
    rate: null,
    formErrors: {
      title: "",
      genre: "",
      stock: "",
      rate: ""
    },
    invalid: false,
    currentPage:1,

    pageSize:4,
    pages: 1,
    currentGenre:'All genres'




  };

  componentDidMount() {
    const movies = getMovies();
    let genres = getGenres();
    genres = [{name: 'All genres'},...genres]
    this.setState({ movies: movies, numbers: movies.length , genres});
  }


handleFilter =(currentGenre) =>{
console.log('currentGenre',currentGenre)
this.setState({currentGenre, currentPage: 1})

}


  handleBTnCliced = id => {
    console.log(id);
    deleteMovie(id);

    this.setState({
      tableList: getMovies(),
      function(prevState, props) {
        return { numbers: prevState.numbers - 1 };
      }
    });
  };



  handlePageChange=(page)=>{
    console.log('Page', page)
    this.setState({currentPage: page})

  }

  handleAdd = () => {
    if (formValid(this.state)) {
      let movieObj = {
        title: this.state.title,
        genre: { name: this.state.genre },
        numberInStock: this.state.stock,
        dailyRentalRate: this.state.rate
      };
      console.log(movieObj);
      // let formErrors = { ...this.state.formErrors };

      let xx = addMovie(movieObj);

      this.setState({
        tableList: xx,
        function(prevState, props) {
          return { numbers: prevState.numbers + 1 };
        },
        invalid: false
      });
      this.handleFormItems(this.state);
    } else {
      this.setState({ invalid: true });
      console.log("Form invalid");
    }
  };

  handleFormItems = ({title})=>{
   
  }

  handleChange = e => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = { ...this.state.formErrors };

    console.log(name);
    switch (name) {
      case "title":
        formErrors.title =
          value.length < 3 ? "minimum 3 characaters required" : "";

        break;
      case "genre":
        formErrors.genre =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "stock":
        formErrors.stock =
          value.length < 3 ? "minimum 3 characaters required" : "";
        break;
      case "rate":
        formErrors.rate =
          value.length < 1 ? "minimum 1 characaters required" : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value });
    console.log(name, value);
  };


  render() {
  
    const { movies: allMovies, formErrors , pageSize,  currentPage, currentGenre} = this.state;
    
   
     const filtered =  currentGenre === 'All genres' ? allMovies : allMovies.filter(item => item.genre.name === currentGenre);
    
     const {length: count} = filtered;
 
    
   const movies  = pagination(filtered, pageSize, currentPage)

   

    return (
      <ThemeContext.Consumer>
        {theme => (
          <LangContext.Consumer>
            {language => (
              <div
                style={{
                  color: theme.config.fontColor,
                  background: theme.config.bodybg
                }}
              >
                <div className="container">
                  <div className="row">


<div className="col-sm">



  <ListGroup genres = {this.state.genres} onFilterHandle={this.handleFilter} selectedItem = {this.state.currentGenre}/>


</div>


                    <div className="col-sm-7">
                      {this.state.numbers === 0 ? (
                        <h1>{language.labels.error}</h1>
                      ) : (
                        <h1>
                          {language.labels.body.replace(
                            "&{number}",
                            count
                          )}
                        </h1>
                      )}

                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col">Action</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {movies.map(item => (
                            <Movie
                              key={item._id}
                              item={item}
                              onHandleDelete={() =>
                                this.handleBTnCliced(item._id)
                                
                              }
                             
                            />
                          ))}
                        </tbody>
                      </table>
                      {/* <td><ButtonAdd onHandleAdd={this.handleAdd} /></td> */}
                  
                      <Pagination 
                      itemsCount = {count} pageSize={pageSize} 
                      onPageCHange={this.handlePageChange}
                      currentPage = {this.state.currentPage}
                      />
                    </div>

                    <div className="col-sm">
                      <div
                        className="fixed"
                        style={{
                          border: theme.config.formBorder,
                          backgroundColor: theme.config.backGroundForm
                        }}
                      >
                        {this.state.invalid && (
                          <span style={{ color: "red" }}>
                            {language.labels.formValid}
                          </span>
                        )}
                        <form>
                          <div className="form-group">
                            <label htmlFor="title">
                              {language.labels.title}
                            </label>
                            <input
                              type="text"
                              name="title"
                              className="form-control"
                              id="title"
                              placeholder={language.labels.title}
                              onChange={this.handleChange}
                            />
                            {formErrors.title.length > 0 && (
                              <span className="errorMessage">
                                {formErrors.title}
                              </span>
                            )}
                          </div>
                          <div className="form-group">
                            <label htmlFor="genre">Genre</label>
                            <input
                              type="text"
                              name="genre"
                              className="form-control"
                              id="genre"
                              placeholder="Genre"
                              onChange={this.handleChange}
                            />
                            {formErrors.genre.length > 0 && (
                              <span className="errorMessage">
                                {formErrors.genre}
                              </span>
                            )}
                          </div>

                          <div className="form-group">
                            <label htmlFor="stock">Stock</label>
                            <input
                              type="text"
                              name="stock"
                              className="form-control"
                              id="stock"
                              placeholder="Stock"
                              onChange={this.handleChange}
                            />
                            {formErrors.stock.length > 0 && (
                              <span className="errorMessage">
                                {formErrors.stock}
                              </span>
                            )}
                          </div>

                          <div className="form-group">
                            <label htmlFor="rate">Rate</label>
                            <input
                              type="text"
                              name="rate"
                              className="form-control"
                              id="rate"
                              placeholder="Rate"
                              onChange={this.handleChange}
                            />
                            {formErrors.rate.length > 0 && (
                              <span className="errorMessage">
                                {formErrors.rate}
                              </span>
                            )}
                          </div>

                          <ButtonAdd onHandleAdd={this.handleAdd} />
                          {/* <button type="submit" className="btn btn-primary">Add record</button> */}
                        </form>
                       
                        {this.state.numbers === 0 ? (
                          <span>{language.labels.error}</span>
                        ) : (
                          <span>
                            {language.labels.body.replace(
                              "&{number}",
                              count
                            )}
                          </span>
                        )}
                      </div>
                      
                    </div>
                  </div>
                </div>
              </div>
            )}
          </LangContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class ButtonAdd extends React.Component {
  handleAdd = () => {
    this.props.onHandleAdd();
  };

  render() {
    return (
      <button
        type="button"
        className="btn btn-success btn-sm"
        onClick={this.handleAdd}
      >
        Add record
      </button>
    );
  }
}

export default Movies;
