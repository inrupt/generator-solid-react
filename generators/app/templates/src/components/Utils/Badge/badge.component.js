import React from "react";

import { BadgeWrapper } from "./badge.style";

type Props = {
  badge: Number
};

const Badge = ({ badge }: Props) => {
  return <BadgeWrapper>{badge}</BadgeWrapper>;
};

export default Badge;
