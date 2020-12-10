import React, { useState } from 'react';
import { Box, Icon, PseudoBox, Stack, Text } from '@chakra-ui/core';

interface RatingProps {
  size: number;
  icon: string;
  scale: number;
  fillColor: string;
  strokeColor: string;
}

interface RatingButtonProps {
  idx: number;
  fill: boolean;
}
const Rating = React.forwardRef(
  ({ size, icon, scale, fillColor, strokeColor }: RatingProps, ref) => {
    const [rating, setRating] = useState<number>(0);
    const buttons = [];

    const handleClicked = (idx: number) => {
      if (!Number.isNaN(idx)) {
        if (rating === 1 && idx === 1) {
          setRating(0);
        } else {
          setRating(idx);
        }
      }
    };
    const RatingIcon = ({ fill }: boolean) => (
      <Icon
        name={icon}
        size={`${size}px`}
        color={fillColor}
        stroke={strokeColor}
        fillOpacity={fill ? '100%' : '0'}
      />
    );

    const RatingButton = ({ idx, fill }: RatingButtonProps) => (
      <PseudoBox
        as="button"
        aria-label={`Rate ${idx}`}
        height={`${size}px`}
        width={`${size}px`}
        mx={1}
        onClick={() => handleClicked(idx)}
        _focus={{ outline: 0 }}
      >
        <RatingIcon fill={fill} />
      </PseudoBox>
    );
    for (let i = 1; i <= scale; i++) {
      buttons.push(<RatingButton key={i} idx={i} fill={i <= rating} />);
    }
    return (
      <Stack isInline mt={8} justify="center">
        <input name="rating" type="hidden" value={rating} ref={ref} />
        {buttons}
        <Text>{rating}</Text>
      </Stack>
    );
  }
);

Rating.displayName = 'Rating';

export default Rating;
