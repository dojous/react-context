import React, { Component } from 'react';

import { getMovies, deleteMovie, addMovie } from '../services/fakeMovieService'
import Movie from './movie'
import LangContext from '../context/LangContext';
import ThemeContext from '../context/ThemeContext';

class Movies extends Component {
    state = {
        numbers: 0,
        movies: []
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
        let movieObj = {

            title: `TEST ${this.state.numbers + 1}`,
            genre: { name: `TEST ${this.state.numbers + 1}` },
            numberInStock: `TEST ${this.state.numbers + 1}`,
            dailyRentalRate: `TEST ${this.state.numbers + 1}`

        }
        console.log(movieObj)
        const xx = addMovie(movieObj)

        this.setState({ tableList: xx, numbers: this.state.numbers + 1 })



    }




    render() {
        const { movies } = this.state;


        console.log(movies)

        



        return (
            <ThemeContext.Consumer>
            {
              (theme) => (
                <LangContext.Consumer>
                  {
                    language => (
             <div style={{color: theme.config.fontColor, background: theme.config.bodybg}}>

            <div className="container" >
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
                <td><ButtonAdd onHandleAdd={this.handleAdd} /></td>
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


    handleAdd() {
        this.props.onHandleAdd();
    }

    render() {




        return (<button type="button" className="btn btn-success btn-sm" onClick={() => this.handleAdd()}>Add record</button>)
    }
}


export default Movies;