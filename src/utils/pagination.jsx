import _ from 'lodash'

export function pagination(items, pageSize, pageNumeber){

    console.log('items',items,'pageSize', pageSize,'pageNumbers', pageNumeber)

    const startIndex = (pageNumeber-1) * pageSize;
    const movies = _(items).slice(startIndex).take(pageSize).value();

    console.log('startIndex', startIndex)

    console.log('movies-pagination', movies)






    return movies;
}