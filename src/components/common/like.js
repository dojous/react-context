import React from 'react';


class Like extends React.Component {

   

state={isLike: false};

    handleEvent =()=>{
        this.setState((prevState, props) => {
             return {liked: !prevState.liked}}
          )

          this.props.onLikeEvent();
        
    }


    render(){
        const {liked} = this.state;

        let classname = 'fa fa-heart';

      if (liked) classname+='-o';


       
        
return (


<i  onClick={this.handleEvent} className={classname} aria-hidden="true"></i>


)
    }
}



export default Like;