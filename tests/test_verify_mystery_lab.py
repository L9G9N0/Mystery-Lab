import unittest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app

class TestMysteryLabIntegration(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_health_check(self):
        res = self.client.get("/health")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json(), {"status": "ok"})

    @patch("app.api.endpoints.supabase")
    def test_complete_contact_enquiry_journey(self, mock_supabase):
        # 1. Submit contact form successfully
        mock_execute = MagicMock()
        mock_execute.execute.return_value = MagicMock(data=[{"id": "test-enquiry-uuid"}])
        mock_supabase.table.return_value.insert.return_value = mock_execute

        payload = {
            "name": "Alex Mercer",
            "email": "alex@iiitd.ac.in",
            "phone": "9999888877",
            "subject": "workshop",
            "message": "Enquiring about the next weekend lab session."
        }
        res = self.client.post("/contact/", json=payload)
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["status"], "ok")
        self.assertEqual(res.json()["id"], "test-enquiry-uuid")

        # Verify mock table called correctly
        mock_supabase.table.assert_any_call("contact_requests")

    @patch("app.api.endpoints.supabase")
    def test_newsletter_subscription(self, mock_supabase):
        # 2. Subscribe to newsletter list
        mock_execute = MagicMock()
        mock_supabase.table.return_value.insert.return_value = mock_execute

        res = self.client.post("/newsletter/", json={"email": "news_explorer@iiitd.ac.in"})
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["status"], "ok")
        mock_supabase.table.assert_any_call("newsletter")

    @patch("app.api.endpoints.supabase")
    def test_authenticated_booking_journey(self, mock_supabase):
        # 3. Create workshop booking (Requires Mocked JWT User session)
        mock_user = MagicMock()
        mock_user.user.id = "user-uuid-123"
        mock_user.user.email = "explorer@iiitd.ac.in"
        
        # Mock auth.get_user to return mock_user
        mock_supabase.auth.get_user.return_value = mock_user
        
        # Mock admin list to return empty (not admin)
        mock_admin_res = MagicMock()
        mock_admin_res.data = []
        
        # Mock bookings insert
        mock_booking_res = MagicMock()
        mock_booking_res.data = [{"id": "booking-uuid-555"}]
        
        def mock_table_routing(table_name):
            mock_chain = MagicMock()
            if table_name == "bookings":
                mock_chain.insert.return_value.execute.return_value = mock_booking_res
                return mock_chain
            elif table_name == "admins":
                mock_chain.select.return_value.eq.return_value.execute.return_value = mock_admin_res
                return mock_chain
            return MagicMock()

        mock_supabase.table.side_effect = mock_table_routing

        booking_payload = {
            "event_title": "Junior Scientist Subscription",
            "student_name": "Eleanor Jr.",
            "student_age": 9,
            "contact_phone": "9876543210",
            "preferred_date": "2026-07-01"
        }

        # Call authenticated endpoint
        res = self.client.post(
            "/booking/",
            json=booking_payload,
            headers={"Authorization": "Bearer fake-jwt-token"}
        )
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["status"], "ok")
        self.assertEqual(res.json()["id"], "booking-uuid-555")

    @patch("app.api.endpoints.supabase")
    def test_admin_dashboard_isolation(self, mock_supabase):
        # 4. Enforce administrative isolation (returns 403 for non-admins)
        mock_user = MagicMock()
        mock_user.user.id = "non-admin-user"
        mock_user.user.email = "explorer@iiitd.ac.in"
        mock_supabase.auth.get_user.return_value = mock_user

        # Mock admin table lookup to return no matches
        mock_admin_res = MagicMock()
        mock_admin_res.data = []
        mock_supabase.table.return_value.select.return_value.eq.return_value.execute.return_value = mock_admin_res

        res = self.client.get(
            "/admin/bookings/",
            headers={"Authorization": "Bearer fake-jwt-token"}
        )
        self.assertEqual(res.status_code, 403)
        self.assertEqual(res.json()["detail"], "Forbidden: Administrative privileges required")

if __name__ == "__main__":
    unittest.main()
