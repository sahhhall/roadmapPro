import { TrendingDown, TrendingUp } from "lucide-react";

interface IStatCardData {
  id: string;
  title: string;
  value: string;
  trend: "up" | "down";
  pillText: string;
  period: string;
}

export const StatCards = ({ stats }: { stats: IStatCardData[] }) => {
  return (
    <>
      {stats.map((stat) => (
        <Card
          key={stat.id}
          title={stat.title}
          value={stat.value}
          pillText={stat.pillText}
          trend={stat.trend}
          period={stat.period}
        />
      ))}
    </>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
  period,
}: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
  period: string;
}) => {
  return (
    <div className="p-4 rounded border border-stone-300 col-span-4">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-xs sm:text-sm">{title}</h3>
          <p className="sm:text-3xl text-1xl  font-semibold">{value}</p>
        </div>
        <span
          className={`sm:text-xs text-[5px] flex items-center gap-1 ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp size={10} />
          ) : (
            <TrendingDown size={10} />
          )}{" "}
          {pillText}
        </span>
      </div>
      <p className="text-stone-500 text-xs">{period}</p>
    </div>
  );
};
