import React, { useState } from 'react';
import { millify } from 'millify';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Radio, Typography } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { useGetTopMoversQuery } from '../services/cryptoApi';
import Loader from './Loader';

const { Text } = Typography;

// CoinRanking's /exchanges endpoint needs a paid plan we're not on. This
// swaps that dead tab for Top Movers, built on /coins?orderBy=change,
// which is fully available on the free plan.
const Exchanges = () => {
  const [direction, setDirection] = useState('desc');
  const { data, isFetching } = useGetTopMoversQuery({ direction, count: 20 });

  if (isFetching) return <Loader />;

  const isGainers = direction === 'desc';

  return (
    <>
      <Radio.Group value={direction} onChange={(e) => setDirection(e.target.value)} style={{ marginBottom: 24 }}>
        <Radio.Button value="desc">Top Gainers</Radio.Button>
        <Radio.Button value="asc">Top Losers</Radio.Button>
      </Radio.Group>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {data?.data?.coins?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.uuid}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} alt={currency.name} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>
                  24h Change:{' '}
                  <Text type={isGainers ? 'success' : 'danger'}>
                    {isGainers ? <ArrowUpOutlined /> : <ArrowDownOutlined />} {currency.change}%
                  </Text>
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;