import React, { Component } from 'react';

import _ from 'lodash'

const Pagination = (props) => {

    const {itemsCount, pageSize, onPageCHange, currentPage} = props
    let paginationNumber = Math.ceil(itemsCount/pageSize);

    console.log('PaginatioNnaumber',itemsCount, pageSize,paginationNumber)


   let pagesMap =  _.range(1, paginationNumber+1);

   

  

if(paginationNumber===1) return null;

    return ( 
        <nav >
  <ul className="pagination">
  {pagesMap.map(page=>
  <li key={page}  className =  {page === currentPage ? 'page-item active': 'page-item'}><a onClick ={()=> onPageCHange(page)} 
  className='page-link'>{page}</a></li>
  )
  

  }
 
   
    
  </ul>
</nav>
     );

}
 
export default Pagination;
 
