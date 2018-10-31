import React, { Component } from 'react';

class Movie extends Component {


    handleDelete = (id) => {
        this.props.onHandleDelete(id);



    }


    render() {

        const { item } = this.props;
        return (
            <React.Fragment>

                <tr>

                    <td>{item.title}</td>
                    <td>{item.genre.name}</td>
                    <td>{item.numberInStock}</td>
                    <td>{item.dailyRentalRate}</td>
                    <td><ButtonDelete onDelete={() => this.handleDelete(item._id)} id={item._id} /></td>
                </tr>


            </React.Fragment>
        );
    }
}


class ButtonDelete extends React.Component {


    handleChange(id) {
        this.props.onDelete(id);
    }

    render() {

        return (<button type="button" className="btn btn-danger btn-sm" onClick={() => this.handleChange(this.props.id)}>Delete</button>)
    }
}


export default Movie;