import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const {
    data: cryptoNews,
    isLoading,
    isError,
    error,
  } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

  if (isLoading) return <Loader />;

  if (isError) {
    console.error('News API error:', error);
    return <Text type="danger">Couldn't load news right now — check the console for details.</Text>;
  }

  if (!cryptoNews?.results) return <Loader />;

  const cryptoOptions = [
    { value: 'Cryptocurrency', label: 'Cryptocurrency' },
    ...(data?.data?.coins?.map((currency) => ({ value: currency.name, label: currency.name })) || []),
  ];

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="label"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
            options={cryptoOptions}
          />
        </Col>
      )}
      {cryptoNews.results.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={news.article_id || i}>
          <Card hoverable className="news-card">
            <a href={news.link} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.title}</Title>
                <img src={news.image_url || demoImage} alt="" />
              </div>
              <p>{news.description && news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.source_icon || demoImage} alt="" />
                  <Text className="provider-name">{news.source_id}</Text>
                </div>
                <Text>{moment(news.pubDate).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;