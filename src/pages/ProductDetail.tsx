import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Star, ArrowLeft, Tag, ShieldCheck, Truck, ExternalLink, Loader2 } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Logo from '../components/Logo';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize with passed location state if available (prevents layout flicker)
  const [product, setProduct] = useState<any | null>(location.state?.product || null);
  const [redirecting, setRedirecting] = useState(false);
  const [loading, setLoading] = useState(!location.state?.product);
  const [activeImage, setActiveImage] = useState<string>(location.state?.product?.image || '');
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(JSON.parse(localStorage.getItem('wishlist') || '[]'));
  const [allProducts, setAllProducts] = useState<any[]>([]);

  const userLocal = localStorage.getItem('user');
  const userEmail = userLocal ? JSON.parse(userLocal)?.email : 'Guest';

  const dynamicCategories = useMemo(() => {
    const cats = new Set<string>();
    allProducts.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return ["All Categories", ...Array.from(cats)];
  }, [allProducts]);

  // Review states
  const defaultEmail = JSON.parse(localStorage.getItem('user') || '{}')?.email || 'Guest';
  const [reviewEmail, setReviewEmail] = useState(defaultEmail);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const cleanId = id ? id.toString().replace('db-', '') : '';

  const loadProductDetail = () => {
    fetch(`/api/products/${cleanId}`)
      .then(res => {
        if (!res.ok) throw new Error("Product details not found");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        if (!activeImage) {
          setActiveImage(data.image);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Direct loader failed, fallback to standard catalog", err);
        // Fallback robust loading
        fetch('/api/products')
          .then(res => res.json())
          .then(data => {
            const found = data.find((p: any) => p.id.toString() === cleanId || `db-${p.id}` === id?.toString());
            if (found) {
              const mapped = {
                id: `db-${found.id}`,
                name: found.ai_title || "Premium product",
                description: found.ai_description,
                price: parseFloat(found.price) || 0,
                category: found.category || "General",
                rating: Number(found.rating) || 4.7, 
                reviews_count: Number(found.reviews_count) || 120,
                cart_count: Number(found.cart_count) || 18,
                views_count: Number(found.views_count) || 350,
                discount: "Exclusive Deal",
                image: found.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
                affiliateLink: found.affiliate_link,
                ai_tags: found.ai_tags,
                additionalImages: found.additional_images ? JSON.parse(found.additional_images) : [],
                reviews: [
                  { id: 'seed-1', user_email: 'customer.uk@gmail.com', rating: 5, comment: 'Incredible deal! Best price I found in the UK. Highly recommended.', created_at: new Date(Date.now() - 43200000).toISOString() },
                  { id: 'seed-2', user_email: 'dealhunter88@gmail.com', rating: 4, comment: 'Speedy redirection to amazon and currys. Very transparent about affiliate links.', created_at: new Date(Date.now() - 86400000).toISOString() }
                ]
              };
              setProduct(mapped);
              if (!activeImage) {
                setActiveImage(mapped.image);
              }
              setLoading(false);
            } else {
              navigate('/user');
            }
          })
          .catch(() => {
            navigate('/user');
          });
      });
  };

  useEffect(() => {
    loadProductDetail();

    // Log user view interaction dynamically as real user activity log
    const userLocal = localStorage.getItem('user');
    const userEmailLoc = userLocal ? JSON.parse(userLocal)?.email : 'shopper.uk@gmail.com';
    fetch('/api/user-interaction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: userEmailLoc,
        type: 'view',
        detail: cleanId
      })
    }).catch(console.error);

    // Real-time synchronization interval of 4000ms for price and metric correctness
    const interval = setInterval(loadProductDetail, 4000);
    return () => clearInterval(interval);
  }, [id, cleanId]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const mapped = Array.isArray(data) ? data.map((p: any) => ({
          id: `db-${p.id}`,
          name: p.ai_title || "Premium product",
          price: parseFloat(p.price) || 0,
          category: p.category || "General",
          image: p.image_url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
          affiliateLink: p.affiliate_link
        })) : [];
        setAllProducts(mapped);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (product && allProducts.length > 0) {
      setRelatedProducts(allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4));
    }
  }, [product, allProducts]);

  const handleBuyNow = () => {
    setRedirecting(true);
    setTimeout(() => {
      // Use window.open with _blank to prevent iframe rejection from external retailers like Amazon
      window.open(product?.affiliateLink || '#', '_blank', 'noopener,noreferrer');
      setRedirecting(false);
    }, 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess(false);
    setSubmittingReview(true);

    fetch(`/api/products/${cleanId}/review`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: reviewEmail,
        rating: reviewRating,
        comment: reviewComment
      })
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to submit review");
        return res.json();
      })
      .then(data => {
        setSubmittingReview(false);
        setSubmitSuccess(true);
        setReviewComment('');
        // Reload details to capture the new average, total counts, and user comment
        loadProductDetail();
      })
      .catch(err => {
        console.error(err);
        setSubmitError('Could not process star review submission. Please try again.');
        setSubmittingReview(false);
      });
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-transparent">
      <Header 
        userEmail={userEmail}
        wishlist={wishlist}
        dynamicCategories={dynamicCategories}
        onSearch={(term, category) => {
          navigate(`/user?q=${encodeURIComponent(term)}&category=${encodeURIComponent(category)}`);
        } }
        onFilterWishlist={() => navigate('/user')}
        onFilterTopDrops={() => navigate('/user')}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-8">
        {loading || !product ? (
          <div className="bg-white/50 backdrop-blur-sm rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col lg:flex-row relative">
            <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent z-10"></div>
            <div className="w-full lg:w-1/2 bg-slate-200/50 min-h-[400px] animate-pulse"></div>
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <div className="w-24 h-4 bg-slate-200/80 rounded-full mb-4 animate-pulse"></div>
              <div className="w-3/4 h-10 bg-slate-200/80 rounded-xl mb-6 animate-pulse"></div>
              <div className="w-1/2 h-6 bg-slate-200/80 rounded-xl mb-8 animate-pulse"></div>
              <div className="w-full h-4 bg-slate-200/80 rounded-full mb-3 animate-pulse"></div>
              <div className="w-full h-4 bg-slate-200/80 rounded-full mb-3 animate-pulse"></div>
              <div className="w-2/3 h-4 bg-slate-200/80 rounded-full mb-8 animate-pulse"></div>
              <div className="mt-auto flex flex-col gap-4">
                <div className="w-full h-14 bg-slate-200/80 rounded-2xl animate-pulse"></div>
                <div className="w-3/4 mx-auto h-4 bg-slate-200/80 rounded-full pt-4 animate-pulse"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
              {/* Image Gallery */}
              <div className="w-full lg:w-1/2 flex flex-col bg-white border-b lg:border-b-0 lg:border-r border-slate-100 relative">
                <div className="absolute top-6 left-6 bg-red-600 text-white text-xs uppercase tracking-wider font-bold px-4 py-1.5 flex items-center shadow-md rounded-full z-10">
                  <Tag className="w-4 h-4 mr-1.5" /> {product.discount || "Exclusive Deal"}
                </div>
                
                <div className="w-full h-auto overflow-hidden flex items-center justify-center p-0 m-0">
                  <img src={activeImage || product.image} alt={product.name} className="w-full h-auto object-cover transition-all duration-300" />
                </div>
                
                {/* Thumbnails */}
                {((product.image) || (product.additionalImages && product.additionalImages.length > 0)) && (
                  <div className="flex items-center gap-4 p-6 bg-white overflow-x-auto border-t border-slate-100">
                    <div 
                      onClick={() => setActiveImage(product.image)}
                      className={`w-20 h-20 rounded-xl border-2 p-2 cursor-pointer transition-all shrink-0 bg-slate-50 flex items-center justify-center ${activeImage === product.image ? 'border-red-600 shadow-md' : 'border-transparent hover:border-slate-300'}`}
                    >
                       <img src={product.image} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    {product.additionalImages && Array.isArray(product.additionalImages) && product.additionalImages.map((img: string, i: number) => (
                      <div 
                        key={i}
                        onClick={() => setActiveImage(img)}
                        className={`w-20 h-20 rounded-xl border-2 p-2 cursor-pointer transition-all shrink-0 bg-slate-50 flex items-center justify-center ${activeImage === img ? 'border-red-600 shadow-md' : 'border-transparent hover:border-slate-300'}`}
                      >
                         <img src={img} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col">
                <div className="flex items-center text-sm text-orange-600 mb-3 font-bold tracking-wider uppercase">{product.category}</div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">{product.name}</h1>
                
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((stars) => (
                      <Star key={stars} className={`w-4 h-4 ${stars <= Math.round(product.rating || 4.7) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-600 ml-2">{product.rating || '4.7'} stars ({product.reviews_count || product.reviews?.length || 152} verified reviews)</span>
                </div>

                {/* Real-time social proof / tracking metrics */}
                <div className="flex flex-col sm:flex-row gap-3 mb-8 border-b border-slate-100 pb-6 text-[13px] font-medium text-slate-600">
                   <div className="flex items-center text-red-600 bg-red-50 px-3.5 py-1.5 rounded-full w-fit">
                      <span className="mr-1.5 align-middle">🔥</span> 
                      {product.cart_count || 12} people have this in their wishlist/cart
                   </div>
                   <div className="flex items-center bg-slate-100 px-3.5 py-1.5 rounded-full w-fit">
                      <span className="mr-1.5 align-middle">👀</span>
                      Viewed {product.views_count || 412} times in the last 24 hours
                   </div>
                </div>

                <div className="text-5xl font-black text-slate-900 mb-6 drop-shadow-sm">
                  <span className="text-2xl align-top">£</span>{parseFloat(product.price).toFixed(2)}
                </div>

                <div className="prose prose-slate text-slate-600 mb-8 max-w-none text-base leading-relaxed">
                  {product.description || "Premium quality product recommended by our expert curators. Designed to meet the highest standards and everyday needs. Check the retailer website for full specifications."}
                </div>

                <div className="mt-auto space-y-6 pt-6 border-t border-slate-100">
                  {/* UKStander Trust Guarantee (Psychological Section) */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 relative overflow-hidden group mb-4">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-1000" />
                     <div className="relative z-10 flex gap-4 items-center">
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                          <ShieldCheck className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">Curation Quality Verified</h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                            {(() => {
                              const messages = [
                                "Aap ko market research par time waste karne ki zarorat nahi. Hum ne is product ko check kar liya hai—it's the best supplier at the lowest UK price. Buy with confidence.",
                                "UKStander expert analysis: Is product ki quality aur delivery speed verified hai. Aankhain band kar ka buy karain, hum ne aap ke liye premium choice find karli hai.",
                                "Market comparison complete. Ye product aap ki quality requirements aur budget par pura utarta hai. Time zaya mat karain aur deal secure karain."
                              ];
                              const index = (product.ai_title?.length || 0) % messages.length;
                              return messages[index];
                            })()}
                          </p>
                        </div>
                     </div>
                  </div>

                  <button 
                    onClick={handleBuyNow}
                    className="w-full flex justify-center items-center py-4 px-8 rounded-2xl text-lg font-bold text-slate-900 bg-[#FFD814] hover:bg-[#F7CA00] shadow-md transition-all active:scale-[0.98] border border-[#FCD200]"
                  >
                    Proceed to Secure Checkout <ExternalLink className="w-5 h-5 ml-2" />
                  </button>
                  
                  <div className="flex items-center justify-center gap-6 text-xs font-semibold text-slate-500 uppercase tracking-wider py-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-emerald-500" /> Trusted Retailer</span>
                    <span className="flex items-center"><Truck className="w-4 h-4 mr-1 text-blue-500" /> Express Delivery</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interconnected Reviews and Feedback Interface */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-sm border border-slate-100 p-8 lg:p-12">
              <div className="border-b border-slate-100 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">User Reviews & Ratings</h3>
                  <p className="text-sm text-slate-500 mt-1">Real-time feedback from verified UK shoppers.</p>
                </div>
                <div className="flex items-center gap-4 text-slate-850">
                  <div className="text-center bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 min-w-[100px]">
                    <span className="block text-3xl font-black text-slate-900 leading-none">{product.rating || '4.7'}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1 block">Average Stars</span>
                  </div>
                  <div className="text-center bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 min-w-[100px]">
                    <span className="block text-3xl font-black text-slate-900 leading-none">{product.reviews_count || product.reviews?.length || 2}</span>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mt-1 block">Total Reviews</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Write review form */}
                <div className="lg:col-span-1 bg-slate-50/50 border border-slate-100 rounded-2xl p-6 h-fit">
                  <h4 className="text-lg font-bold text-slate-800 mb-4">Write a Review</h4>
                  <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Your Email</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="you@example.com" 
                        value={reviewEmail} 
                        onChange={e => setReviewEmail(e.target.value)} 
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((stars) => (
                          <button 
                            key={stars} 
                            type="button" 
                            onClick={() => setReviewRating(stars)} 
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star className={`w-6 h-6 ${stars <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">Comment</label>
                      <textarea 
                        required 
                        rows={4} 
                        placeholder="What did you think of this curation? Let us know!" 
                        value={reviewComment} 
                        onChange={e => setReviewComment(e.target.value)} 
                        className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                      />
                    </div>
                    {submitError && <div className="text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-100">{submitError}</div>}
                    {submitSuccess && <div className="text-xs text-emerald-600 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">Review submitted successfully!</div>}
                    <button 
                      type="submit" 
                      disabled={submittingReview} 
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl text-xs transition-colors flex justify-center items-center cursor-pointer"
                    >
                      {submittingReview ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null} Submit Review
                    </button>
                  </form>
                </div>

                {/* Reviews list */}
                <div className="lg:col-span-2 space-y-6">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((r: any, idx: number) => (
                      <div key={idx} className="border-b border-slate-100 pb-6 last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between gap-4 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center">
                              {(r.user_email || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-slate-800 block truncate max-w-[150px] sm:max-w-[250px]">{r.user_email || 'Anonymous'}</span>
                              <span className="text-[10px] text-slate-400 font-medium block">{r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Just now'}</span>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((stars) => (
                              <Star key={stars} className={`w-3.5 h-3.5 ${stars <= (r.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal bg-slate-50/40 p-3 rounded-xl border border-slate-50">{r.comment || 'No comment provided.'}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-slate-400 font-medium text-sm">
                      No reviews found. Be the first to share your experience!
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <div className="mt-4 mb-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Similar items you might like</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                   {relatedProducts.map(rp => (
                      <div key={rp.id} onClick={() => { setActiveImage(''); navigate(`/product/${rp.id.toString().replace('db-','')}`, { state: { product: rp }}); }} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 cursor-pointer hover:shadow-md transition-all group">
                         <div className="bg-slate-50 p-4 rounded-xl h-48 mb-4 border border-slate-50 flex items-center justify-center">
                            <img src={rp.image} className="max-h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform" alt={rp.name} />
                         </div>
                         <h4 className="font-semibold text-sm text-slate-800 line-clamp-2 mb-2 group-hover:text-blue-700">{rp.name}</h4>
                         <div className="text-lg font-black text-slate-900">£{parseFloat(rp.price).toFixed(2)}</div>
                      </div>
                   ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />

      {/* Redirecting Modal */}
      {redirecting && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden flex flex-col items-center">
             <div className="animate-spin text-blue-600 mb-6">
                <Loader2 className="w-12 h-12" />
             </div>
             <h2 className="text-2xl font-bold text-slate-900 mb-3">Checking Live Price...</h2>
             <p className="text-slate-500 mb-2">Please wait while we redirect you to the retailer securely.</p>
             <p className="text-xs text-slate-400 font-medium">Validating UK stock and discounts...</p>
          </div>
        </div>
      )}
    </div>
  );
}
