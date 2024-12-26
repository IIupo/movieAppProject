import React from 'react';
import { getRatingColor } from '../../utils/ratings';
import styles from './RatingBadge.module.css';

interface RatingBadgeProps {
  rating: number;
}

export const RatingBadge: React.FC<RatingBadgeProps> = ({ rating }) => (
  <div className={styles.rating_badge_placement}>
    <div
      className={styles.rating_badge}
      style={{ borderColor: getRatingColor(rating) }}
    >
      {rating.toFixed(1)}
    </div>
  </div>
);
