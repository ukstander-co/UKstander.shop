import React, { useState, useEffect } from 'react';
import { User, Settings, Package, History, Heart, LogOut, Search, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Footer from '../components/Footer';

export default function UserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      setUserEmail(user.email);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <header className="bg-[#0B192C] text-white py-4 px-6 border-b border-white/10 sticky top-0 z-10 flex justify-between items-center shadow-md">
        <Logo dark={true} size="text-2xl" />
        <button onClick={() => navigate('/user')} className="text-sm font-semibold hover:text-red-400 transition-colors">
          Back to Shop
        </button>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0 bg-white shadow-sm border border-slate-200 rounded-3xl p-6 self-start sticky top-24">
           {/* Profile Header */}
           <div className="flex flex-col items-center mb-8 border-b border-slate-100 pb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-3xl font-black shadow-lg mb-4">
                 {userEmail.charAt(0).toUpperCase()}
              </div>
              <h2 className="font-bold text-slate-900 truncate w-full text-center">{userEmail.split('@')[0]}</h2>
              <p className="text-xs text-slate-500 truncate w-full text-center mt-1">{userEmail}</p>
           </div>
           
           <nav className="flex flex-col gap-2">
              {[
                { id: 'profile', icon: User, label: 'Account Details' },
                { id: 'history', icon: History, label: 'Browsing History' },
                { id: 'searches', icon: Search, label: 'Search History' },
                { id: 'wishlist', icon: Heart, label: 'Your Wishlist' },
                { id: 'settings', icon: Settings, label: 'Account Settings' }
              ].map(tab => (
                 <button 
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm w-full text-left ${activeTab === tab.id ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100' : 'text-slate-600 hover:bg-slate-50 border border-transparent'}`}
                 >
                    <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`} />
                    {tab.label}
                 </button>
              ))}
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm w-full text-left text-red-600 hover:bg-red-50 mt-4 border border-transparent"
              >
                  <LogOut className="w-5 h-5" /> Sign Out
              </button>
           </nav>
        </aside>

        {/* Content Area */}
        <section className="flex-1 bg-white shadow-sm border border-slate-200 rounded-3xl p-8 min-h-[500px]">
           {activeTab === 'profile' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Details</h2>
                 
                 <div className="space-y-6 max-w-md">
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1">Email Address</label>
                       <div className="flex items-center bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl">
                          <span className="flex-1 text-slate-600 font-medium">{userEmail}</span>
                       </div>
                    </div>
                    
                    <div>
                       <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
                       <div className="flex items-center bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl relative group cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white">
                          <input type="password" value="********" readOnly className="bg-transparent flex-1 outline-none text-slate-600 font-medium" />
                          <button className="text-sm text-blue-600 font-bold px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors opacity-0 group-hover:opacity-100 absolute right-2 flex items-center">
                            <Edit3 className="w-3 h-3 mr-1" /> Update
                          </button>
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'history' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <h2 className="text-2xl font-bold text-slate-900 mb-6">Browsing History</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Simulated history items */}
                    <div className="border border-slate-100 rounded-xl p-3 flex gap-3 items-center group cursor-pointer hover:border-blue-200">
                       <div className="w-16 h-16 bg-slate-50 rounded-lg flex-shrink-0 flex items-center justify-center p-2">
                         <img src="https://images.unsplash.com/photo-1542291026-7eec264c27ff" alt="Shoes" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                       </div>
                       <div className="flex-1 min-w-0">
                         <h4 className="text-sm font-semibold text-slate-800 truncate group-hover:text-blue-600">Premium Running Shoes</h4>
                         <span className="text-xs text-slate-500">Viewed yesterday</span>
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === 'searches' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <h2 className="text-2xl font-bold text-slate-900 mb-6">Search History</h2>
                 <ul className="space-y-2 border border-slate-100 rounded-xl p-2 bg-slate-50/50">
                    {['smartphones under 500', 'wireless headphones', 'coffee machine', 'running shoes'].map((term, i) => (
                       <li key={i} className="flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-slate-100 hover:border-blue-200 cursor-pointer group">
                          <span className="flex items-center text-sm font-medium text-slate-700 group-hover:text-blue-600"><Search className="w-4 h-4 mr-3 text-slate-400 group-hover:text-blue-500" /> {term}</span>
                          <button className="text-xs text-slate-400 hover:text-red-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                       </li>
                    ))}
                 </ul>
              </div>
           )}

           {activeTab === 'wishlist' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Wishlist</h2>
                 <p className="text-slate-500">You can view and manage your full wishlist from the main shop dashboard.</p>
                 <button onClick={() => navigate('/user')} className="mt-4 text-blue-600 font-bold hover:underline flex items-center">
                    Go to Shop Dashboard <LogOut className="w-4 h-4 ml-1 rotate-180" />
                 </button>
              </div>
           )}

           {activeTab === 'settings' && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                 <h2 className="text-2xl font-bold text-slate-900 mb-6">Account Settings</h2>
                 <div className="space-y-4 max-w-lg">
                    <div className="p-4 border border-slate-200 rounded-xl flex items-start justify-between bg-slate-50">
                       <div>
                          <h4 className="font-bold text-slate-800 text-sm">Marketing Emails</h4>
                          <p className="text-xs text-slate-500 mt-1">Receive alerts for top drops and personalized recommendations.</p>
                       </div>
                       <label className="relative inline-flex items-center cursor-pointer mt-1">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                       </label>
                    </div>
                    
                    <div className="p-4 border border-red-200 rounded-xl flex items-start justify-between bg-red-50">
                       <div>
                          <h4 className="font-bold text-red-800 text-sm">Delete Account</h4>
                          <p className="text-xs text-red-600/80 mt-1">Permanently remove your account and data.</p>
                       </div>
                       <button className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-lg transition-colors">
                          Delete
                       </button>
                    </div>
                 </div>
              </div>
           )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
