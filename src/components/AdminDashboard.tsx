import {
  LayoutDashboard,
  Calendar,
  Scissors,
  Users,
  Settings,
  LogOut,
  TrendingUp,
  Users as UsersIcon,
  DollarSign,
  Award,
  Bell } from
'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar } from
'recharts';
export function AdminDashboard() {
  const bookingData = [
  {
    name: 'Mon',
    bookings: 12
  },
  {
    name: 'Tue',
    bookings: 19
  },
  {
    name: 'Wed',
    bookings: 15
  },
  {
    name: 'Thu',
    bookings: 22
  },
  {
    name: 'Fri',
    bookings: 30
  },
  {
    name: 'Sat',
    bookings: 45
  },
  {
    name: 'Sun',
    bookings: 38
  }];

  const serviceData = [
  {
    name: 'Haircuts',
    value: 120
  },
  {
    name: 'Coloring',
    value: 85
  },
  {
    name: 'Facials',
    value: 65
  },
  {
    name: 'Nails',
    value: 90
  },
  {
    name: 'Makeup',
    value: 40
  }];

  const recentBookings = [
  {
    id: '#B-1042',
    client: 'Amali Perera',
    service: 'Balayage Color',
    date: 'Today, 10:00 AM',
    status: 'Completed'
  },
  {
    id: '#B-1043',
    client: 'Sarah Jenkins',
    service: 'Signature Haircut',
    date: 'Today, 11:30 AM',
    status: 'In Progress'
  },
  {
    id: '#B-1044',
    client: 'Nimali Silva',
    service: 'Radiance Facial',
    date: 'Today, 02:00 PM',
    status: 'Upcoming'
  },
  {
    id: '#B-1045',
    client: 'Jessica Wong',
    service: 'Luxury Gel Mani',
    date: 'Tomorrow, 09:00 AM',
    status: 'Upcoming'
  },
  {
    id: '#B-1046',
    client: 'Tanya Fernando',
    service: 'Bridal Trial',
    date: 'Tomorrow, 01:00 PM',
    status: 'Upcoming'
  }];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800';
      case 'Upcoming':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-salon-dark text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-gray-800">
          <span className="font-serif text-2xl font-bold text-salon-gold">
            Salon Olivia
          </span>
          <p className="text-xs text-gray-400 mt-1">Admin Portal</p>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <a
            href="#"
            className="flex items-center px-4 py-3 bg-salon-gold/20 text-salon-gold rounded-lg font-medium">
            
            <LayoutDashboard size={20} className="mr-3" /> Overview
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            
            <Calendar size={20} className="mr-3" /> Bookings
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            
            <Scissors size={20} className="mr-3" /> Services
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            
            <Users size={20} className="mr-3" /> Customers
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            
            <Award size={20} className="mr-3" /> Staff
          </a>
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2">
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors">
            
            <Settings size={20} className="mr-3" /> Settings
          </a>
          <a
            href="/"
            className="flex items-center px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 rounded-lg transition-colors">
            
            <LogOut size={20} className="mr-3" /> Back to Site
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shrink-0">
          <h1 className="font-serif text-xl font-bold text-salon-dark">
            Dashboard Overview
          </h1>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-gray-400 hover:text-salon-dark transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 border-l border-gray-200 pl-4">
              <img
                src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&w=100&q=80"
                alt="Admin"
                className="w-8 h-8 rounded-full object-cover" />
              
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                Ms. Nadeeka
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
              <div className="bg-blue-50 p-4 rounded-xl text-blue-600 mr-4">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Total Bookings
                </p>
                <h3 className="text-2xl font-bold text-gray-900">184</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp size={12} className="mr-1" /> +12% this week
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
              <div className="bg-green-50 p-4 rounded-xl text-green-600 mr-4">
                <DollarSign size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Revenue (Month)
                </p>
                <h3 className="text-2xl font-bold text-gray-900">LKR 450k</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp size={12} className="mr-1" /> +8% vs last month
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
              <div className="bg-purple-50 p-4 rounded-xl text-purple-600 mr-4">
                <UsersIcon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  New Customers
                </p>
                <h3 className="text-2xl font-bold text-gray-900">42</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp size={12} className="mr-1" /> +5% this week
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center">
              <div className="bg-salon-cream p-4 rounded-xl text-salon-gold mr-4">
                <Award size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Top Service</p>
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  Balayage Color
                </h3>
                <p className="text-xs text-gray-500 mt-1">35 bookings</p>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Line Chart */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-salon-dark mb-6">
                Bookings Over Time
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={bookingData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f3f4f6" />
                    
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: '#6b7280',
                        fontSize: 12
                      }} />
                    
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: '#6b7280',
                        fontSize: 12
                      }} />
                    
                    <Tooltip
                      contentStyle={{
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }} />
                    
                    <Line
                      type="monotone"
                      dataKey="bookings"
                      stroke="#C9A84C"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: '#C9A84C',
                        strokeWidth: 2,
                        stroke: '#fff'
                      }}
                      activeDot={{
                        r: 6
                      }} />
                    
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-serif text-lg font-bold text-salon-dark mb-6">
                Popular Services
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={serviceData}
                    layout="vertical"
                    margin={{
                      top: 0,
                      right: 0,
                      left: 20,
                      bottom: 0
                    }}>
                    
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                      stroke="#f3f4f6" />
                    
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: '#6b7280',
                        fontSize: 12
                      }} />
                    
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{
                        fill: '#374151',
                        fontSize: 12,
                        fontWeight: 500
                      }} />
                    
                    <Tooltip
                      cursor={{
                        fill: '#f9fafb'
                      }}
                      contentStyle={{
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                      }} />
                    
                    <Bar
                      dataKey="value"
                      fill="#2D2D2D"
                      radius={[0, 4, 4, 0]}
                      barSize={24} />
                    
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Recent Bookings Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-serif text-lg font-bold text-salon-dark">
                Recent Bookings
              </h3>
              <button className="text-sm text-salon-gold font-medium hover:text-yellow-600">
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                    <th className="p-4 font-medium">Booking ID</th>
                    <th className="p-4 font-medium">Client Name</th>
                    <th className="p-4 font-medium">Service</th>
                    <th className="p-4 font-medium">Date & Time</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentBookings.map((booking, idx) =>
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 transition-colors">
                    
                      <td className="p-4 text-sm font-medium text-gray-900">
                        {booking.id}
                      </td>
                      <td className="p-4 text-sm text-gray-700">
                        {booking.client}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {booking.service}
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {booking.date}
                      </td>
                      <td className="p-4">
                        <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-gray-400 hover:text-salon-dark">
                          <Settings size={16} />
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>);

}