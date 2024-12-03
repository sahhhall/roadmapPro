import { TrendingDown, TrendingUp } from "lucide-react";
import {
  useGetCountOfBookingsAndUsersQuery,
  useGetTotalRevenueQuery,
} from "../../services/api/analyticsApi";
import { useEffect, useState } from "react";

export const StatCards = () => {
  const [stats, setStats] = useState<any>(null);
  const { data } = useGetCountOfBookingsAndUsersQuery({});
  const { data: totalRevenue } = useGetTotalRevenueQuery({});
  useEffect(() => {
    if (data && totalRevenue) {
      setStats({
        totalUser: data.totalUser,
        totalBookings: data.totolBookings,
        totalRevenue: totalRevenue,
      });
    }
  }, [data]);

  return (
    <>
      {stats && (
        <Card
          title="Gross Revenue"
          value={`₹ ${stats.totalRevenue}`}
          pillText="+5%"
          trend="up"
          period="Last year"
        />
      )}
      {stats && (
        <Card
          title="Total Users"
          value={stats.totalUser.toString()}
          pillText="+10%"
          trend="up"
          period="Last year"
        />
      )}
      {stats && (
        <Card
          title="Total Bookings"
          value={stats.totalBookings.toString()}
          pillText="-5%"
          trend="down"
          period="Last year"
        />
      )}
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
    <div className="p-4 rounded border dark:border-gray-800 border-stone-300 col-span-4">
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
