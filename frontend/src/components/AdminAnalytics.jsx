import { TrendingUp, Users, CheckCircle, IndianRupee } from "lucide-react";

const AdminAnalytics = ({ surveys }) => {
  // 1. Calculate Total Estimated Value (Assuming each survey has an estimate)
  const totalValue = surveys.reduce((acc, curr) => acc + (curr.totalEstimate || 0), 0);

  // 2. Calculate Conversion Rate
  const completed = surveys.filter(s => s.status === "Done").length;
  const conversionRate = surveys.length > 0 ? ((completed / surveys.length) * 100).toFixed(1) : 0;

  // 3. Find Most Requested Product
  const productCounts = surveys.reduce((acc, s) => {
    acc[s.productName] = (acc[s.productName] || 0) + 1;
    return acc;
  }, {});
  const topProduct = Object.keys(productCounts).reduce((a, b) => productCounts[a] > productCounts[b] ? a : b, "N/A");

  const stats = [
    { label: "Pipeline Value", value: `₹${totalValue.toLocaleString()}`, icon: IndianRupee, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Conversion", value: `${conversionRate}%`, icon: CheckCircle, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Active Leads", value: surveys.filter(s => s.status === "Pending").length, icon: Users, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Top Seller", value: topProduct, icon: TrendingUp, color: "text-purple-600", bg: "bg-purple-50" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {stats.map((stat, i) => (
        <div key={i} className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-slate-900 truncate max-w-[150px]">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminAnalytics;