import React, { useState, useEffect } from 'react';
import { ShoppingCart, Users, Building, Heart, Loader2 } from 'lucide-react';
import { useAuth } from '@/store/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AuthModal } from './AuthModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

export const ScienceKits: React.FC = () => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [selectedKit, setSelectedKit] = useState<any | null>(null);
  
  // Kit order form state
  const [orderForm, setOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submittingOrder, setSubmittingOrder] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  const kits = [
    {
      id: 'starter',
      name: 'Starter Kit',
      price: 99,
      icon: ShoppingCart,
      image: 'https://images.pexels.com/photos/8471903/pexels-photo-8471903.jpeg?auto=compress&cs=tinysrgb&w=400',
      contents: [
        'Basic chemistry set',
        'Microscope (100x)',
        'Experiment guide (15 activities)',
        'Safety equipment',
        'Digital access code',
      ],
      ageRecommendation: '5-8 years',
      gradient: 'gradient-blue',
    },
    {
      id: 'family',
      name: 'Family Lab',
      price: 199,
      icon: Users,
      image: 'https://images.pexels.com/photos/8471916/pexels-photo-8471916.jpeg?auto=compress&cs=tinysrgb&w=400',
      contents: [
        'Advanced chemistry & physics set',
        'Digital microscope (400x)',
        'Comprehensive guide (35 activities)',
        'Lab equipment & tools',
        'Family project challenges',
        'Online community access',
      ],
      ageRecommendation: '6-12 years',
      gradient: 'gradient-purple',
    },
    {
      id: 'classroom',
      name: 'Classroom Bundle',
      price: 499,
      icon: Building,
      image: 'https://images.pexels.com/photos/8471908/pexels-photo-8471908.jpeg?auto=compress&cs=tinysrgb&w=400',
      contents: [
        'Complete lab setup (30 students)',
        'Professional equipment',
        'Curriculum-aligned activities (50+)',
        'Teacher training materials',
        'Assessment tools',
        'Ongoing curriculum support',
      ],
      ageRecommendation: 'Grades K-6',
      gradient: 'gradient-pink',
    },
  ];

  // Fetch bookmarks when logged in
  const fetchBookmarks = async () => {
    if (!session?.access_token) return;
    try {
      const res = await fetch(`${apiUrl}/bookmarks/`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        const kitIds = data.map((b: any) => b.kit_id).filter(Boolean);
        setBookmarks(kitIds);
      }
    } catch (err) {
      console.error('Failed to load user bookmarks:', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchBookmarks();
    } else {
      setBookmarks([]);
    }
  }, [user, session]);

  const handleBookmarkToggle = async (kitId: string, kitName: string) => {
    if (!user) {
      setIsAuthOpen(true);
      return;
    }

    const isBookmarked = bookmarks.includes(kitId);
    const method = isBookmarked ? 'DELETE' : 'POST';
    const endpoint = `${apiUrl}/bookmarks/?kit_id=${kitId}`;

    try {
      const res = await fetch(endpoint, {
        method,
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (!res.ok) throw new Error('Bookmark toggle failed');

      if (isBookmarked) {
        setBookmarks(bookmarks.filter((id) => id !== kitId));
        toast({
          title: 'Removed from Favorites',
          description: `"${kitName}" has been removed from your bookmarks.`,
        });
      } else {
        setBookmarks([...bookmarks, kitId]);
        toast({
          title: 'Added to Favorites',
          description: `"${kitName}" has been added to your bookmarks.`,
        });
      }
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to update bookmarks. Please try again.',
      });
    }
  };

  const openOrderDialog = (kit: any) => {
    setSelectedKit(kit);
    setOrderForm({
      name: user?.user_metadata?.name || '',
      email: user?.email || '',
      phone: '',
      message: `I would like to purchase the "${kit.name}" science kit ($${kit.price}). Please contact me with payment details.`,
    });
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedKit) return;
    setSubmittingOrder(true);

    try {
      const res = await fetch(`${apiUrl}/contact/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: orderForm.name,
          email: orderForm.email,
          phone: orderForm.phone || null,
          subject: 'kit-purchase',
          message: orderForm.message,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detail || 'Order request failed.');
      }

      toast({
        title: 'Order Request Received!',
        description: `We have received your request for the "${selectedKit.name}". A lab manager will email you shortly.`,
      });
      setSelectedKit(null);
    } catch (err: any) {
      toast({
        variant: 'destructive',
        title: 'Order Error',
        description: err.message || 'Failed to submit order request. Please try again.',
      });
    } finally {
      setSubmittingOrder(false);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-deep-space to-purple-900/20">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold font-outfit mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cosmic-blue to-electric-purple">
            Science Kit Showcase
          </h2>
          <p className="text-xl text-stardust-white/80 max-w-3xl mx-auto">
            Complete science kits designed for different learning environments and group sizes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {kits.map((kit) => {
            const IconComponent = kit.icon;
            const isBookmarked = bookmarks.includes(kit.id);
            
            return (
              <div
                key={kit.id}
                className="glass-effect rounded-3xl overflow-hidden hover-lift group relative"
                role="article"
                aria-labelledby={`kit-${kit.id}-title`}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={kit.image}
                    alt={`${kit.name} science kit contents`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  
                  {/* Bookmark Button */}
                  <button
                    onClick={() => handleBookmarkToggle(kit.id, kit.name)}
                    className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white backdrop-blur-sm transition-colors focus:outline-none"
                    aria-label={isBookmarked ? `Remove ${kit.name} from bookmarks` : `Bookmark ${kit.name}`}
                  >
                    <Heart className={`w-5 h-5 transition-transform duration-200 hover:scale-110 ${isBookmarked ? 'fill-neon-pink text-neon-pink' : 'text-white'}`} />
                  </button>

                  {/* Icon Badge */}
                  <div className={`absolute top-4 right-4 w-12 h-12 ${kit.gradient} rounded-xl flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 id={`kit-${kit.id}-title`} className="text-2xl font-bold font-outfit mb-2 text-stardust-white">
                    {kit.name}
                  </h3>
                  
                  {/* Age Recommendation */}
                  <div className="bg-neon-pink/20 rounded-lg p-2 mb-4 inline-block">
                    <span className="text-neon-pink font-semibold text-sm">{kit.ageRecommendation}</span>
                  </div>

                  {/* Contents */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-stardust-white mb-3">What's Included:</h4>
                    <ul className="space-y-2">
                      {kit.contents.map((item, index) => (
                        <li key={index} className="flex items-start gap-3 text-stardust-white/80">
                          <div className="w-2 h-2 bg-electric-purple rounded-full flex-shrink-0 mt-2"></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-neon-pink">${kit.price}</span>
                    <button
                      onClick={() => openOrderDialog(kit)}
                      className="btn-primary group/btn flex items-center gap-2"
                      aria-label={`Order ${kit.name} kit`}
                    >
                      Order Kit
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 p-8 glass-effect rounded-2xl">
          <h3 className="text-2xl font-bold font-outfit mb-4 text-stardust-white">
            Free Shipping & Setup Support
          </h3>
          <p className="text-stardust-white/70 max-w-2xl mx-auto">
            All kits include free shipping nationwide and complimentary setup assistance via video call. 
            Need help choosing the right kit? Our science education specialists are here to help!
          </p>
        </div>
      </div>

      {/* Kit Order Dialog */}
      <Dialog open={selectedKit !== null} onOpenChange={(open) => !open && setSelectedKit(null)}>
        <DialogContent className="sm:max-w-[450px] bg-[#0A0D1A]/95 border-white/10 text-white backdrop-blur-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold font-outfit text-white">
              Request Science Kit Purchase
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Submit your enquiry to purchase the {selectedKit?.name} (${selectedKit?.price}). We will email you payment instructions.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleOrderSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="order-name" className="text-sm font-medium text-gray-300">
                Your Full Name *
              </label>
              <input
                id="order-name"
                type="text"
                required
                value={orderForm.name}
                onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-neon-pink focus:ring-1 focus:ring-neon-pink focus:outline-none text-white text-base"
                placeholder="Eleanor Vance"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="order-email" className="text-sm font-medium text-gray-300">
                Email Address *
              </label>
              <input
                id="order-email"
                type="email"
                required
                value={orderForm.email}
                onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-neon-pink focus:ring-1 focus:ring-neon-pink focus:outline-none text-white text-base"
                placeholder="explorer@mysterylab.org"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="order-phone" className="text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <input
                id="order-phone"
                type="tel"
                value={orderForm.phone}
                onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-neon-pink focus:ring-1 focus:ring-neon-pink focus:outline-none text-white text-base"
                placeholder="(555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="order-message" className="text-sm font-medium text-gray-300">
                Inquiry Message *
              </label>
              <textarea
                id="order-message"
                required
                rows={3}
                value={orderForm.message}
                onChange={(e) => setOrderForm({ ...orderForm, message: e.target.value })}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-neon-pink focus:ring-1 focus:ring-neon-pink focus:outline-none text-white text-base resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submittingOrder}
              className="w-full btn-primary flex justify-center items-center py-3 bg-gradient-to-r from-neon-pink to-purple-600 rounded-xl text-white font-medium hover:opacity-90 transition-opacity"
            >
              {submittingOrder && <Loader2 className="w-5 h-5 animate-spin mr-2" />}
              Submit Purchase Request
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />
    </section>
  );
};

export default ScienceKits;