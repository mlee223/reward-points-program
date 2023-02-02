import React from "react";
import { RewardsContext } from "../contexts/RewardsContext";

export const useRewardsContext = () => React.useContext(RewardsContext);
