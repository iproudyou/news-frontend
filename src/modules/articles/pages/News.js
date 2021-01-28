import React from 'react';
import { useQuery } from 'react-query';
import Header from '../../common/pages/Header';
import newsArticleStyle from '../styles/newsArticle';
import NewsArticle from '../components/newsArticle';
// import { getAllNewsApi } from '../stores/newsApi';
import { allArticles } from '../stores/graphql';
import CircularIndeterminate from '../../common/components/progressBar';

export default function News() {
  const classes = newsArticleStyle();
  const { data, isLoading } = useQuery('news', async () => {
    // RESTful API
    // const { data } = await getAllNewsApi();
    
    // GraphQL API
    const { data } = await allArticles();
    return data.data.allArticles;
  });
  
  return (
    <>
      <Header />
      <div className={classes.all_news}>
        {isLoading ? <CircularIndeterminate /> : data.map(article => {
          return <NewsArticle data={article} key={article.url} />
        })}
      </div>
    </>
  )
}