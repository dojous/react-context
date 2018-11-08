import React from 'react';

class ListGroup extends React.Component
{
   


clickHandle =(currentGenre)=> {


this.setState({currentGenre})
this.props.onFilterHandle(currentGenre);
}

render(){
    const {genres, selectedItem} = this.props;
   

    
return(    


<React.Fragment>
    <ul className="list-group">
    

{genres.map(item => (

<li key={item.name}
onClick={()=>this.clickHandle(item.name)}
className={item.name === selectedItem ? "list-group-item active" : "list-group-item"}>{item.name}</li>


))}


  
</ul>
    </React.Fragment>
)
}
}


export default ListGroup;
