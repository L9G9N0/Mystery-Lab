import React, { useState, useEffect } from 'react';
import { useAuth } from '@/store/AuthContext';
import { 
  ArrowLeft, 
  Mail, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface AdminDashboardProps {
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const { session } = useAuth();
  const [activeTab, setActiveTab] = useState('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = session?.access_token;
  const apiUrl = import.meta.env.VITE_API_URL || (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? 'http://localhost:8000' : '/api');

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    setError(null);

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Fetch bookings, enquiries, and newsletter subscribers in parallel
      const [bookingsRes, enquiriesRes, subscribersRes] = await Promise.all([
        fetch(`${apiUrl}/admin/bookings/`, { headers }),
        fetch(`${apiUrl}/admin/enquiries/`, { headers }),
        fetch(`${apiUrl}/admin/newsletter/`, { headers }),
      ]);

      if (!bookingsRes.ok || !enquiriesRes.ok || !subscribersRes.ok) {
        throw new Error('Administrative privilege validation failed or backend is offline.');
      }

      const bookingsData = await bookingsRes.json();
      const enquiriesData = await enquiriesRes.json();
      const subscribersData = await subscribersRes.json();

      setBookings(bookingsData);
      setEnquiries(enquiriesData);
      setSubscribers(subscribersData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while loading dashboard records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed':
      case 'resolved':
        return (
          <span className="flex items-center gap-1 w-fit px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      case 'pending':
        return (
          <span className="flex items-center gap-1 w-fit px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            {status}
          </span>
        );
      case 'cancelled':
        return (
          <span className="flex items-center gap-1 w-fit px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-500/10 text-gray-400 border border-gray-500/20">
            {status || 'Unknown'}
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#060814] text-white pt-24 pb-16 px-6 relative z-10 w-full max-w-full">
      <div className="container mx-auto">
        {/* Header Navigation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <button
              onClick={onClose}
              className="flex items-center gap-2 text-neon-blue hover:text-neon-pink transition-colors font-medium mb-3 focus:outline-none"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Lab
            </button>
            <h2 className="text-3xl md:text-4xl font-bold font-outfit bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Lab Management Ledger
            </h2>
            <p className="text-gray-400 mt-1">
              Oversee and verify registered science kits bookings, enquiries, and newsletter cohorts.
            </p>
          </div>
          <button
            onClick={fetchData}
            className="px-4 py-2 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 self-start"
            disabled={loading}
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Refresh Data
          </button>
        </div>

        {error && (
          <div className="p-4 mb-6 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && bookings.length === 0 ? (
          <div className="min-h-[400px] flex flex-col justify-center items-center gap-3">
            <Loader2 className="w-10 h-10 animate-spin text-neon-pink" />
            <p className="text-gray-400">Accessing security servers and synching database records...</p>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl w-full md:w-auto flex flex-col md:flex-row h-auto gap-1">
              <TabsTrigger
                value="bookings"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-pink data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400 py-2.5 px-4 font-medium transition-all"
              >
                <Calendar className="w-4 h-4 mr-2 inline" />
                Workshop Bookings ({bookings.length})
              </TabsTrigger>
              <TabsTrigger
                value="enquiries"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-pink data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400 py-2.5 px-4 font-medium transition-all"
              >
                <Mail className="w-4 h-4 mr-2 inline" />
                Contact Enquiries ({enquiries.length})
              </TabsTrigger>
              <TabsTrigger
                value="newsletter"
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-neon-pink data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-400 py-2.5 px-4 font-medium transition-all"
              >
                <Users className="w-4 h-4 mr-2 inline" />
                Subscribers List ({subscribers.length})
              </TabsTrigger>
            </TabsList>

            {/* Bookings View */}
            <TabsContent value="bookings">
              <Card className="bg-[#0A0D1A]/60 border-white/10 text-white backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="font-outfit text-white">Workshop & Events Rosters</CardTitle>
                  <CardDescription className="text-gray-400">
                    Live schedule of requested events, workshops, and science parties.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {bookings.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      No workshop bookings registered in database.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="border-white/10 hover:bg-transparent">
                          <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-gray-400 font-semibold">Student Profile</TableHead>
                            <TableHead className="text-gray-400 font-semibold">Event Topic</TableHead>
                            <TableHead className="text-gray-400 font-semibold">Scheduled Date</TableHead>
                            <TableHead className="text-gray-400 font-semibold">Contact Phone</TableHead>
                            <TableHead className="text-gray-400 font-semibold">Verification Status</TableHead>
                            <TableHead className="text-gray-400 font-semibold">Submitted On</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bookings.map((booking) => (
                            <TableRow key={booking.id} className="border-white/5 hover:bg-white/5 transition-colors">
                              <TableCell className="font-medium text-white">
                                {booking.student_name}
                                <span className="block text-xs text-gray-400 mt-0.5">Age: {booking.student_age} years</span>
                              </TableCell>
                              <TableCell className="text-white">{booking.event_title}</TableCell>
                              <TableCell className="text-gray-300">
                                {booking.preferred_date ? new Date(booking.preferred_date).toLocaleDateString() : 'TBD'}
                              </TableCell>
                              <TableCell className="text-gray-300">{booking.contact_phone}</TableCell>
                              <TableCell>{getStatusBadge(booking.status)}</TableCell>
                              <TableCell className="text-xs text-gray-400">
                                {new Date(booking.created_at).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Enquiries View */}
            <TabsContent value="enquiries">
              <Card className="bg-[#0A0D1A]/60 border-white/10 text-white backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="font-outfit text-white">Inbound Leads & Enquiries</CardTitle>
                  <CardDescription className="text-gray-400">
                    General, school, and partnership enquiries received through the main contact portal.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {enquiries.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      No contact requests submitted.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="border-white/10 hover:bg-transparent">
                          <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-gray-400 font-semibold">Sender Details</TableHead>
                            <TableHead className="text-gray-400 font-semibold">Subject Cohort</TableHead>
                            <TableHead className="text-gray-400 font-semibold">Message Description</TableHead>
                            <TableHead className="text-gray-400 font-semibold">Status</TableHead>
                            <TableHead className="text-gray-400 font-semibold">Received On</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {enquiries.map((enquiry) => (
                            <TableRow key={enquiry.id} className="border-white/5 hover:bg-white/5 transition-colors">
                              <TableCell className="font-medium text-white max-w-[200px] truncate">
                                {enquiry.name}
                                <span className="block text-xs text-gray-400 mt-0.5 truncate">{enquiry.email}</span>
                                {enquiry.phone && <span className="block text-xs text-gray-400">{enquiry.phone}</span>}
                              </TableCell>
                              <TableCell>
                                <span className="px-2 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-md text-xs font-semibold uppercase">
                                  {enquiry.subject.replace('-', ' ')}
                                </span>
                              </TableCell>
                              <TableCell className="max-w-xs text-gray-300 text-sm whitespace-pre-wrap">
                                {enquiry.message}
                              </TableCell>
                              <TableCell>{getStatusBadge(enquiry.status)}</TableCell>
                              <TableCell className="text-xs text-gray-400">
                                {new Date(enquiry.created_at).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Newsletter View */}
            <TabsContent value="newsletter">
              <Card className="bg-[#0A0D1A]/60 border-white/10 text-white backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="font-outfit text-white">Science Newsletter Cohort</CardTitle>
                  <CardDescription className="text-gray-400">
                    Mail distribution list of users subscribed to receive science activities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {subscribers.length === 0 ? (
                    <div className="py-12 text-center text-gray-500">
                      No active subscribers in newsletter mailing roster.
                    </div>
                  ) : (
                    <div className="max-w-lg mx-auto">
                      <Table>
                        <TableHeader className="border-white/10 hover:bg-transparent">
                          <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-gray-400 font-semibold">Subscriber Email Address</TableHead>
                            <TableHead className="text-gray-400 font-semibold">Joined On</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {subscribers.map((subscriber) => (
                            <TableRow key={subscriber.email} className="border-white/5 hover:bg-white/5 transition-colors">
                              <TableCell className="font-semibold text-white">
                                {subscriber.email}
                              </TableCell>
                              <TableCell className="text-xs text-gray-400">
                                {new Date(subscriber.created_at).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};
