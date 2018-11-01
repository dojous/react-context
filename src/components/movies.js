import React, { Component } from 'react';

import { getMovies, deleteMovie, addMovie } from '../services/fakeMovieService'
import Movie from './movie'
import LangContext from '../context/LangContext';
import ThemeContext from '../context/ThemeContext';


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
        title: null,
        genre: null,
        stock: null,
        rate: null,
        formErrors: {
            title: "",
            genre: "",
            stock: "",
            rate: ""
        }
    }



    componentDidMount() {

        const movies = getMovies();
        this.setState({ movies: movies, numbers: movies.length })


    }

    handleBTnCliced = (id) => {
        console.log(id)
        deleteMovie(id)

        this.setState({ tableList: getMovies(), numbers: this.state.numbers - 1 })



    }

    handleAdd = () => {
        if (formValid(this.state)) {
            let movieObj = {

                title: this.state.title,
                genre: { name: this.state.genre },
                numberInStock: this.state.stock,
                dailyRentalRate: this.state.rate

            }
            console.log(movieObj)
            const xx = addMovie(movieObj)

            this.setState({ tableList: xx, numbers: this.state.numbers + 1, title: null, genre: null, stock: null, rate: null })
        } else {
            alert('Form invalid')
        }


    }

    handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;

        let formErrors = { ...this.state.formErrors };
        console.log(name)
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
        this.setState({ formErrors, [name]: value })
        console.log(name, value)

    }
    render() {
        const { movies, formErrors } = this.state;

        console.log(movies)





        return (
            <ThemeContext.Consumer>
                {
                    (theme) => (
                        <LangContext.Consumer>
                            {
                                language => (
                                    <div style={{ color: theme.config.fontColor, background: theme.config.bodybg }}>


                                        <div className="container" >


                                            <div class="row">
                                                <div className="col-sm-9 col-md-6 col-lg-8" >

                                                    {this.state.numbers === 0 ? <h1>{language.labels.error}</h1> :
                                                        <h1>{language.labels.body.replace('&{number}', movies.length)}</h1>

                                                    }





                                                    <table className="table">

                                                        <thead>
                                                            <tr>
                                                                <th scope="col">Title</th>
                                                                <th scope="col">Genre</th>
                                                                <th scope="col">Stock</th>
                                                                <th scope="col">Rate</th>
                                                                <th scope="col">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {movies.map((item) => (
                                                                <Movie key={item._id} item={item} onHandleDelete={() => this.handleBTnCliced(item._id)} />

                                                            ))
                                                            }






                                                        </tbody>
                                                    </table>
                                                    {/* <td><ButtonAdd onHandleAdd={this.handleAdd} /></td> */}
                                                </div>

                                                <div className="col-sm-3 col-md-6 col-lg-4" >
                                                    <div className="fixed" style={{ border: theme.config.formBorder, backgroundColor: theme.config.backGroundForm }}>
                                                        <form>
                                                            <div className="form-group">
                                                                <label for="title">{language.labels.title}</label>
                                                                <input type="text" name='title' className="form-control" id="title" aria-describedby="title" placeholder={language.labels.title} onChange={this.handleChange} />
                                                                {formErrors.title.length > 0 && (
                                                                    <span className="errorMessage">{formErrors.title}</span>
                                                                )}
                                                            </div>
                                                            <div className="form-group">
                                                                <label for="genre">Genre</label>
                                                                <input type="text" name='genre' className="form-control" id="genre" placeholder="Genre" onChange={this.handleChange} />
                                                                {formErrors.genre.length > 0 && (
                                                                    <span className="errorMessage">{formErrors.genre}</span>
                                                                )}
                                                            </div>


                                                            <div className="form-group">
                                                                <label for="stock">Stock</label>
                                                                <input type="text" name='stock' className="form-control" id="stock" placeholder="Stock" onChange={this.handleChange} />
                                                                {formErrors.stock.length > 0 && (
                                                                    <span className="errorMessage">{formErrors.stock}</span>
                                                                )}
                                                            </div>

                                                            <div className="form-group">
                                                                <label for="rate">Rate</label>
                                                                <input type="text" name='rate' className="form-control" id="rate" placeholder="Rate" onChange={this.handleChange} />
                                                                {formErrors.rate.length > 0 && (
                                                                    <span className="errorMessage">{formErrors.rate}</span>
                                                                )}
                                                            </div>

                                                            <ButtonAdd onHandleAdd={this.handleAdd} />
                                                            {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                                                        </form>
                                                    </div>
                                                </div>


                                            </div>




                                        </div>
                                    </div>

                                )
                            }
                        </LangContext.Consumer>
                    )
                }
            </ThemeContext.Consumer>


        );
    }
}



class ButtonAdd extends React.Component {


    handleAdd = () => {
        this.props.onHandleAdd();
    }

    render() {




        return (<button type="button" className="btn btn-success btn-sm" onClick={this.handleAdd}>Add record</button>)
    }
}


export default Movies;