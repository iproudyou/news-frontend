import React, { useContext }  from 'react';
import Header from '../../common/pages/Header';
import newsArticleStyle from '../styles/newsArticle';
import authContext from '../../signUp/stores/authContext';
import NewsArticle from '../components/newsArticle';

export default function News() {
  const classes = newsArticleStyle();
  const { state } = useContext(authContext);

  return (
    <>
      <Header />
      <div className={classes.all_news}>
        {state.news.map(article => {
          return <NewsArticle data={article} key={article.url} />
        })}
      </div>
    </>
  )
}
