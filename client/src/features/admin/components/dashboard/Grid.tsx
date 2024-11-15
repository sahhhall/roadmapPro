import React from "react";
import { StatCards } from "./StatCards";

interface IStatCardData {
  id: string;
  title: string;
  value: string;
  trend: "up" | "down";
  changePercentage: number;
  pillText: string;
  period: string;
}

interface GridProps {
  stats: IStatCardData[];
}

const Grid: React.FC<GridProps> = ({ stats }) => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <StatCards stats={stats} />
    </div>
  );
};

export default Grid;
