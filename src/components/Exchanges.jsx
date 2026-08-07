import React from 'react';
import { Empty, Typography } from 'antd';

const { Paragraph } = Typography;

// The /exchanges endpoint on CoinRanking requires a paid RapidAPI plan.
// We're on the free tier, so skip the request entirely rather than firing
// a call that will always fail, and show an honest empty state instead.
const Exchanges = () => (
  <Empty
    description={
      <Paragraph>
        Exchange data requires a premium CoinRanking plan.
        <br />
        Upgrade your RapidAPI subscription to unlock this page.
      </Paragraph>
    }
    style={{ marginTop: '4rem' }}
  />
);

export default Exchanges;