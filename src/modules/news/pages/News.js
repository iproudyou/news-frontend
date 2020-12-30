import React from 'react';
import { useQuery } from 'react-query';
import Header from '../../common/pages/Header';
import newsArticleStyle from '../styles/newsArticle';
import NewsArticle from '../components/newsArticle';
import { getAllNewsApi } from '../stores/newsApi';
import CircularIndeterminate from '../../common/components/progressBar';

export default function News() {
  const classes = newsArticleStyle();
  const { data, isLoading } = useQuery('news', async () => {
    const { data } = await getAllNewsApi();
    return data.data;
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
