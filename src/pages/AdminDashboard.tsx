import React, { useState, useEffect } from 'react';
import { 
  LogOut, 
  ShieldAlert, 
  Users, 
  Settings, 
  Activity, 
  Sparkles, 
  Loader2, 
  MessageSquare, 
  Send, 
  Bell, 
  TrendingUp, 
  AlertCircle, 
  ChevronRight,
  Edit2,
  Trash2,
  Check,
  FileText,
  LayoutDashboard,
  Globe,
  Plus,
  ExternalLink,
  Calendar,
  X,
  RefreshCw,
  Server,
  Terminal,
  Copy,
  Lock,
  Wifi,
  Play,
  CheckCircle2,
  Trash,
  Eye
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'insights' | 'products' | 'users' | 'pages' | 'chats' | 'trends' | 'alerts' | 'blogs' | 'deployment'>('insights');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  // AI Trend Discovery Suggestions States
  const [trendSuggestions, setTrendSuggestions] = useState<any[]>([]);
  const [loadingTrends, setLoadingTrends] = useState(false);
  const [trendsActionLoader, setTrendsActionLoader] = useState<string | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<any | null>(null);
  const [approveForm, setApproveForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image_url: '',
    affiliate_link: ''
  });
  
  // Optimizer Form Data
  const [formData, setFormData] = useState({
    affiliateLink: '',
    imageUrl: '',
    additionalImages: '',
    price: '',
    rawContext: ''
  });

  // Base Analytical Counts
  const [analytics, setAnalytics] = useState<any>({
    summary: "Generating system analysis...",
    chart: [],
    userCount: 0,
    clickCount: 0,
    productCount: 0,
    abGroupPercent: 60,
    viewsCount: 0,
    wishlistCount: 0
  });

  // Support Chats System
  const [activeChats, setActiveChats] = useState<any[]>([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [replyInput, setReplyInput] = useState('');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [chatLoading, setChatLoading] = useState(false);

  // Pages Curation States
  const [pagesList, setPagesList] = useState<any[]>([]);
  const [selectedPageKey, setSelectedPageKey] = useState<string>('privacy');
  const [pageTitle, setPageTitle] = useState('');
  const [pageContent, setPageContent] = useState('');
  const [pageSaveSuccess, setPageSaveSuccess] = useState('');

  // Global Settings States
  const [globalSettings, setGlobalSettings] = useState<any>({
    header_promo: '',
    header_links: '',
    rainforest_api_key: '',
    footer_company_heading: '',
    footer_company_links: '',
    footer_support_heading: '',
    footer_support_links: '',
    footer_legal_heading: '',
    footer_legal_links: '',
    footer_resource_heading: '',
    footer_resource_links: '',
    footer_copyright: ''
  });
  const [globalSettingsSuccess, setGlobalSettingsSuccess] = useState('');
  const [globalSettingsLoading, setGlobalSettingsLoading] = useState(false);

  // Users Management States
  const [usersList, setUsersList] = useState<any[]>([]);
  const [editingUser, setEditingUser] = useState<any | null>(null);
  const [userForm, setUserForm] = useState({ name: '', email: '', role: 'user' });
  const [userSaveSuccess, setUserSaveSuccess] = useState('');

  // Blogs Management States
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [editingBlog, setEditingBlog] = useState<any | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    slug: '',
    product_id: '',
    banner_image: '',
    slider_images: '[]',
    affiliate_link: '',
    tags: '',
    seo_title: '',
    seo_description: '',
  });
  const [blogSaveSuccess, setBlogSaveSuccess] = useState('');
  const [blogLoading, setBlogLoading] = useState(false);

  // --- Oracle VM Easy Deployment & PM2 Helper ---
  const [deployIp, setDeployIp] = useState('79.72.94.8');
  const [deployPort, setDeployPort] = useState('3000');
  const [deployDomain, setDeployDomain] = useState('ukstander.duckdns.org');
  const [duckDnsToken, setDuckDnsToken] = useState('019eba66-3501-71e9-8995-576baba2f8b4');
  const [cfDomain, setCfDomain] = useState('ukstander.shop');
  const [activeDeploySubtab, setActiveDeploySubtab] = useState<'pm2' | 'autodeploy' | 'domain' | 'firewall' | 'easypanel'>('easypanel');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const fetchBlogs = () => {
    setBlogLoading(true);
    fetch('/api/admin/blogs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setBlogsList(data);
        setBlogLoading(false);
      })
      .catch(err => {
        console.error(err);
        setBlogLoading(false);
      });
  };

  const handleEditBlogClick = (blog: any) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title || '',
      content: blog.content || '',
      slug: blog.slug || '',
      product_id: blog.product_id ? blog.product_id.toString() : '',
      banner_image: blog.banner_image || '',
      slider_images: blog.slider_images || '[]',
      affiliate_link: blog.affiliate_link || '',
      tags: blog.tags || '',
      seo_title: blog.seo_title || '',
      seo_description: blog.seo_description || '',
    });
    setBlogSaveSuccess('');
  };

  const handleCreateNewBlog = () => {
    setEditingBlog({ id: null }); // Signal new blog
    setBlogForm({
      title: '',
      content: '',
      slug: '',
      product_id: '',
      banner_image: '',
      slider_images: '[]',
      affiliate_link: '',
      tags: '',
      seo_title: '',
      seo_description: '',
    });
    setBlogSaveSuccess('');
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    setBlogSaveSuccess('');
    
    const payload = {
      ...blogForm,
      id: editingBlog?.id || null,
      product_id: blogForm.product_id ? parseInt(blogForm.product_id) : null
    };

    fetch('/api/admin/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBlogSaveSuccess(data.message);
          fetchBlogs();
          fetchAnalytics(); // Added to refresh count
          setTimeout(() => setEditingBlog(null), 1500);
        } else {
          alert(data.error || 'Failed to save blog');
        }
      })
      .catch(console.error);
  };

  const handleDeleteBlog = (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(data => {
        if (data.success) fetchBlogs();
      })
      .catch(console.error);
  };

  // Products Management States
  const [productsList, setProductsList] = useState<any[]>([]);
  const [priceAlertsList, setPriceAlertsList] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [productForm, setProductForm] = useState({
    ai_title: '',
    price: '',
    category: '',
    ai_description: '',
    ai_tags: '',
    affiliate_link: '',
    image_url: ''
  });
  const [productSaveSuccess, setProductSaveSuccess] = useState('');

  const fetchGlobalSettings = () => {
    fetch('/api/global-settings')
      .then(res => res.json())
      .then(data => {
        setGlobalSettings({
          header_promo: data.header_promo || '',
          header_links: data.header_links || '',
          rainforest_api_key: data.rainforest_api_key || '',
          footer_company_heading: data.footer_company_heading || '',
          footer_company_links: data.footer_company_links || '',
          footer_support_heading: data.footer_support_heading || '',
          footer_support_links: data.footer_support_links || '',
          footer_legal_heading: data.footer_legal_heading || '',
          footer_legal_links: data.footer_legal_links || '',
          footer_resource_heading: data.footer_resource_heading || '',
          footer_resource_links: data.footer_resource_links || '',
          footer_copyright: data.footer_copyright || ''
        });
      })
      .catch(console.error);
  };

  const handleSaveGlobalSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalSettingsLoading(true);
    setGlobalSettingsSuccess('');
    
    fetch('/api/global-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(globalSettings)
    })
      .then(res => res.json())
      .then(data => {
        setGlobalSettingsLoading(false);
        if (data.success) {
          setGlobalSettingsSuccess('Global header and footer content successfully updated!');
          fetchGlobalSettings();
        } else {
          alert('Failed to save global settings changes.');
        }
      })
      .catch(err => {
        console.error(err);
        setGlobalSettingsLoading(false);
      });
  };

  // 1. Fetch Dynamic Analytics from Real SQLite Data
  const fetchAnalytics = () => {
    fetch('/api/admin/dashboard-insights')
      .then(res => res.json())
      .then(data => {
        setAnalytics({
          summary: data.performanceNarrative || "All systems normalized.",
          chart: data.dailyActivityData || [],
          userCount: data.userCount || 0,
          clickCount: data.clickCount || 0,
          productCount: data.productCount || 0,
          abGroupPercent: data.abGroupPercent || 60,
          viewsCount: data.viewsCount || 0,
          wishlistCount: data.wishlistCount || 0
        });
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // 2. Poll Active Chats, Messages, and Helpdesk Escalations
  useEffect(() => {
    const pollInterval = setInterval(() => {
      // Fetch Active Support chats
      fetch('/api/admin/chats')
        .then(res => res.json())
        .then(chats => {
          if (Array.isArray(chats)) {
            setActiveChats(chats);
          }
        })
        .catch(console.error);

      // Fetch Notifications
      fetch('/api/admin/notifications')
        .then(res => res.json())
        .then(notifs => {
          if (Array.isArray(notifs)) {
            setNotifications(notifs);
          }
        })
        .catch(console.error);
    }, 4000);

    return () => clearInterval(pollInterval);
  }, []);

  // 3. Sync Chat Messages when a user chat is open
  useEffect(() => {
    if (!selectedUserEmail) return;
    const msgInterval = setInterval(() => {
      fetch(`/api/admin/chat-messages?email=${encodeURIComponent(selectedUserEmail)}`)
        .then(res => res.json())
        .then(msgs => {
          if (Array.isArray(msgs)) {
            setChatMessages(msgs);
          }
        })
        .catch(console.error);
    }, 3000);
    return () => clearInterval(msgInterval);
  }, [selectedUserEmail]);

  // Load datasets dynamically depending on active workspace tab
  useEffect(() => {
    if (activeTab === 'pages') {
      fetchPages();
      fetchGlobalSettings();
    } else if (activeTab === 'users') {
      fetchUsers();
    } else if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'trends') {
      fetchTrendSuggestions();
    } else if (activeTab === 'blogs') {
      fetchBlogs();
    }
  }, [activeTab]);

  const fetchPriceAlerts = () => {
    fetch('/api/admin/price-alerts')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPriceAlertsList(data);
      })
      .catch(console.error);
  };

  const fetchTrendSuggestions = () => {
    setLoadingTrends(true);
    fetch('/api/admin/trend-suggestions')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setTrendSuggestions(data);
        }
        setLoadingTrends(false);
      })
      .catch(err => {
        console.error("Error loading trend suggestions:", err);
        setLoadingTrends(false);
      });
  };

  // Fetch page content helper
  const fetchPages = () => {
    fetch('/api/admin/pages')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPagesList(data);
          const current = data.find(p => p.page_key === selectedPageKey);
          if (current) {
            setPageTitle(current.title);
            setPageContent(current.content);
          } else if (data.length > 0) {
            setSelectedPageKey(data[0].page_key);
            setPageTitle(data[0].title);
            setPageContent(data[0].content);
          }
        }
      })
      .catch(console.error);
  };

  // Fetch users from database
  const fetchUsers = () => {
    fetch('/api/admin/users')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setUsersList(data);
        }
      })
      .catch(console.error);
  };

  // Fetch products from database
  const fetchProducts = () => {
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProductsList(data);
        }
      })
      .catch(console.error);
  };

  // Select User Chat handler
  const handleSelectUserChat = (email: string) => {
    setSelectedUserEmail(email);
    setChatLoading(true);
    fetch(`/api/admin/chat-messages?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(msgs => {
        setChatMessages(msgs);
        setChatLoading(false);
      })
      .catch(() => setChatLoading(false));
  };

  // Takeover support chat
  const handleTakeoverChat = (email: string, targetStatus: "admin" | "ai") => {
    fetch('/api/admin/chat-takeover', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, status: targetStatus })
    })
      .then(res => res.json())
      .then(() => {
        fetch('/api/admin/chats')
          .then(res => res.json())
          .then(chats => {
            if (Array.isArray(chats)) setActiveChats(chats);
          });
      })
      .catch(console.error);
  };

  // Send human response to user chat
  const handleSendReply = () => {
    if (!replyInput.trim() || !selectedUserEmail) return;
    const text = replyInput;
    setReplyInput('');

    fetch('/api/admin/chat-reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: selectedUserEmail, content: text })
    })
      .then(res => res.json())
      .then(() => {
        setChatMessages(prev => [...prev, { role: 'assistant', content: text, created_at: new Date().toISOString() }]);
      })
      .catch(console.error);
  };

  // Dismiss notification
  const handleDismissNotification = (id: number) => {
    fetch('/api/admin/notifications/dismiss', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      })
      .catch(console.error);
  };

  // Form Product optimization via Groq AI
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    
    try {
      const additionalImagesArray = formData.additionalImages.split(',').map(i => i.trim()).filter(i => i.length > 0);
      const res = await fetch('/api/admin/generate-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          additionalImages: additionalImagesArray
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        setSuccess('Product generated, optimized with Groq tags, and published successfully!');
        setFormData({ affiliateLink: '', imageUrl: '', additionalImages: '', price: '', rawContext: '' });
        fetchAnalytics(); 
        if (activeTab === 'products') fetchProducts();
      } else {
        alert(data.error || 'Failed to generate product');
      }
    } catch (err) {
      alert('Error generating product.');
    } finally {
      setLoading(false);
    }
  };

  // Pages Curation actions
  const handlePageChange = (key: string) => {
    setSelectedPageKey(key);
    const page = pagesList.find(p => p.page_key === key);
    if (page) {
      setPageTitle(page.title);
      setPageContent(page.content);
    }
    setPageSaveSuccess('');
  };

  const handleSavePage = (e: React.FormEvent) => {
    e.preventDefault();
    setPageSaveSuccess('');
    fetch('/api/admin/pages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ page_key: selectedPageKey, title: pageTitle, content: pageContent })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPageSaveSuccess('Site Page Content updated successfully in database!');
          // Refresh local caches
          fetch('/api/admin/pages')
            .then(res => res.json())
            .then(pList => {
              if (Array.isArray(pList)) setPagesList(pList);
            });
        } else {
          alert('Failed to save page contents.');
        }
      })
      .catch(console.error);
  };

  // Users Manager actions
  const handleEditUserClick = (user: any) => {
    setEditingUser(user);
    setUserForm({ name: user.name, email: user.email, role: user.role });
    setUserSaveSuccess('');
  };

  const handleSaveUserEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setUserSaveSuccess('');
    fetch(`/api/admin/users/${editingUser.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userForm)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUserSaveSuccess('User credentials saved in Turso/SQLite!');
          fetchUsers();
          setTimeout(() => setEditingUser(null), 1200);
        } else {
          alert('Failed to save user updates.');
        }
      })
      .catch(console.error);
  };

  const handleDeleteUser = (id: number) => {
    if (!confirm('Are you absolutely sure you want to delete this user? This is irreversible.')) return;
    fetch(`/api/admin/users/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchUsers();
          if (editingUser?.id === id) setEditingUser(null);
        }
      })
      .catch(console.error);
  };

  // Products Manager Actions
  const handleEditProductClick = (prod: any) => {
    setEditingProduct(prod);
    setProductForm({
      ai_title: prod.ai_title || '',
      price: prod.price ? prod.price.toString() : '',
      category: prod.category || '',
      ai_description: prod.ai_description || '',
      ai_tags: prod.ai_tags || '',
      affiliate_link: prod.affiliate_link || '',
      image_url: prod.image_url || ''
    });
    setProductSaveSuccess('');
  };

  const handleSaveProductEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setProductSaveSuccess('');
    fetch(`/api/admin/products/${editingProduct.db_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productForm)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProductSaveSuccess('Database listing updated successfully!');
          fetchProducts();
          fetchAnalytics();
          setTimeout(() => setEditingProduct(null), 1200);
        } else {
          alert('Failed to save items edits.');
        }
      })
      .catch(console.error);
  };

  const handleDeleteProduct = (dbId: number) => {
    if (!confirm('Are you absolutely sure you want to delete this product? It will vanish from the user curation directory.')) return;
    fetch(`/api/admin/products/${dbId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchProducts();
          fetchAnalytics();
          if (editingProduct?.db_id === dbId) setEditingProduct(null);
        }
      })
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-950 font-sans pb-16">
      {/* Navbar with Glassmorphism */}
      <nav className="bg-[#0B192C] text-white px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center shadow-md border border-slate-700">
            <ShieldAlert className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-widest text-white uppercase leading-none">Admin Control Center</h1>
            <span className="text-[10px] text-red-400 font-bold tracking-wider">SECURE DATABASE OPERATIONS ACTIVE</span>
          </div>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="bg-transparent hover:bg-slate-800 text-slate-300 hover:text-white flex items-center text-xs font-bold transition-all px-4 py-2 rounded-full border border-slate-700 cursor-pointer"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out Desk
        </button>
      </nav>

      {/* Main Content Layout Container */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        
        {/* Real-time Human Takeover Escalations Bell Alert Banners */}
        {notifications.length > 0 && (
          <div className="space-y-3">
            {notifications.map((notif) => (
              <div 
                key={notif.id} 
                className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl flex items-start justify-between shadow-xs animate-pulse"
              >
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-widest">HELP COUNSEL ESCALATION REQUEST</h4>
                    <p className="text-xs text-amber-700 mt-1">
                      User <span className="font-bold text-amber-950">{notif.user_email}</span> wants to connect to a live support representative or has requested human intervention.
                    </p>
                    <div className="mt-3 flex gap-2">
                      <button 
                        onClick={() => {
                          setActiveTab('chats');
                          handleSelectUserChat(notif.user_email);
                          handleTakeoverChat(notif.user_email, 'admin');
                          handleDismissNotification(notif.id);
                        }}
                        className="bg-amber-600 text-white font-bold text-[10px] uppercase tracking-wider px-3.5 py-1.5 rounded-lg hover:bg-amber-700 transition-colors cursor-pointer"
                      >
                        Accept & Intervene Live
                      </button>
                      <button 
                        onClick={() => handleDismissNotification(notif.id)}
                        className="bg-amber-100 text-amber-800 font-bold text-[10px] uppercase px-3.5 py-1.5 rounded-lg hover:bg-amber-200 transition-colors cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-amber-600">Active Alert</span>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Metric Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 border-t-4 border-t-blue-600 shadow-xs">
            <div className="flex items-center justify-between mb-2">
               <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Database Users</span>
               <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">{analytics.userCount}</div>
            <p className="text-[10px] text-green-600 font-bold mt-1">100% Real-time database count</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 border-t-4 border-t-red-600 shadow-xs">
             <div className="flex items-center justify-between mb-2">
               <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Autonomous Links</span>
               <Globe className="w-4 h-4 text-red-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">{analytics.productCount}</div>
            <p className="text-[10px] text-slate-500 font-bold mt-1">Real database products list</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 border-t-4 border-t-emerald-600 shadow-xs">
             <div className="flex items-center justify-between mb-2">
               <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Accumulated Clicks</span>
               <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">{analytics.clickCount}</div>
            <p className="text-[10px] text-emerald-600 font-bold mt-1">Real recorded customer tracking</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 border-t-4 border-t-indigo-600 shadow-xs">
             <div className="flex items-center justify-between mb-2">
               <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">A/B Personalization Group</span>
               <Settings className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-black text-slate-900">{analytics.abGroupPercent}% AI</div>
            <p className="text-[10px] text-indigo-600 font-bold mt-1">Of active profiling accounts</p>
          </div>
        </div>

        {/* Workspace Tab Bar of Feature Control Buttons */}
        <div id="admin-tabs" className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-2">
          <button 
            id="tab-insights"
            onClick={() => setActiveTab('insights')} 
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'insights' ? 'bg-[#0B192C] text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <LayoutDashboard className="w-4 h-4" /> Analytics
          </button>
          
          <button 
            id="tab-products"
            onClick={() => setActiveTab('products')} 
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'products' ? 'bg-[#0B192C] text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <Sparkles className="w-4 h-4" /> Product Catalog ({analytics.productCount})
          </button>
          
          <button 
            id="tab-users"
            onClick={() => setActiveTab('users')} 
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'users' ? 'bg-[#0B192C] text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <Users className="w-4 h-4" /> User Management ({analytics.userCount})
          </button>
          
          <button 
            id="tab-pages"
            onClick={() => setActiveTab('pages')} 
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'pages' ? 'bg-[#0B192C] text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <Settings className="w-4 h-4" /> Global Content Settings
          </button>
          
          <button 
            id="tab-chats"
            onClick={() => setActiveTab('chats')} 
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'chats' ? 'bg-[#0B192C] text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <MessageSquare className="w-4 h-4" /> Support Takeovers ({activeChats.length})
          </button>

          <button 
            id="tab-trends"
            onClick={() => setActiveTab('trends')} 
            className={`px-4 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'trends' ? 'bg-[#0B192C] text-white shadow-md' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}
          >
            <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
            Trends & AI Hunting
          </button>
          
          <button 
            id="tab-alerts"
            onClick={() => setActiveTab('alerts')} 
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'alerts' ? 'bg-[#0B192C] text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <Bell className="w-4 h-4" /> Deal Alert Subs
          </button>

          <button 
            id="tab-blogs"
            onClick={() => setActiveTab('blogs')} 
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'blogs' ? 'bg-[#0B192C] text-white shadow-md' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <FileText className="w-4 h-4" /> Affiliate Blogs ({blogsList.length})
          </button>

          <button 
            id="tab-deployment"
            onClick={() => setActiveTab('deployment')} 
            className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${activeTab === 'deployment' ? 'bg-[#2563EB] text-white shadow-md hover:bg-blue-700' : 'text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 font-extrabold'}`}
          >
            <Server className="w-4 h-4 text-blue-600 animate-pulse" /> 🚀 Deployment & VM Hub
          </button>
        </div>

        {/* Tab-driven Workspace Canvas */}
        <div id="workspace-canvas" className="bg-transparent mt-4 transition-all duration-300">
          
          {/* TAB 1: Insights (Area chart, AI bullet list) */}
          {activeTab === 'insights' && (
            <div id="pane-insights" className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col gap-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5 text-sm md:text-base">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                      Dynamic Cohort Conversions & Clicks
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium">Real-time user behavior analysis across interest departments</p>
                  </div>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600 animate-spin" /> SQLite Fed Feed
                  </span>
                </div>

                {/* Area Chart mapping views vs conversions */}
                <div className="h-64 mt-2">
                  {analytics.chart.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analytics.chart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                           <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                           </linearGradient>
                           <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                              <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                        <XAxis dataKey="name" style={{ fontSize: '10px', fontWeight: 'bold', fill: '#64748B' }} tickLine={false} axisLine={false} />
                        <YAxis style={{ fontSize: '10px', fontWeight: 'bold', fill: '#64748B' }} tickLine={false} axisLine={false} />
                        <Tooltip contentStyle={{ background: '#0B192C', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }} />
                        <Area type="monotone" dataKey="views" name="Daily Impressions" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                        <Area type="monotone" dataKey="clicks" name="Product Clicks" stroke="#059669" strokeWidth={2} fillOpacity={1} fill="url(#colorConversions)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 text-xs font-bold bg-slate-50 border border-dashed rounded-xl">
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Feeding live charts...
                    </div>
                  )}
                </div>

                {/* Synthesized NLP Executive Summary */}
                <div className="bg-[#0B192C] text-white p-5 rounded-2xl relative overflow-hidden shadow-md">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/10 rounded-full filter blur-xl"></div>
                  <h4 className="text-xs font-black tracking-widest text-red-500 uppercase flex items-center gap-1.5 mb-2">
                    <Sparkles className="w-4 h-4 text-red-500 animate-bounce" />
                    AI Executive Strategic Insight
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                    {typeof analytics.summary === 'string' ? analytics.summary : JSON.stringify(analytics.summary)}
                  </p>
                </div>
              </div>

              {/* Side Card: Quick stats overview */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col gap-4">
                <h3 className="font-extrabold text-slate-900 tracking-tight text-sm">System Operations</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500">Registered Accounts</span>
                    <span className="text-xs font-black text-slate-900">{analytics.userCount}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500">Cataloged Products</span>
                    <span className="text-xs font-black text-slate-900">{analytics.productCount}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500">Page views Tracked</span>
                    <span className="text-xs font-black text-slate-900">{analytics.viewsCount}</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-bold text-slate-500">Wishlist Saves</span>
                    <span className="text-xs font-black text-slate-900">{analytics.wishlistCount}</span>
                  </div>
                </div>
                <div className="mt-auto bg-blue-50 border border-blue-100 p-4 rounded-xl text-blue-800 text-[10px] uppercase font-bold tracking-wider leading-relaxed text-center">
                  ● Core Node connected to AWS west-1 cluster
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Products Manager (Add, list, edit, delete products) */}
          {activeTab === 'products' && (
            <div id="pane-products" className="space-y-6 animate-fade-in">
              {/* Product Edit Module Drawer (Modal banner if active) */}
              {editingProduct && (
                <div className="bg-indigo-50 border-2 border-indigo-200 p-6 rounded-2xl relative shadow-md">
                  <button onClick={() => setEditingProduct(null)} className="absolute top-4 right-4 text-xs font-black text-indigo-500 hover:text-indigo-800 uppercase">Cancel Edit</button>
                  <h4 className="font-extrabold text-indigo-900 flex items-center gap-2 mb-4 text-xs uppercase tracking-wider">
                    <Edit2 className="w-4 h-4 text-indigo-600" /> Editing Catalog Item Node: (UID {editingProduct.db_id})
                  </h4>
                  {productSaveSuccess && <div className="mb-4 text-green-700 bg-green-50 border border-green-200 p-3 rounded-lg text-xs font-bold">{productSaveSuccess}</div>}
                  <form onSubmit={handleSaveProductEdit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Product Custom Title</label>
                      <input required type="text" value={productForm.ai_title} onChange={e => setProductForm({...productForm, ai_title: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Category Code</label>
                      <select required value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800">
                        <option value="Electronics">Electronics</option>
                        <option value="Home & Kitchen">Home & Kitchen</option>
                        <option value="Computers">Computers</option>
                        <option value="Health & Beauty">Health & Beauty</option>
                        <option value="General">General</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Standard Item Price (£)</label>
                      <input required type="number" step="0.01" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Banner Image URL</label>
                      <input required type="text" value={productForm.image_url} onChange={e => setProductForm({...productForm, image_url: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Affiliate Redirection Link</label>
                      <input required type="text" value={productForm.affiliate_link} onChange={e => setProductForm({...productForm, affiliate_link: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Persuasive Description Copy</label>
                      <textarea rows={3} value={productForm.ai_description} onChange={e => setProductForm({...productForm, ai_description: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 leading-relaxed" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Catalog Hashtags</label>
                      <input type="text" value={productForm.ai_tags} onChange={e => setProductForm({...productForm, ai_tags: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800" />
                    </div>
                    <div className="md:col-span-2 flex gap-2">
                      <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer">Save Product Details</button>
                      <button type="button" onClick={() => setEditingProduct(null)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer">Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              {/* AI Blog Sync utility */}
              <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-black text-indigo-900 uppercase tracking-tight flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" /> Content Automation Hub
                  </h4>
                  <p className="text-indigo-700/70 text-[11px] font-medium max-w-xl mt-1">
                    Synchronize your catalog. If you have products without blog posts, our AI will generate high-ranking UK shopping guides for them instantly.
                  </p>
                </div>
                <button 
                  onClick={async () => {
                    if (!confirm("Start AI blog generation for missing articles? This process may take a few minutes.")) return;
                    setLoading(true);
                    try {
                      const res = await fetch('/api/admin/sync-blogs', { method: 'POST' });
                      const data = await res.json();
                      setSuccess(data.message);
                      setLoading(false);
                    } catch (err) {
                      console.error(err);
                      setLoading(false);
                      alert("Failed to sync blogs. Check server logs.");
                    }
                  }}
                  className="bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center gap-2 shrink-0 cursor-pointer"
                >
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  Sync Missing Blogs
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                
                {/* AI Publisher Column */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col h-fit">
                  <h3 className="font-extrabold text-slate-900 tracking-tight flex items-center gap-2 text-xs uppercase mb-3 text-red-600">
                    <Sparkles className="w-4 h-4 text-red-600 animate-pulse" /> Publish New item (Groq AI Optimizer)
                  </h3>
                  <p className="text-slate-500 text-[11px] mb-4">Paste specifications list data from a seller page, and the AI parses the characteristics, generates a trust title, tags and catalogs details dynamically.</p>
                  
                  {success && <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-[11px] font-bold">{success}</div>}
                  
                  <form onSubmit={handleGenerate} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">Merchant Redirect Link</label>
                      <input required type="url" value={formData.affiliateLink} onChange={e => setFormData({...formData, affiliateLink: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:border-red-500" placeholder="https://amazon.co.uk/dp/..." />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">Banner Image URL</label>
                      <input required type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:border-red-500" placeholder="https://images.unsplash.com/..." />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">Additional Slider Images (Comma Separated)</label>
                      <input type="text" value={formData.additionalImages} onChange={e => setFormData({...formData, additionalImages: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none" placeholder="https://image1.jpg, https://image2.jpg" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">Standard Item Price (£)</label>
                      <input required type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:border-red-500" placeholder="49.99" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">Specs context / raw characteristics list</label>
                      <textarea required rows={3} value={formData.rawContext} onChange={e => setFormData({...formData, rawContext: e.target.value})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-xs focus:outline-none focus:border-red-500" placeholder="Paste Amazon product summary sheet..."></textarea>
                    </div>
                    <button disabled={loading} type="submit" className="w-full bg-[#0B192C] hover:bg-indigo-700 text-white font-bold text-xs uppercase py-2.5 rounded-lg flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50">
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Optimize & Publish
                    </button>
                  </form>
                </div>

                {/* Database Products List */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 flex flex-col h-[520px]">
                  <h3 className="font-extrabold text-slate-900 tracking-tight text-xs uppercase mb-3">Live Curation Catalog list</h3>
                  <p className="text-slate-500 text-[11px] mb-4">Click edit on any product listing below to edit standard parameters or delete them from the platform database.</p>
                  
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2 border-t border-slate-100 pt-3">
                    {productsList.length === 0 ? (
                      <div className="text-center py-16 text-slate-400 text-xs font-semibold">No catalog entries found.</div>
                    ) : (
                      productsList.map((prod) => (
                        <div key={prod.id} className="p-3 bg-slate-50 border rounded-xl flex gap-3 hover:shadow-xs transition-shadow">
                          <img 
                            src={prod.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=150"} 
                            alt={prod.ai_title}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 object-cover bg-white border rounded-lg shrink-0"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className="text-[10px] uppercase font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-1.5 py-0.5 rounded-md leading-none">{prod.category}</span>
                                <span className="text-xs font-black text-slate-900">£{prod.price}</span>
                              </div>
                              <h4 className="text-xs font-bold text-slate-800 truncate max-w-[280px]">{prod.ai_title}</h4>
                            </div>
                            <div className="flex gap-2 mt-1">
                              <button onClick={() => handleEditProductClick(prod)} className="text-blue-600 hover:text-blue-800 text-[10px] font-bold flex items-center gap-1 hover:underline cursor-pointer">
                                <Edit2 className="w-3 h-3" /> Edit Row
                              </button>
                              <button onClick={() => handleDeleteProduct(prod.db_id)} className="text-red-500 hover:text-red-700 text-[10px] font-bold flex items-center gap-1 hover:underline cursor-pointer">
                                <Trash2 className="w-3 h-3" /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Users Manager (Registered database users list, edit user profile fields) */}
          {activeTab === 'users' && (
            <div id="pane-users" className="space-y-6 animate-fade-in">
              {/* Editing block popup banner if active */}
              {editingUser && (
                <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-2xl relative shadow-md">
                  <button onClick={() => setEditingUser(null)} className="absolute top-4 right-4 text-xs font-bold text-indigo-500 hover:text-indigo-800 uppercase">Cancel</button>
                  <h4 className="font-extrabold text-indigo-900 flex items-center gap-2 mb-4 text-xs uppercase tracking-wider">
                    <Edit2 className="w-4 h-4 text-indigo-600" /> Editing Database User Node: (UID {editingUser.id})
                  </h4>
                  {userSaveSuccess && <div className="mb-4 text-green-700 bg-green-50 border border-green-200 p-3 rounded-lg text-xs font-bold">{userSaveSuccess}</div>}
                  <form onSubmit={handleSaveUserEdit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Registered Username</label>
                      <input required type="text" value={userForm.name} onChange={e => setUserForm({...userForm, name: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Email Credentials</label>
                      <input required type="email" value={userForm.email} onChange={e => setUserForm({...userForm, email: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Security Role</label>
                      <select value={userForm.role} onChange={e => setUserForm({...userForm, role: e.target.value})} className="w-full bg-white border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800">
                        <option value="user">Standard User</option>
                        <option value="admin">System Administrator</option>
                      </select>
                    </div>
                    <div className="md:col-span-3 flex gap-2">
                      <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-4 py-2 rounded-lg cursor-pointer">Save Credentials</button>
                      <button type="button" onClick={() => setEditingUser(null)} className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs px-4 py-2 rounded-lg cursor-pointer">Close</button>
                    </div>
                  </form>
                </div>
              )}

              {/* Registered user records */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 tracking-tight text-sm">Database Registered Users list</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Real-time user credential accounts retrieved from database.</p>
                  </div>
                  <button onClick={fetchUsers} className="text-blue-600 hover:text-blue-700 text-xs font-bold transition-colors bg-blue-50 px-3 py-1.5 border border-blue-100 rounded-lg">Sync User Catalog List</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Full Username</th>
                        <th className="px-6 py-4">Credential Email</th>
                        <th className="px-6 py-4">Database Node Role</th>
                        <th className="px-6 py-4">Access Rights</th>
                        <th className="px-6 py-4">Actions Node</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {usersList.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-10 text-slate-400">Querying database registry nodes...</td>
                        </tr>
                      ) : (
                        usersList.map((user) => (
                          <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4 text-slate-900 font-black flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-xs font-black text-indigo-600">
                                {user.name ? user.name.slice(0, 2).toUpperCase() : "US"}
                              </div>
                              {user.name}
                            </td>
                            <td className="px-6 py-4 text-slate-500">{user.email}</td>
                            <td className="px-6 py-4">
                              <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${user.role === 'admin' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                {user.role === 'admin' ? "SysAdmin Node" : "Live Auth User"}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-slate-500 font-medium">Standard</span>
                            </td>
                            <td className="px-6 py-4 flex gap-1.5 items-center">
                              <button onClick={() => handleEditUserClick(user)} className="text-blue-600 hover:text-blue-800 text-[11px] font-bold flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-md border border-blue-100 cursor-pointer">
                                <Edit2 className="w-3 h-3" /> Edit
                              </button>
                              {user.email !== 'admin@system.com' && (
                                <button onClick={() => handleDeleteUser(user.id)} className="text-red-600 hover:text-red-800 text-[11px] font-bold flex items-center gap-1 bg-red-50 px-2 py-1 rounded-md border border-red-101 cursor-pointer">
                                  <Trash2 className="w-3 h-3" /> Delete
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Global Content Settings & Site Pages Curation */}
          {activeTab === 'alerts' && (
            <div id="pane-alerts" className="animate-fade-in bg-white rounded-2xl border border-slate-200 shadow-xs p-6">
              <h3 className="font-extrabold text-slate-900 tracking-tight text-xs uppercase mb-4">Deal Alert Subscriptions ({priceAlertsList.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="text-slate-500 uppercase font-bold bg-slate-50">
                    <tr>
                      <th className="px-4 py-3">User</th>
                      <th className="px-4 py-3">Product</th>
                      <th className="px-4 py-3">Old Price</th>
                      <th className="px-4 py-3">New Price</th>
                      <th className="px-4 py-3">Created</th>
                    </tr>
                  </thead>
                  <tbody>
                    {priceAlertsList.map(a => (
                      <tr key={a.id} className="border-t border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3 font-semibold text-slate-900">{a.email}</td>
                        <td className="px-4 py-3 text-slate-700 truncate max-w-[200px]">{a.product_name}</td>
                        <td className="px-4 py-3 text-slate-600">£{a.old_price}</td>
                        <td className="px-4 py-3 text-emerald-600 font-bold">£{a.new_price}</td>
                        <td className="px-4 py-3 text-slate-500">{new Date(a.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'blogs' && (
            <div id="pane-blogs" className="space-y-6 animate-fade-in text-left">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                    <FileText className="w-5 h-5 text-indigo-600" />
                    Affiliate Blog Management
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Create, edit, and manage high-ranking UK shopping guides. You can link blogs to specific products for better conversion.
                  </p>
                </div>
                
                <button
                  onClick={handleCreateNewBlog}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all self-start md:self-center flex items-center gap-2 cursor-pointer flex-shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Write New Blog Post
                </button>
              </div>

              {editingBlog && (
                <div className="bg-white border-2 border-indigo-100 p-6 rounded-2xl relative shadow-xl">
                  <button onClick={() => setEditingBlog(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                  <h4 className="font-extrabold text-slate-900 flex items-center gap-2 mb-6 text-sm uppercase tracking-tight">
                    {editingBlog.id ? `Editing Article: ${blogForm.title}` : 'Drafting New Affiliate Shopping Guide'}
                  </h4>
                  
                  {blogSaveSuccess && <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold">{blogSaveSuccess}</div>}
                  
                  <form onSubmit={handleSaveBlog} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Article Headline (SEO Focused)</label>
                      <input required type="text" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none transition-all" placeholder="e.g., Why the Dyson V15 is the Best Vacuum for UK Pet Owners in 2026" />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">URL Slug (Unique)</label>
                      <input required type="text" value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none transition-all" placeholder="dyson-v15-pet-review-uk" />
                    </div>
                    
                    <div>
                      <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Linked Product ID (Optional)</label>
                      <select value={blogForm.product_id} onChange={e => setBlogForm({...blogForm, product_id: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none transition-all">
                        <option value="">None</option>
                        {productsList.map(p => (
                          <option key={p.db_id} value={p.db_id}>{p.ai_title} (£{p.price})</option>
                        ))}
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Article Content (Markdown Supported)</label>
                      <textarea required rows={12} value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 font-mono focus:bg-white focus:border-indigo-500 outline-none transition-all leading-relaxed" placeholder="Write your premium shopping guide here..." />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Banner Image URL</label>
                      <input type="text" value={blogForm.banner_image} onChange={e => setBlogForm({...blogForm, banner_image: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none transition-all" placeholder="https://..." />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Direct Affiliate Link</label>
                      <input type="text" value={blogForm.affiliate_link} onChange={e => setBlogForm({...blogForm, affiliate_link: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none transition-all" placeholder="https://amazon.co.uk/..." />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-black text-slate-500 mb-1.5">Tags (Comma Separated)</label>
                      <input type="text" value={blogForm.tags} onChange={e => setBlogForm({...blogForm, tags: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 focus:bg-white focus:border-indigo-500 outline-none transition-all" placeholder="#ukdeals, #luxury, #homecare" />
                    </div>

                    <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <label className="block text-[10px] uppercase font-black text-slate-400 mb-1.5">SEO Meta Title</label>
                        <input type="text" value={blogForm.seo_title} onChange={e => setBlogForm({...blogForm, seo_title: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:border-indigo-500 outline-none transition-all" placeholder="Max 60 chars" />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase font-black text-slate-400 mb-1.5">SEO Meta Description</label>
                        <input type="text" value={blogForm.seo_description} onChange={e => setBlogForm({...blogForm, seo_description: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl p-2.5 text-xs text-slate-800 focus:border-indigo-500 outline-none transition-all" placeholder="Max 160 chars" />
                      </div>
                    </div>

                    <div className="md:col-span-2 flex gap-3 pt-4">
                      <button type="submit" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-[11px] uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-200">
                        {editingBlog.id ? 'Save Article Updates' : 'Publish New Shopping Guide'}
                      </button>
                      <button type="button" onClick={() => setEditingBlog(null)} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-[11px] uppercase tracking-widest py-3.5 rounded-xl transition-all">
                        Discard Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Blog Post Information</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Linked Product</th>
                        <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {blogLoading ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-12 text-center text-slate-400 text-xs font-bold">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                            Retrieving article catalog...
                          </td>
                        </tr>
                      ) : blogsList.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-12 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                            No articles found in database.
                          </td>
                        </tr>
                      ) : blogsList.map((blog) => (
                        <tr key={blog.id} className="hover:bg-slate-50 transition-colors group">
                          <td className="px-6 py-5">
                            <div className="flex items-center gap-4">
                              <img src={blog.banner_image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=100'} className="w-12 h-12 rounded-lg object-cover bg-slate-100" referrerPolicy="no-referrer" />
                              <div className="min-w-0">
                                <h5 className="font-extrabold text-slate-900 text-xs truncate group-hover:text-indigo-600 transition-colors">{blog.title}</h5>
                                <p className="text-[10px] text-slate-400 font-bold mt-0.5">/{blog.slug}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            {blog.product_id ? (
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[10px] font-black border border-emerald-100">
                                  <Sparkles className="w-3 h-3" /> Linked to Product #{blog.product_id}
                                </span>
                            ) : (
                                <span className="text-[10px] font-bold text-slate-300">No linked item</span>
                            )}
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleEditBlogClick(blog)} className="p-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all cursor-pointer">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => handleDeleteBlog(blog.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all cursor-pointer">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'pages' && (
            <div id="pane-pages" className="space-y-8 animate-fade-in">
              
              {/* Part 1: Global Header / Footer Navigation Manager */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200">
                <div className="border-b border-slate-100 pb-4 mb-6">
                  <h3 className="font-extrabold text-slate-900 tracking-tight text-xs uppercase flex items-center gap-2">
                    <Globe className="w-5 h-5 text-indigo-600" /> Dynamic Header & Footer Navigations content
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-1">Manage header/footer active columns, promotions banner badge, and global copyright notices dynamically.</p>
                </div>

                {globalSettingsSuccess && (
                  <div className="mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-3 text-xs font-bold">
                    {globalSettingsSuccess}
                  </div>
                )}

                <form onSubmit={handleSaveGlobalSettings} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Subsection: Header */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                      <span>📢</span> Header Bar & Subheader Quicklinks
                    </h4>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Subheader Promo text</label>
                      <input 
                        required 
                        type="text" 
                        value={globalSettings.header_promo} 
                        onChange={e => setGlobalSettings({ ...globalSettings, header_promo: e.target.value })} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                        placeholder="New Releases in UK"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Header Quick Links (Raw JSON Array)</label>
                      <textarea 
                        rows={3} 
                        value={globalSettings.header_links} 
                        onChange={e => setGlobalSettings({ ...globalSettings, header_links: e.target.value })} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
                        placeholder='[{"label":"My Wishlist","href":"#","isWishlist":true}]'
                      />
                      <span className="text-[9px] text-slate-400 font-bold block mt-1">{"Format example: [{\"label\":\"Today Deals\",\"href\":\"/deals\"}]"}</span>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Footer Copyright Text</label>
                      <input 
                        required 
                        type="text" 
                        value={globalSettings.footer_copyright} 
                        onChange={e => setGlobalSettings({ ...globalSettings, footer_copyright: e.target.value })} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500"
                        placeholder="© 2026, UKStander.shop, Inc. or affiliates"
                      />
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                      <label className="block text-[10px] font-bold text-emerald-800 uppercase mb-1 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3" /> Rainforest Amazon API Key
                      </label>
                      <input 
                        type="password" 
                        value={globalSettings.rainforest_api_key} 
                        onChange={e => setGlobalSettings({ ...globalSettings, rainforest_api_key: e.target.value })} 
                        className="w-full bg-white border border-emerald-200 rounded-lg p-3 text-xs text-slate-800 focus:outline-none focus:border-emerald-500"
                        placeholder="Paste your Rainforest API key here"
                      />
                      <p className="text-[9px] text-emerald-600 font-medium mt-2 leading-tight">
                        When the 100-request limit is reached, simply update this key with a new one from your Rainforest account to resume automated hunts.
                      </p>
                    </div>
                  </div>

                  {/* Subsection: Footer Grid columns */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-1.5 flex items-center gap-1.5">
                      <span>🧭</span> Footer Columns & Navigation Links Grid
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Col 1 Heading</label>
                        <input required type="text" value={globalSettings.footer_company_heading} onChange={e => setGlobalSettings({ ...globalSettings, footer_company_heading: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Col 1 Links JSON</label>
                        <input required type="text" value={globalSettings.footer_company_links} onChange={e => setGlobalSettings({ ...globalSettings, footer_company_links: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-mono focus:outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Col 2 Heading</label>
                        <input required type="text" value={globalSettings.footer_support_heading} onChange={e => setGlobalSettings({ ...globalSettings, footer_support_heading: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Col 2 Links JSON</label>
                        <input required type="text" value={globalSettings.footer_support_links} onChange={e => setGlobalSettings({ ...globalSettings, footer_support_links: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-mono focus:outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Col 3 Heading</label>
                        <input required type="text" value={globalSettings.footer_legal_heading} onChange={e => setGlobalSettings({ ...globalSettings, footer_legal_heading: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Col 3 Links JSON</label>
                        <input required type="text" value={globalSettings.footer_legal_links} onChange={e => setGlobalSettings({ ...globalSettings, footer_legal_links: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-mono focus:outline-none" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Col 4 Heading</label>
                        <input required type="text" value={globalSettings.footer_resource_heading} onChange={e => setGlobalSettings({ ...globalSettings, footer_resource_heading: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase mb-1">Col 4 Links JSON</label>
                        <input required type="text" value={globalSettings.footer_resource_links} onChange={e => setGlobalSettings({ ...globalSettings, footer_resource_links: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs text-slate-800 font-mono focus:outline-none" />
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end">
                    <button 
                      type="submit" 
                      disabled={globalSettingsLoading}
                      className="bg-indigo-650 bg-[#0B192C] text-white hover:bg-indigo-700 font-bold text-xs uppercase px-6 py-3 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {globalSettingsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4 text-green-300" />} Save Navigations & Footer Core Settings
                    </button>
                  </div>
                </form>
              </div>

              {/* Part 2: Static Page Overrides */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200">
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider mb-3">Informational Pages</h4>
                  <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">Choose which page header/footer static informational pages you wish to override dynamically in the database.</p>
                  <div className="space-y-1.5">
                    {[
                      { key: 'privacy', label: 'Privacy Policy' },
                      { key: 'terms', label: 'Terms of Service' },
                      { key: 'disclosure', label: 'Affiliate Disclosure' },
                      { key: 'cookies', label: 'Cookies Policy' },
                      { key: 'contact', label: 'Contact Us Center' },
                      { key: 'data-rights', label: 'User Data Rights' },
                      { key: 'about-ukstander', label: 'About Us Page' },
                      { key: 'blog', label: 'Smart Shopping Blog' },
                      { key: 'affiliate', label: 'Affiliates Portal' },
                      { key: 'returns', label: 'Returns & Replacements' },
                    ].map((p) => (
                      <button 
                        key={p.key}
                        onClick={() => handlePageChange(p.key)}
                        type="button"
                        className={`w-full text-left px-3.5 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-between border ${selectedPageKey === p.key ? 'bg-indigo-50 text-indigo-700 border-indigo-100 font-black' : 'bg-transparent text-slate-600 border-transparent hover:bg-slate-50'}`}
                      >
                        {p.label}
                        <ChevronRight className="w-3 h-3 text-slate-400" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Editor Workspace Column */}
                <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 flex flex-col h-[520px]">
                  <h3 className="font-extrabold text-slate-900 tracking-tight text-xs uppercase mb-1">Curation Editor Panel</h3>
                  <p className="text-[11px] text-slate-400 mb-4">Editing Page Database Key: <span className="font-mono bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-[10px] font-bold">{selectedPageKey}</span></p>
                  
                  {pageSaveSuccess && <div className="mb-4 text-green-800 bg-green-50 border border-green-200 p-3.5 rounded-xl text-xs font-bold">{pageSaveSuccess}</div>}

                  <form onSubmit={handleSavePage} className="flex-1 flex flex-col gap-4">
                    <div>
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">Site-Rendered Page Title</label>
                      <input 
                        required 
                        type="text" 
                        value={pageTitle} 
                        onChange={e => setPageTitle(e.target.value)} 
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 font-bold focus:outline-none focus:border-indigo-500" 
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <label className="block text-[10px] font-black uppercase tracking-wider text-slate-700 mb-1">Article Body Content (Formatted text paragraphs)</label>
                      <textarea 
                        required 
                        value={pageContent} 
                        onChange={e => setPageContent(e.target.value)} 
                        className="w-full flex-1 bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 leading-relaxed font-mono resize-none" 
                        placeholder="Input standard body text for output..." 
                      />
                    </div>
                    <button type="submit" className="self-end bg-[#0B192C] hover:bg-indigo-700 text-white font-bold text-xs uppercase px-5 py-2.5 rounded-lg flex items-center gap-1 cursor-pointer">
                      <Check className="w-4 h-4 text-emerald-400" /> Save Curation Page
                    </button>
                  </form>
                </div>
              </div>

            </div>
          )}

          {/* TAB 5: Support Takeover Desk */}
          {activeTab === 'chats' && (
            <div id="pane-chats" className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in">
              {/* Chats List Column */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col overflow-hidden h-[510px]">
                <div className="bg-[#0b192c] text-white p-4 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-red-500" />
                    <h3 className="text-xs font-bold uppercase tracking-widest leading-none">Support Takeovers</h3>
                  </div>
                  <span className="text-[10px] bg-red-600/30 text-red-300 font-bold px-2 py-0.5 rounded-md">Live Escort</span>
                </div>

                <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                  {activeChats.length === 0 ? (
                    <div className="text-center py-16 px-4">
                      <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                      <h4 className="text-xs font-bold text-slate-700">No Active Assistance Conversations</h4>
                      <p className="text-[10px] text-slate-400 mt-1">Users are presently being handled fully by autonomous AI agents.</p>
                    </div>
                  ) : (
                    activeChats.map((chat) => (
                      <div 
                        key={chat.email} 
                        onClick={() => handleSelectUserChat(chat.email)}
                        className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col gap-1.5 ${selectedUserEmail === chat.email ? 'bg-blue-50/50 border-r-4 border-r-blue-600' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-800 truncate max-w-[150px]">{chat.email}</span>
                          <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${chat.status === 'admin' ? 'bg-indigo-100 text-indigo-700' : chat.status === 'connecting' ? 'bg-amber-100 text-amber-700 animate-pulse' : 'bg-emerald-50 text-emerald-700'}`}>
                            {chat.status}
                          </span>
                        </div>
                        {/* Takeover Control buttons */}
                        <div className="flex gap-2 mt-1">
                          {chat.status !== 'admin' ? (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleTakeoverChat(chat.email, 'admin'); }}
                              className="bg-indigo-600 hover:bg-indigo-700 text-white text-[9px] font-bold uppercase px-2 py-1 rounded-sm cursor-pointer"
                            >
                              Takeover Live
                            </button>
                          ) : (
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleTakeoverChat(chat.email, 'ai'); }}
                              className="bg-slate-300 hover:bg-slate-400 text-slate-700 text-[9px] font-bold uppercase px-2 py-1 rounded-sm cursor-pointer"
                            >
                              Return to AI
                            </button>
                          )}
                          <span className="text-[9px] text-slate-400 self-center font-bold">Session Active</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Chat Message Panel */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs h-[510px] flex flex-col">
                {selectedUserEmail ? (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 truncate max-w-[250px]">Chatting: {selectedUserEmail}</h4>
                        <span className="text-[9px] text-slate-500 font-bold">Human takeover mode active</span>
                      </div>
                      <button onClick={() => setSelectedUserEmail(null)} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase">Disconnect View</button>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-slate-50/50">
                      {chatLoading ? (
                        <div className="text-center py-20 text-[10px] text-slate-400 flex items-center justify-center gap-1"><Loader2 className="w-4 h-4 animate-spin" strokeWidth={3} /> Syncing conversation nodes...</div>
                      ) : chatMessages.length === 0 ? (
                        <div className="text-center py-20 text-[10px] text-slate-400">Send first message greeting to establish secure endpoint.</div>
                      ) : (
                        chatMessages.map((msg, i) => {
                          const isUser = msg.role === 'user';
                          return (
                            <div key={i} className={`flex flex-col max-w-[80%] ${isUser ? 'align-start self-start text-left' : 'align-end self-end text-right ml-auto'}`}>
                              <span className="text-[9px] text-slate-400 uppercase font-black mb-0.5 px-1">{isUser ? 'User Shopper' : 'You (Admin)'}</span>
                              <div className={`p-3 rounded-2xl text-xs font-bold leading-relaxed shadow-sm ${isUser ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-none' : 'bg-[#0B192C] text-white rounded-tr-none'}`}>
                                {msg.content}
                              </div>
                            </div>
                          )
                        })
                      )}
                    </div>
                    <div className="p-3 border-t border-slate-200 bg-white flex gap-2">
                      <input 
                        type="text" 
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') handleSendReply(); }}
                        placeholder="Type standard reply message..."
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                      />
                      <button 
                        onClick={handleSendReply}
                        className="bg-[#0B192C] hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> Send
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-50/50">
                    <MessageSquare className="w-12 h-12 text-slate-300 mb-2" />
                    <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">Takeovers Workspace Area</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">Select an active assistance candidate conversation on the left panel to takeover controls and start chatting live.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div id="pane-trends" className="space-y-6 animate-fade-in text-left">
              {/* Header section with indicators and scrape triggers */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-emerald-600 animate-pulse" />
                    UK Retail Search & Trend Discovery Engine (Autopilot)
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Autonomous deep crawler checking Google Trends UK, Amazon Hot Releases, and UK viral seasonal triggers. Under review suggestions will remain pending here until assigned an affiliate marker and approved.
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Autopilot Active
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> Next scheduled scan: Daily 02:00 AM Vector Grid Sync
                    </span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <input 
                      type="text" 
                      id="rf-search-term"
                      placeholder="Amazon UK Search (e.g. air fryer)" 
                      className="text-xs border border-slate-200 rounded-lg px-3 py-2 w-full max-w-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <button
                      onClick={() => {
                        const term = (document.getElementById('rf-search-term') as HTMLInputElement)?.value || 'tech';
                        setLoadingTrends(true);
                        fetch('/api/admin/trigger-rainforest-sync', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ search_term: term })
                        })
                        .then(res => res.json())
                        .then(data => {
                          if (data.success) {
                            setSuccess(data.message);
                            fetchTrendSuggestions();
                          } else {
                            alert(data.error || "Rainforest sync failed");
                          }
                        })
                        .finally(() => setLoadingTrends(false));
                      }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <Globe className="w-3.5 h-3.5" /> Rainforest Sync
                    </button>
                  </div>
                </div>
                
                <button
                  id="btn-discover-now"
                  disabled={loadingTrends}
                  onClick={() => {
                    setLoadingTrends(true);
                    fetch('/api/admin/trend-suggestions/discover', { method: 'POST' })
                      .then(res => res.json())
                      .then(data => {
                        if (data.success) {
                          setSuccess(`Discovered and uploaded ${data.count || 10} new UK product trend suggestions successfully!`);
                          fetchTrendSuggestions();
                        } else {
                          alert(data.error || "Trend auto-discovery failed");
                        }
                      })
                      .catch(err => {
                        console.error(err);
                        alert("Failed to reach discovery server API.");
                      })
                      .finally(() => setLoadingTrends(false));
                  }}
                  className="bg-[#0B192C] hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-md transition-all self-start md:self-center flex items-center gap-2 cursor-pointer flex-shrink-0"
                >
                  <RefreshCw className={`w-4 h-4 ${loadingTrends ? 'animate-spin' : ''}`} />
                  {loadingTrends ? 'Scanning search grids...' : 'Trigger Trend Scan Now'}
                </button>
              </div>

              {success && (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-xs font-bold flex items-center justify-between">
                  <span>{success}</span>
                  <button onClick={() => setSuccess('')} className="text-emerald-500 hover:text-emerald-700 uppercase text-[10px]">Dismiss</button>
                </div>
              )}

              {/* Main Grid display area */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Side: Candidates list */}
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex items-center justify-between pb-1">
                    <h4 className="text-xs uppercase font-black tracking-widest text-slate-500">
                      Discovered Candidates ({trendSuggestions.length})
                    </h4>
                    <span className="text-[10px] text-slate-400 font-bold">Unpublished retail items awaiting vetting</span>
                  </div>

                  {loadingTrends && trendSuggestions.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
                      <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-2" />
                      <p className="text-xs text-slate-400 font-bold">Synchronizing trending UK commerce databases...</p>
                    </div>
                  ) : trendSuggestions.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
                      <Sparkles className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                      <p className="text-xs text-slate-400 font-bold">No trending suggestions exist currently.</p>
                      <button 
                        onClick={() => {
                          setLoadingTrends(true);
                          fetch('/api/admin/trend-suggestions/discover', { method: 'POST' })
                            .then(res => res.json())
                            .then(() => fetchTrendSuggestions())
                            .catch(err => console.error(err))
                            .finally(() => setLoadingTrends(false));
                        }} 
                        className="mt-3 text-indigo-600 hover:text-indigo-800 font-bold text-xs"
                      >
                        Click here to seed candidates
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                      {trendSuggestions.map((sug) => {
                        const isPending = sug.status === 'pending';
                        const isApproved = sug.status === 'approved';
                        const isRejected = sug.status === 'rejected';

                        return (
                          <div 
                            key={sug.id} 
                            onClick={() => {
                              setSelectedSuggestion(sug);
                              setApproveForm({
                                title: sug.suggested_title,
                                description: sug.suggested_description,
                                price: sug.price.toString(),
                                category: sug.category,
                                image_url: sug.image_url,
                                affiliate_link: ''
                              });
                            }}
                            className={`p-4 rounded-xl border transition-all cursor-pointer bg-white ${selectedSuggestion?.id === sug.id ? 'border-indigo-600 ring-2 ring-indigo-50/50 shadow-sm' : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'}`}
                          >
                            <div className="flex flex-col sm:flex-row gap-4">
                              <img 
                                src={sug.image_url} 
                                alt={sug.suggested_title} 
                                className="w-full sm:w-20 sm:h-20 h-32 rounded-lg object-cover bg-slate-100 flex-shrink-0 border border-slate-100"
                                referrerPolicy="no-referrer"
                              />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-1">
                                  <span className="text-[9px] uppercase font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                    {sug.category}
                                  </span>
                                  
                                  {isPending && (
                                    <span className="text-[9px] uppercase font-black bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-100">
                                      Pending Approval
                                    </span>
                                  )}
                                  {isApproved && (
                                    <span className="text-[9px] uppercase font-black bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-100">
                                      Approved
                                    </span>
                                  )}
                                  {isRejected && (
                                    <span className="text-[9px] uppercase font-black bg-slate-50 text-slate-500 px-2 py-0.5 rounded border border-slate-100">
                                      Rejected
                                    </span>
                                  )}
                                </div>

                                <h5 className="font-extrabold text-slate-900 text-xs mt-1 truncate">
                                  {sug.suggested_title}
                                </h5>
                                
                                <span className="text-[10px] font-black text-slate-700 block mt-0.5">
                                  Estimated Retail: £{parseFloat(sug.price).toFixed(2)}
                                </span>

                                <p className="text-[10px] text-slate-500 line-clamp-1 mt-1 font-medium">
                                  {sug.suggested_description}
                                </p>

                                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mt-2 text-[10px] text-slate-600 font-bold leading-normal">
                                  <span className="text-slate-400 font-black uppercase text-[9px] block">UK Search Trigger:</span>
                                  {sug.trend_reason}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Right Side: Vetting Form Panel */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs h-fit self-start">
                  {selectedSuggestion ? (
                    <div className="space-y-4">
                      <div className="border-b border-slate-100 pb-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs uppercase font-black tracking-wider text-slate-700">
                            Vetting Workflow Console
                          </h4>
                          <button 
                            onClick={() => setSelectedSuggestion(null)} 
                            className="text-slate-400 hover:text-slate-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase">
                          Candidacy ID: #{selectedSuggestion.id}
                        </p>
                      </div>

                      {selectedSuggestion.status === 'approved' ? (
                        <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 p-4 rounded-xl text-xs font-bold leading-relaxed text-center">
                          <Check className="w-8 h-8 text-emerald-500 mx-auto mb-1.5" />
                          This seasonal trend alternative has already been approved and merged into the active storefront products database successfully!
                        </div>
                      ) : selectedSuggestion.status === 'rejected' ? (
                        <div className="bg-slate-50 border border-slate-100 text-slate-500 p-4 rounded-xl text-xs font-bold leading-relaxed text-center">
                          <X className="w-8 h-8 text-slate-400 mx-auto mb-1.5" />
                          This suggestion was rejected. You can edit fields and re-approve below to override and bring to listing!
                        </div>
                      ) : null}

                      {/* Display original reference link */}
                      <div className="bg-[#0B192C] text-white p-3 rounded-xl text-xs flex items-center justify-between gap-2 border border-slate-800">
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] uppercase font-black text-slate-400 block">External retail seed:</span>
                          <span className="font-bold text-[10px] truncate block text-slate-200">
                            {selectedSuggestion.source_or_amazon_link}
                          </span>
                        </div>
                        <a 
                          href={selectedSuggestion.source_or_amazon_link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="bg-indigo-600 hover:bg-indigo-700 p-2 rounded-lg text-white flex-shrink-0 transition-all flex items-center justify-center"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* Form Details */}
                      <div className="space-y-3 text-left">
                        <div>
                          <label className="block text-[10px] uppercase font-black text-slate-500 mb-1">
                            Editable Display Title
                          </label>
                          <input 
                            type="text" 
                            value={approveForm.title} 
                            onChange={(e) => setApproveForm({ ...approveForm, title: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] uppercase font-black text-slate-500 mb-1">
                              Price (£)
                            </label>
                            <input 
                              type="number" 
                              step="0.01"
                              value={approveForm.price} 
                              onChange={(e) => setApproveForm({ ...approveForm, price: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] uppercase font-black text-slate-500 mb-1">
                              Category
                            </label>
                            <select 
                              value={approveForm.category} 
                              onChange={(e) => setApproveForm({ ...approveForm, category: e.target.value })}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                            >
                              <option value="Electronics">Electronics</option>
                              <option value="Home & Kitchen">Home & Kitchen</option>
                              <option value="Health & Beauty">Health & Beauty</option>
                              <option value="Computers">Computers</option>
                              <option value="Fashion & Accessories">Fashion & Accessories</option>
                              <option value="Garden & Outdoors">Garden & Outdoors</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-black text-slate-500 mb-1">
                            Listing Rich Description
                          </label>
                          <textarea 
                            rows={3}
                            value={approveForm.description} 
                            onChange={(e) => setApproveForm({ ...approveForm, description: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white leading-relaxed resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] uppercase font-black text-slate-500 mb-1">
                            Cover Image URL
                          </label>
                          <input 
                            type="text" 
                            value={approveForm.image_url} 
                            onChange={(e) => setApproveForm({ ...approveForm, image_url: e.target.value })}
                            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white"
                          />
                          <div className="mt-2 text-center rounded-lg overflow-hidden border border-slate-100 bg-slate-50 max-h-24 flex items-center justify-center">
                            <img 
                              src={approveForm.image_url || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=150"} 
                              alt="Thumbnail preview" 
                              className="object-cover h-24 w-full"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <label className="block text-[10px] uppercase font-black text-rose-600 mb-1">
                            Your Amazon Associates Affiliate Link
                          </label>
                          <input 
                            type="text" 
                            required
                            placeholder="e.g. https://www.amazon.co.uk/dp/B08XM1X3GG?tag=yourtag-21" 
                            value={approveForm.affiliate_link} 
                            onChange={(e) => setApproveForm({ ...approveForm, affiliate_link: e.target.value })}
                            className="w-full bg-rose-50/50 border border-rose-200 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:bg-white placeholder-rose-300"
                          />
                          <span className="text-[9px] text-slate-400 font-bold block mt-1 leading-normal">
                            Mandatory field. Your UK Associate custom tag is automatically appended to ensure referral credits accrue correctly on customer click-outs.
                          </span>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex flex-col gap-3 pt-2">
                        <button
                          onClick={() => {
                            if (!approveForm.affiliate_link) {
                              alert("Please input your custom Amazon UK affiliate link to ensure credit is captured upon customer checkouts!");
                              return;
                            }
                            
                            setTrendsActionLoader('approving');
                            fetch('/api/admin/trend-suggestions/approve', {
                              method: 'POST',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({
                                id: selectedSuggestion.id,
                                title: approveForm.title,
                                description: approveForm.description,
                                price: approveForm.price,
                                category: approveForm.category,
                                image_url: approveForm.image_url,
                                affiliate_link: approveForm.affiliate_link
                              })
                            })
                              .then(res => res.json())
                              .then(data => {
                                if (data.success) {
                                  setSuccess(`Published ${approveForm.title} live! AI is now writing the SEO blog post...`);
                                  
                                  // Phase 2: AI Blog Generation
                                  setTrendsActionLoader('generating_blog');
                                  return fetch('/api/admin/blogs/generate-ai', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ suggestionId: selectedSuggestion.id })
                                  });
                                } else {
                                  throw new Error(data.error || "Publishing failed");
                                }
                              })
                              .then(res => res.json())
                              .then(data => {
                                if (data.success) {
                                  setSuccess("Success: Product published and AI Blog Post generated perfectly!");
                                  setSelectedSuggestion(null);
                                  fetchTrendSuggestions();
                                  fetchBlogs();
                                  fetchAnalytics();
                                } else {
                                  alert("Product published, but AI blog post failed: " + (data.error || "Unknown error"));
                                  setSelectedSuggestion(null);
                                  fetchTrendSuggestions();
                                }
                              })
                              .catch(err => {
                                console.error(err);
                                alert("Error: " + err.message);
                              })
                              .finally(() => setTrendsActionLoader(null));
                          }}
                          disabled={!!trendsActionLoader || selectedSuggestion.status === 'approved'}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-black text-xs p-4 rounded-xl shadow-lg shadow-emerald-100 transition-all text-center cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Sparkles className={`w-4 h-4 ${trendsActionLoader === 'generating_blog' ? 'animate-spin' : ''}`} />
                          {trendsActionLoader === 'approving' ? 'Publishing Live...' : 
                           trendsActionLoader === 'generating_blog' ? 'AI Writing Article...' : 
                           'Publish Live & Create AI Blog'}
                        </button>

                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              if (!confirm("Are you sure you want to dismiss this trend candidate recommendation?")) return;
                              setTrendsActionLoader('rejecting');
                              fetch('/api/admin/trend-suggestions/reject', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: selectedSuggestion.id })
                              })
                                .then(res => res.json())
                                .then(data => {
                                  if (data.success) {
                                    setSuccess("Successfully rejected the trend suggestion");
                                    setSelectedSuggestion(null);
                                    fetchTrendSuggestions();
                                  } else {
                                    alert(data.error || "Rejection failed");
                                  }
                                })
                                .catch(err => {
                                  console.error(err);
                                  alert("Failed to connect to backend reject api.");
                                })
                                .finally(() => setTrendsActionLoader(null));
                            }}
                            disabled={!!trendsActionLoader || selectedSuggestion.status === 'rejected'}
                            className="flex-1 bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 font-bold text-xs px-4 py-3 rounded-lg transition-all text-center cursor-pointer"
                          >
                            Reject & Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Sparkles className="w-12 h-12 text-slate-200 mx-auto mb-2" />
                      <h4 className="text-xs uppercase font-black text-slate-700">Suggestion Inspector</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        Click on any discovered UK retail item from the checklist to pre-populate catalogs, configure associate tokens, and publish instantly.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* TAB 9: Easy Deployment & VPS Management Hub (Oracle VM Helper) */}
          {activeTab === 'deployment' && (
            <div id="pane-deployment" className="space-y-6 animate-fade-in text-left">
              {/* Main Banner Card */}
              <div className="bg-gradient-to-r from-blue-900 via-[#0B192C] to-slate-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl border border-blue-800/50">
                <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full filter blur-3xl"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="bg-blue-500/20 text-blue-300 font-black tracking-widest text-[10px] uppercase px-3.5 py-1.5 rounded-full border border-blue-400/30">
                      Oracle Cloud Infrastructure (OCI) Helper
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                      Easily Deploy & Manage OCI VM (<span className="text-blue-400 font-mono">79.72.94.8</span>)
                    </h2>
                    <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                      Sabar aur saaf kam ke liye ye deployment browser hub design kiya gaya hai. Is screen par aap asani se pm2 processes ko manage, duplicate apps ko band (Safaai), Cloudflare proxy configuration, aur GitHub automated setup commands 1-click me dekh aur copy kar sakte hain. No complicated steps!
                    </p>
                  </div>
                  <div className="bg-slate-800/80 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-700 max-w-xs shrink-0 flex items-center gap-3">
                    <Wifi className="w-5 h-5 text-green-400 animate-ping shrink-0" />
                    <div>
                      <div className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400">Server Target IP</div>
                      <div className="text-xs font-mono font-bold text-white">79.72.94.8</div>
                      <div className="text-[10px] text-green-400 font-medium">Auto-Deployer Active</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Server Control Center Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Left Side: Configuration Controls & Subtabs */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 pb-3 border-b border-slate-100">
                    Configuration Variable Inputs
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 select-none">Target VM IP Address</label>
                      <input 
                        type="text" 
                        value={deployIp}
                        onChange={(e) => setDeployIp(e.target.value)}
                        className="w-full text-xs font-mono px-3 py-2 border rounded-xl focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 select-none">Web Application Port</label>
                      <input 
                        type="text" 
                        value={deployPort}
                        onChange={(e) => setDeployPort(e.target.value)}
                        className="w-full text-xs font-mono px-3 py-2 border rounded-xl focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 select-none">DuckDNS Subdomain Prefix</label>
                      <input 
                        type="text" 
                        value={deployDomain}
                        onChange={(e) => setDeployDomain(e.target.value)}
                        placeholder="my-domain.duckdns.org"
                        className="w-full text-xs font-mono px-3 py-2 border rounded-xl focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 select-none">DuckDNS Token</label>
                      <input 
                        type="text" 
                        value={duckDnsToken}
                        onChange={(e) => setDuckDnsToken(e.target.value)}
                        placeholder="DuckDNS Access Token..."
                        className="w-full text-xs font-mono px-3 py-2 border rounded-xl focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 select-none">My Custom Shop Domain (for CF Tunnel)</label>
                      <input 
                        type="text" 
                        value={cfDomain}
                        onChange={(e) => setCfDomain(e.target.value)}
                        placeholder="ukstander.shop"
                        className="w-full text-xs font-mono px-3 py-2 border rounded-xl focus:ring-1 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                    <button 
                      onClick={() => setActiveDeploySubtab('easypanel')}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold text-left transition-all flex items-center gap-2 ${activeDeploySubtab === 'easypanel' ? 'bg-blue-600 text-white shadow-md' : 'text-blue-600 bg-blue-50/50 hover:bg-blue-100/50 border border-dashed border-blue-200'}`}
                    >
                      <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" /> ⚡ Vercel-Style Easypanel
                    </button>
                    <button 
                      onClick={() => setActiveDeploySubtab('pm2')}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold text-left transition-all flex items-center gap-2 ${activeDeploySubtab === 'pm2' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      <Terminal className="w-4 h-4" /> PM2 Cleaner & Safaai
                    </button>
                    <button 
                      onClick={() => setActiveDeploySubtab('autodeploy')}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold text-left transition-all flex items-center gap-2 ${activeDeploySubtab === 'autodeploy' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      <RefreshCw className="w-4 h-4" /> GitHub Auto-Deploy Setup
                    </button>
                    <button 
                      onClick={() => setActiveDeploySubtab('domain')}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold text-left transition-all flex items-center gap-2 ${activeDeploySubtab === 'domain' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      <Globe className="w-4 h-4" /> DNS & Cloudflare Tunnel
                    </button>
                    <button 
                      onClick={() => setActiveDeploySubtab('firewall')}
                      className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold text-left transition-all flex items-center gap-2 ${activeDeploySubtab === 'firewall' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'}`}
                    >
                      <Lock className="w-4 h-4" /> Ports & Firewalls (Oracle Rules)
                    </button>
                  </div>
                </div>

                {/* Right Side: Detailed Guides & Click to Copy Buttons */}
                <div className="lg:col-span-3 space-y-6">
                  
                  {/* Subtab 0: Easypanel PaaS Web GUI Guide */}
                  {activeDeploySubtab === 'easypanel' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                      <div className="border-b pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h3 className="font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            <Sparkles className="text-blue-600 w-5 h-5 animate-pulse" />
                            Vercel-Style Easypanel Self-Hosted PaaS Setup Guide
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">
                            Apne Oracle Cloud VM (<span className="font-mono text-blue-600 font-bold">79.72.94.8</span>) par pre-installed Vercel alternatives se zero-setup node deployments seekhein.
                          </p>
                        </div>
                        <span className="bg-blue-105 text-blue-700 border border-blue-200 text-[10px] font-black px-3 py-1 rounded-full shrink-0 max-w-fit uppercase">
                          Zero-Setup SSL & git push
                        </span>
                      </div>

                      {/* Troubleshooting First: Port Timeout Warning */}
                      <div className="bg-rose-50 border border-rose-200 p-5 rounded-2xl space-y-3">
                        <div className="flex items-center gap-2 text-rose-800">
                          <AlertCircle className="w-5 h-5 animate-bounce shrink-0" />
                          <h4 className="text-xs font-black uppercase tracking-wider">CRITICAL: Timeout Warning & Fix (Why Port 3000 Timed Out)</h4>
                        </div>
                        <p className="text-xs text-rose-700 leading-relaxed pl-7">
                          Yar aapne terminal me <code className="bg-white border px-1 rounded font-mono font-bold text-rose-800 text-[11px]">sudo iptables -F</code> command run kiya. Iptables flush karne se <strong>Docker Swarm aur containers ki internal iptables networking rules delete hojati hain!</strong> Isliye port 3000 standard block (connection time out) hogeya.
                        </p>
                        <p className="text-xs text-rose-700 leading-relaxed pl-7 font-bold">
                          Isko immediately thik karne ke liye aap terminal me ye absolute asan commands run karein:
                        </p>

                        <div className="pl-7 space-y-3">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-rose-600 block">1) Restart docker daemon (To automatically rebuild networking rules)</span>
                            <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-3 flex justify-between items-center border border-slate-800 shadow-sm">
                              <span>sudo systemctl restart docker</span>
                              <button 
                                onClick={() => handleCopyText('sudo systemctl restart docker', 'restartdocker')}
                                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md"
                              >
                                <Copy className="w-3.5 h-3.5" /> {copiedText === 'restartdocker' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-rose-600 block">2) Wait 10 seconds and Force restart Easypanel Swarm services</span>
                            <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-3 flex justify-between items-center border border-slate-800 shadow-sm">
                              <span>sudo docker service update --force easypanel</span>
                              <button 
                                onClick={() => handleCopyText('sudo docker service update --force easypanel', 'updateforce')}
                                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md"
                              >
                                <Copy className="w-3.5 h-3.5" /> {copiedText === 'updateforce' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Step-by-Step Vercel Integration */}
                      <div className="space-y-6 pt-2">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Open Easypanel GUI Control Dashboard</h4>
                        </div>
                        <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                          Upar di gayi commands ko run karne ke bad browser me ye control admin link open karein:
                        </p>
                        <div className="pl-7">
                          <a 
                            href={`http://${deployIp}:3000`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-blue-600 hover:underline bg-blue-50 px-3 py-2 rounded-xl border border-blue-200"
                          >
                            http://{deployIp}:3000/ <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Create a project & Application</h4>
                        </div>
                        <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                          Easypanel UI me pehli bar credential register karne ke bad:
                          <ul className="list-disc pl-5 mt-1.5 space-y-1">
                            <li><strong>Create Project:</strong> "Projects" tab par click karein aur name set up karein: <code className="bg-slate-100 border px-1 rounded font-mono font-bold text-blue-700">ukstander-shop</code></li>
                            <li><strong>Create Application Card:</strong> App par click karein, select name "ukstander-app"</li>
                          </ul>
                        </p>

                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Configure GitHub Source parameters</h4>
                        </div>
                        <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                          Under the "Build" configurations or Git settings sidepane, set key fields:
                          <ul className="list-disc pl-5 mt-1.5 space-y-1">
                            <li><strong>Source type:</strong> Git Repository</li>
                            <li><strong>Repository Url path:</strong> <code className="bg-slate-100 border px-1 rounded font-mono font-bold text-blue-700">https://github.com/ukstander-co/UKstander.shop.git</code></li>
                            <li><strong>Branch name mapping:</strong> <code className="bg-slate-100 border px-1 rounded font-mono font-bold text-blue-700">main</code></li>
                            <li><strong>Build method selection:</strong> Select <strong>Nixpacks</strong> (Nixpacks will automatically detect it is a full stack TypeScript Vite App, optimize builds and run command in no time!).</li>
                          </ul>
                        </p>

                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Variables Copy & Paste (Environment Secrets)</h4>
                        </div>
                        <p className="text-xs text-slate-600 pl-7 leading-relaxed font-semibold">
                          Easypanel Application ke "Environment" variables section sidepane me ye parameters paste karlein (Click on copy buttons):
                        </p>

                        <div className="pl-7 space-y-3.5">
                          {/* Var 1 */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">NODE_ENV</span>
                            <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-2.5 flex justify-between items-center border border-slate-800">
                              <span>NODE_ENV=production</span>
                              <button 
                                onClick={() => handleCopyText('NODE_ENV=production', 'prodvar')}
                                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] bg-slate-800 px-2 py-0.5 rounded-md"
                              >
                                {copiedText === 'prodvar' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>

                          {/* Var 2 */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">TURSO_DATABASE_URL</span>
                            <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-2.5 flex justify-between items-center border border-slate-800">
                              <span className="truncate max-w-sm">TURSO_DATABASE_URL=libsql://affiliate-app-db-ukstander-co.aws-eu-west-1.turso.io</span>
                              <button 
                                onClick={() => handleCopyText('TURSO_DATABASE_URL=libsql://affiliate-app-db-ukstander-co.aws-eu-west-1.turso.io', 'tursovar')}
                                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] bg-slate-800 px-2 py-0.5 rounded-md"
                              >
                                {copiedText === 'tursovar' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>

                          {/* Var 3 */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">TURSO_AUTH_TOKEN</span>
                            <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-2.5 flex justify-between items-center border border-slate-800">
                              <span className="truncate max-w-sm">TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODE0MjAxMDIsImlkIjoiMDE5ZWJhNjYtMzUwMS03MWU5LTg5OTUtNTc2YmFiYTJmOGI0IiwicmlkIjoiNjNkZDRhZWUtYzQwMi00MGVjLTg2ZmMtOWQwNGYxZTU5ZGEzIn0.oDnwD6LaPZ04etSzkj3eYGEm9o7uSKQ22nJ-QtJzKIbg3KpeouITs7P-Qd-lZ2JkkXlKud3fXuRyFT1Cx1UiAQ</span>
                              <button 
                                onClick={() => handleCopyText('TURSO_AUTH_TOKEN=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODE0MjAxMDIsImlkIjoiMDE5ZWJhNjYtMzUwMS03MWU5LTg5OTUtNTc2YmFiYTJmOGI0IiwicmlkIjoiNjNkZDRhZWUtYzQwMi00MGVjLTg2ZmMtOWQwNGYxZTU5ZGEzIn0.oDnwD6LaPZ04etSzkj3eYGEm9o7uSKQ22nJ-QtJzKIbg3KpeouITs7P-Qd-lZ2JkkXlKud3fXuRyFT1Cx1UiAQ', 'tokenvar')}
                                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] bg-slate-800 px-2 py-0.5 rounded-md"
                              >
                                {copiedText === 'tokenvar' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>

                          {/* Var 4 */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">GROQ_API_KEY</span>
                            <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-2.5 flex justify-between items-center border border-slate-800">
                              <span className="truncate max-w-sm">GROQ_API_KEY=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</span>
                              <button 
                                onClick={() => handleCopyText('GROQ_API_KEY=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', 'groqvar')}
                                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] bg-slate-800 px-2 py-0.5 rounded-md"
                              >
                                {copiedText === 'groqvar' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>

                          {/* Var 5 */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">PRODUCT_GROQ_API_KEY</span>
                            <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-2.5 flex justify-between items-center border border-slate-800">
                              <span className="truncate max-w-sm">PRODUCT_GROQ_API_KEY=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</span>
                              <button 
                                onClick={() => handleCopyText('PRODUCT_GROQ_API_KEY=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', 'groqproductvar')}
                                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] bg-slate-800 px-2 py-0.5 rounded-md"
                              >
                                {copiedText === 'groqproductvar' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Deploy & Map Custom Domain with Auto-SSL</h4>
                        </div>
                        <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                          "Domains" and redirects config page me custom domains mapping insert karein:
                          <ul className="list-disc pl-5 mt-1.5 space-y-1">
                            <li><strong>Custom Domain:</strong> Set mapping to <code className="bg-slate-100 border px-1 rounded font-mono font-bold text-blue-700">{cfDomain}</code> (Make sure Cloudflare DNS side is pointed to OCI VM server IP 79.72.94.8 with proxy turned on/off).</li>
                            <li><strong>Automatic SSL Provision:</strong> Easypanel has Traefik pre-installed, so it will <strong>automatically register and renew a Let's Encrypt SSL certificate for you</strong>. Ssl setup complete within seconds!</li>
                          </ul>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Subtab 1: PM2 manager */}
                  {activeDeploySubtab === 'pm2' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                      <div className="border-b pb-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            <Terminal className="text-blue-600 w-5 h-5" />
                            PM2 Cleaner & Manager (Faltu Processes ko Band Karna)
                          </h3>
                          <p className="text-xs text-slate-500 mt-1">
                            Aapki free tier VM me limited resources (1GB RAM) hain. Purane or faltu duplicate processes ko band rakhna zaroori hai.
                          </p>
                        </div>
                        <span className="bg-amber-100 text-amber-700 border border-amber-200 text-[10px] font-bold px-3 py-1 rounded-full">
                          Memory optimization
                        </span>
                      </div>

                      {/* Commands blocks stack */}
                      <div className="space-y-6">
                        {/* Step 1 */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Active Processes dekehin (View Active list)</h4>
                          </div>
                          <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                            Pehle ye command chalayein taake aapko pata chale kaun si scripts background me active chal rahi hain:
                          </p>
                          <div className="pl-7">
                            <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-3 flex justify-between items-center border border-slate-800 shadow-sm">
                              <span>pm2 list</span>
                              <button 
                                onClick={() => handleCopyText('pm2 list', 'list')}
                                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md"
                              >
                                <Copy className="w-3.5 h-3.5" /> {copiedText === 'list' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Faltu programs ya scripts ko band karein (Stop unwanted apps)</h4>
                          </div>
                          <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                            Agar list me koi aesi script hai jiski zaroorat nahi (for example script ID 1 ya 2), use temporary band karne ya system se hatane ke liye:
                          </p>
                          <div className="pl-7 space-y-3">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-3 flex justify-between items-center border border-slate-800 shadow-sm">
                                <div>
                                  <span className="text-slate-500 block text-[9px] uppercase font-sans font-bold">Stop specific App (e.g. ID 1)</span>
                                  <span>pm2 stop 1</span>
                                </div>
                                <button 
                                  onClick={() => handleCopyText('pm2 stop 1', 'stop1')}
                                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md"
                                >
                                  <Copy className="w-3.5 h-3.5" /> {copiedText === 'stop1' ? 'Copied!' : 'Copy'}
                                </button>
                              </div>

                              <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-3 flex justify-between items-center border border-slate-800 shadow-sm">
                                <div>
                                  <span className="text-slate-500 block text-[9px] uppercase font-sans font-bold">Completely remove App from PM2 list</span>
                                  <span>pm2 delete 1</span>
                                </div>
                                <button 
                                  onClick={() => handleCopyText('pm2 delete 1', 'delete1')}
                                  className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md"
                                >
                                  <Copy className="w-3.5 h-3.5" /> {copiedText === 'delete1' ? 'Copied!' : 'Copy'}
                                </button>
                              </div>
                            </div>

                            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3.5 rounded-xl rounded-t-none">
                              <strong>Dhyaan Dein:</strong> Agar aapko lagta hai bohot sari duplicate apps chal rahi hain to aap <code className="font-mono bg-white border px-1 rounded font-bold text-rose-700">pm2 delete all</code> run kar sakte hain, aur uske baad apni main shopping app start karein.
                            </div>
                          </div>
                        </div>

                        {/* Step 3 */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">Main UKstander Shop Process ko start ya restart karein</h4>
                          </div>
                          <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                            Memory optimal limit ke sath hamare shop application ko PM2 me run karne ki ultimate command:
                          </p>
                          <div className="pl-7">
                            <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-3 flex justify-between items-center border border-slate-800 shadow-sm">
                              <span>pm2 start dist/server.cjs --name "ukstander-shop" --max-memory-restart 700M</span>
                              <button 
                                onClick={() => handleCopyText('pm2 start dist/server.cjs --name "ukstander-shop" --max-memory-restart 700M', 'startshop')}
                                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md"
                              >
                                <Copy className="w-3.5 h-3.5" /> {copiedText === 'startshop' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Step 4 */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-700 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-tight">PM2 Setup list ko permanent save karein (Freeze list)</h4>
                          </div>
                          <p className="text-xs text-slate-600 pl-7 leading-relaxed">
                            Server reboot hone par automatic app restart ho, iske liye ye command lazmi hai:
                          </p>
                          <div className="pl-7">
                            <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-3 flex justify-between items-center border border-slate-800 shadow-sm">
                              <span>pm2 save</span>
                              <button 
                                onClick={() => handleCopyText('pm2 save', 'savepm2')}
                                className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md"
                              >
                                <Copy className="w-3.5 h-3.5" /> {copiedText === 'savepm2' ? 'Copied!' : 'Copy'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Subtab 2: GitHub Auto-Deploy Setup */}
                  {activeDeploySubtab === 'autodeploy' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                      <div className="border-b pb-4">
                        <h3 className="font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                          <RefreshCw className="text-blue-600 w-5 h-5" />
                          GitHub Automatic Deployment Center (Vercel Style)
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Hamne server par <code className="font-mono bg-slate-100 border px-1 rounded text-blue-700 font-bold">/home/ubuntu/auto-deploy.sh</code> banaya hai. Ye script GitHub par naya code aate hi automatically code updates pull karke build start karega.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">How to Test the Auto-Deploy Process Manually</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          Aap terminal me ye command de kar check sakte hain k automatic update deployment sahi kaam kar rahi hai ya nahi. Is se logs report test ho jayegi:
                        </p>
                        
                        <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-3.5 flex justify-between items-center border border-slate-800 shadow-sm select-all">
                          <span>/bin/bash /home/ubuntu/auto-deploy.sh</span>
                          <button 
                            onClick={() => handleCopyText('/bin/bash /home/ubuntu/auto-deploy.sh', 'runtest')}
                            className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md"
                          >
                            <Copy className="w-3.5 h-3.5" /> {copiedText === 'runtest' ? 'Copied!' : 'Copy'}
                          </button>
                        </div>

                        <div className="border-t pt-4 space-y-3">
                          <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Deployment Logs report dekhna</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Her 1 hour/1 minute baad automatic deployment ka kya status raha, uspe errors aayi ya updates hue, use check karne ki command:
                          </p>
                          <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-3.5 flex justify-between items-center border border-slate-800 shadow-sm">
                            <span>cat /home/ubuntu/deploy.log</span>
                            <button 
                              onClick={() => handleCopyText('cat /home/ubuntu/deploy.log', 'catlog')}
                              className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md"
                            >
                              <Copy className="w-3.5 h-3.5" /> {copiedText === 'catlog' ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 text-blue-800 text-xs p-4 rounded-xl leading-relaxed">
                          <strong>Note on Crontab Setup:</strong> Agar system automatially execute na ho raha ho, to verify karein `crontab -e` me ye line likhi hui hai:<br />
                          <code className="block bg-white p-1.5 mt-2 border rounded font-mono text-slate-700 font-bold">
                            * * * * * /bin/bash /home/ubuntu/auto-deploy.sh &gt;&gt; /home/ubuntu/cron-deploy.log 2&gt;&amp;1
                          </code>
                          Ye line automatic her minute GitHub code checks dynamic banati hai (Jaise Vercel me hota hai).
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Subtab 3: DNS & Cloudflare Tunnel */}
                  {activeDeploySubtab === 'domain' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                      <div className="border-b pb-4">
                        <h3 className="font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                          <Globe className="text-blue-600 w-5 h-5" />
                          DNS, Free Domains aur Advanced Cloudflare Setup
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Domain setup ko standard Nginx proxy or SSL ke complex steps ke bagair, extra security ke sath set up karne ke options.
                        </p>
                      </div>

                      <div className="space-y-6">
                        {/* Option 1 */}
                        <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl relative space-y-3">
                          <span className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-[9px] uppercase font-extrabold px-2.5 py-1 rounded-md">
                            Option A: DuckDNS Manual Updater
                          </span>
                          <h4 className="text-xs font-bold text-slate-800 tracking-wide uppercase">DuckDNS Dynamic Connection Test</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Agar aapka DuckDNS automatic connect nahi ho raha hai, to server par directly ye command chala kar use current server IP (<span className="font-bold text-slate-900">{deployIp}</span>) par register karein:
                          </p>
                          <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-3 flex justify-between items-center border border-slate-800 show-all">
                            <span className="truncate max-w-lg">curl -s "https://www.duckdns.org/update?domains={deployDomain.replace('.duckdns.org','')}&token={duckDnsToken}&ip={deployIp}"</span>
                            <button 
                              onClick={() => handleCopyText(`curl -s "https://www.duckdns.org/update?domains=${deployDomain.replace('.duckdns.org','')}&token=${duckDnsToken}&ip=${deployIp}"`, 'duckcurl')}
                              className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold flex items-center gap-1 bg-slate-800 px-2 py-1 rounded-md shrink-0 ml-2"
                            >
                              <Copy className="w-3.5 h-3.5" /> {copiedText === 'duckcurl' ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </div>

                        {/* Option 2 */}
                        <div className="bg-blue-50/50 border border-blue-200 p-5 rounded-2xl relative space-y-3">
                          <span className="absolute top-4 right-4 bg-emerald-600 text-white text-[9px] uppercase font-extrabold px-2.5 py-1 rounded-md animate-pulse">
                            RECOMENDED (EASY & SAFE)
                          </span>
                          <h4 className="text-xs font-bold text-blue-900 tracking-wide uppercase flex items-center gap-1">
                            <Sparkles className="w-4 h-4 text-emerald-500 animate-spin" />
                            Option B: Cloudflare Tunnels (Zero Setup Reverse Proxy)
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Ye tarika <strong>FULL EASY</strong> hai kyun ke isme dynamic DNS, Nginx rules, aur SSL certificate (Certbot) configurations ki <strong>Bilkul zaroorat nahi parti</strong>. System automatic bypass karleta hai. Iske steps:
                          </p>

                          <div className="space-y-3 pl-3">
                            <div className="space-y-1">
                              <span className="text-[10px] uppercase font-extrabold text-slate-450 block">Step 1: Install Cloudflare Agent on VM</span>
                              <div className="bg-slate-900 text-slate-100 font-mono text-[11px] rounded-xl p-2.5 flex justify-between items-center border border-slate-800">
                                <span className="truncate max-w-lg">curl -L -o cf.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && sudo dpkg -i cf.deb</span>
                                <button 
                                  onClick={() => handleCopyText('curl -L -o cf.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb && sudo dpkg -i cf.deb', 'cf1')}
                                  className="text-slate-400 hover:text-white transition-colors text-[10px] font-bold bg-slate-800 px-2 py-1 rounded-md"
                                >
                                  Copy
                                </button>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] uppercase font-extrabold text-slate-450 block">Step 2: Login via Browser URL link</span>
                              <p className="text-[10px] text-slate-500">Is command ko run karte hi ek browser url link milega. Use open karke click approve karein:</p>
                              <div className="bg-slate-900 text-slate-100 font-mono text-[11px] rounded-xl p-2.5 flex justify-between items-center border border-slate-800">
                                <span>cloudflared tunnel login</span>
                                <button 
                                  onClick={() => handleCopyText('cloudflared tunnel login', 'cf2')}
                                  className="text-slate-400 hover:text-white transition-colors text-[10px] font-bold bg-slate-800 px-2 py-1 rounded-md"
                                >
                                  Copy
                                </button>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] uppercase font-extrabold text-slate-450 block">Step 3: Create safe internet tunnel</span>
                              <div className="bg-slate-900 text-slate-100 font-mono text-[11px] rounded-xl p-2.5 flex justify-between items-center border border-slate-800">
                                <span>cloudflared tunnel create ukstander-tunnel</span>
                                <button 
                                  onClick={() => handleCopyText('cloudflared tunnel create ukstander-tunnel', 'cf3')}
                                  className="text-slate-400 hover:text-white transition-colors text-[10px] font-bold bg-slate-800 px-2 py-1 rounded-md"
                                >
                                  Copy
                                </button>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] uppercase font-extrabold text-slate-450 block">Step 4: Map your Domain to shop port 3000 local</span>
                              <div className="bg-slate-900 text-slate-100 font-mono text-[11px] rounded-xl p-2.5 flex justify-between items-center border border-slate-800">
                                <span className="truncate max-w-lg">cloudflared tunnel route dns ukstander-tunnel {cfDomain}</span>
                                <button 
                                  onClick={() => handleCopyText(`cloudflared tunnel route dns ukstander-tunnel ${cfDomain}`, 'cf4')}
                                  className="text-slate-400 hover:text-white transition-colors text-[10px] font-bold bg-slate-800 px-2 py-1 rounded-md"
                                >
                                  Copy
                                </button>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <span className="text-[10px] uppercase font-extrabold text-slate-450 block">Step 5: Start proxy server tunnel</span>
                              <div className="bg-slate-900 text-slate-100 font-mono text-[11px] rounded-xl p-2.5 flex justify-between items-center border border-slate-800">
                                <span className="truncate max-w-lg">cloudflared tunnel run --url http://localhost:3000 ukstander-tunnel</span>
                                <button 
                                  onClick={() => handleCopyText(`cloudflared tunnel run --url http://localhost:3000 ukstander-tunnel`, 'cf5')}
                                  className="text-slate-400 hover:text-white transition-colors text-[10px] font-bold bg-slate-800 px-2 py-1 rounded-md"
                                >
                                  Copy
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* Subtab 4: Ports & Firewalls */}
                  {activeDeploySubtab === 'firewall' && (
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                      <div className="border-b pb-4">
                        <h3 className="font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                          <Lock className="text-blue-600 w-5 h-5" />
                          Oracle Cloud VM Ports & Network security rules
                        </h3>
                        <p className="text-xs text-slate-500 mt-1">
                          Agar aap DuckDNS ya simple domain se access kar rahe hain, to Oracle cloud interface aur server firewalls dono par standard ports permission lazmi allow honi chahiye.
                        </p>
                      </div>

                      <div className="space-y-5">
                        <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-xl leading-relaxed text-xs">
                          <strong>Ahsan Oracle Instruction:</strong> Oracle dashboard me subnets security specifications lists me <strong>Ingress Rules</strong> add karein:<br />
                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Source CIDR:</strong> 0.0.0.0/0</li>
                            <li><strong>IP Protocol:</strong> TCP</li>
                            <li><strong>Destination Port Range:</strong> 80, 443, 3000</li>
                          </ul>
                          (Aapne bataya k rules open kar liye hain - ye zabardast hai!)
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-tight text-slate-800">Ubuntu VM local Firewalls verify karein</h4>
                          <p className="text-xs text-slate-600">
                            Server firewall defaults bypass karne ke liye ye commands run karein:
                          </p>

                          <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-3.5 flex justify-between items-center border border-slate-800">
                            <div>
                              <span className="text-slate-500 block text-[9px] uppercase font-sans font-bold">Open local network rules</span>
                              <span>sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw allow 3000/tcp && sudo ufw reload</span>
                            </div>
                            <button 
                              onClick={() => handleCopyText('sudo ufw allow 80/tcp && sudo ufw allow 443/tcp && sudo ufw allow 3000/tcp && sudo ufw reload', 'ufwallow')}
                              className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold bg-slate-800 px-2.5 py-1.5 rounded-md shrink-0 ml-2"
                            >
                              Copy
                            </button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-tight text-slate-800">Direct Port-Forwarding (Port 80 to 3000 Redirect)</h4>
                          <p className="text-xs text-slate-600">
                            Agar aap Bina Nginx proxy set up ke chahte hain k external users simple HTTP IP standard call karein, to incoming Traffic Port 80 directly Port 3000 par map ho jaye, uski fast iptables forward rule command:
                          </p>

                          <div className="bg-slate-900 text-slate-100 font-mono text-xs rounded-xl p-3.5 flex justify-between items-center border border-slate-800">
                            <div>
                              <span>sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000</span>
                            </div>
                            <button 
                              onClick={() => handleCopyText('sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000', 'iptable80')}
                              className="text-slate-400 hover:text-white transition-colors cursor-pointer text-[10px] font-bold bg-slate-800 px-2.5 py-1.5 rounded-md shrink-0 ml-2"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
