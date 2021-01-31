import gql from 'graphql-tag';
import { print } from 'graphql/language/printer';
import customAxios from '../../../config/customAxios';


export const allArticles = async () => {
    try {
        return await customAxios({
            method: 'post',
            url: '/graphql',
            data: {
                query: print(gql`
                    query {
                        allArticles {
                            _id
                            url
                            source
                            category
                            author
                            publishedAt
                            title
                            description
                            content
                            urlToImage
                        }
                    }
                `)
            }
        })
    } catch (err) {
        throw new Error();
    }
}

export const getArticleByCatetogy = async (category) => {
    try {
        return await customAxios({
            method: 'post',
            url: '/graphql',
            data: {
                query: print(gql`
                    query {
                        getArticleByCatetogy(category: "${category}") {
                            _id
                            url
                            source
                            category
                            author
                            publishedAt
                            title
                            description
                            content
                            urlToImage
                        }
                    }
                `)
            }
        })
    } catch (err) {
        throw new Error();
    }
}
