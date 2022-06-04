import React from 'react';

const Categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

type News = {
  author: string;
  title: string;
  description: string;
};

const fetchNews = (category: string, keyword?: string): Promise<News[]> => {
  return window
    .fetch(
      `https://newsapi.org/v2/top-headlines?apiKey=ad43217e23534695b348069404d0492a&category=${category}${
        !!keyword && '&q=' + keyword
      }`
    )
    .then((res) => res.json())
    .then((res) => res.articles);
};

const Search = () => {
  const [keyword, setKeyword] = React.useState('');
  const [category, setCategory] = React.useState(Categories[0]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [news, setNews] = React.useState<News[] | null>(null);

  function handleKeywordChange(value: string) {
    setKeyword(value);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
  }

  async function handleSubmit() {
    setIsLoading(true);
    const news = await fetchNews(category, keyword);
    setNews(news);
    setIsLoading(false);
  }

  // testing-library/react
  // Enzyme
  return (
    <div>
      <SearchForm
        keyword={keyword}
        onKeywordChange={handleKeywordChange}
        category={category}
        onCategoryChange={handleCategoryChange}
        onSubmit={handleSubmit}
      />

      <p>Searches for {keyword ? keyword : '...'}</p>
      {isLoading && 'Loading...'}
      {!!news && <SearchResult news={news} />}
    </div>
  );
};

type SearchProps = {
  keyword: string;
  category: string;
  onKeywordChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSubmit: () => void;
};

const SearchForm = ({
  keyword,
  onKeywordChange,
  category,
  onCategoryChange,
  onSubmit,
}: SearchProps) => {
  return (
    <>
      <div>
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <select
          data-testid="select"
          name="category"
          id="category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {Categories.map((i) => {
            return (
              <option key={i} value={i}>
                {' '}
                {i}
              </option>
            );
          })}
        </select>
      </div>
      <button data-testid="submit-button" onClick={onSubmit}>
        submit
      </button>
    </>
  );
};

const SearchResult = ({ news }: { news: News[] }) => {
  return (
    <>
      <h2 data-testid="news-heading">News</h2>
      {news.map((n) => (
        <div key={n.title}>
          <h4>{n.title}</h4>
          <h6>{n.author}</h6>
          <p>{n.description}</p>
        </div>
      ))}
    </>
  );
};

export default Search;
