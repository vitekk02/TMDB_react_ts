import { Col, Row } from 'antd';
import React, { FunctionComponent, memo } from 'react';

import { Review } from '../../../review';

interface Props {
  review: Review;
}

const BaseReviewDetail: FunctionComponent<Props> = (props) => {
  const { review } = props;
  return (
    <div>
      <Row>
        <Col span={20}>
          <h3>
            Author:
            {review.author}
          </h3>
        </Col>
        <Col span={2}>
          <h5>
            Rating:
            {review.author_details.rating}
          </h5>
        </Col>
      </Row>
      <p>{review.content}</p>
    </div>
  );
};

export const ReviewDetail = memo(BaseReviewDetail);
