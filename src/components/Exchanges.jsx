import React from 'react';
import { Row, Col } from 'antd';

import { useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

// Note: The /exchanges endpoint requires a premium RapidAPI plan, so the
// table below is rendered empty and the row-mapping logic stays commented
// out until you're on a plan that supports it.
const Exchanges = () => {
  const { isFetching } = useGetExchangesQuery();

  if (isFetching) return <Loader />;

  return (
    <>
      <Row>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      <Row>
        {/* Premium endpoint — mapping omitted */}
      </Row>
    </>
  );
};

export default Exchanges;
