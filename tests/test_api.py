import unittest
from unittest.mock import patch, MagicMock
from fastapi.testclient import TestClient
from app.main import app

class TestMysteryLabAPI(unittest.TestCase):
    def setUp(self):
        self.client = TestClient(app)

    def test_root_endpoint(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"message": "Welcome to the Mystery Lab API Engine"})

    def test_health_endpoint(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"status": "ok"})

    @patch("app.api.endpoints.supabase")
    def test_submit_contact_request(self, mock_supabase):
        # Configure mock response
        mock_execute = MagicMock()
        mock_execute.execute.return_value = MagicMock(data=[{"id": "test-uuid-123"}])
        mock_supabase.table.return_value.insert.return_value = mock_execute

        payload = {
            "name": "Jane Doe",
            "email": "jane@example.com",
            "phone": "9876543210",
            "subject": "workshop",
            "message": "Interested in registering for a weekend science workshop."
        }
        
        response = self.client.post("/contact/", json=payload)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")
        self.assertEqual(response.json()["id"], "test-uuid-123")

    def test_submit_contact_request_invalid_email(self):
        payload = {
            "name": "Jane Doe",
            "email": "invalid-email-format",
            "subject": "general",
            "message": "Hello world"
        }
        response = self.client.post("/contact/", json=payload)
        self.assertEqual(response.status_code, 422) # Unprocessable Entity validation error

    @patch("app.api.endpoints.supabase")
    def test_subscribe_newsletter(self, mock_supabase):
        mock_execute = MagicMock()
        mock_supabase.table.return_value.insert.return_value = mock_execute

        response = self.client.post("/newsletter/", json={"email": "news@example.com"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "ok")

    def test_protected_route_missing_token(self):
        response = self.client.get("/auth/profile/")
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json()["detail"], "Missing Authorization Header")

    def test_protected_route_invalid_token_format(self):
        response = self.client.get("/auth/profile/", headers={"Authorization": "BearerTokenOnly"})
        self.assertEqual(response.status_code, 401)
        self.assertTrue("Invalid Authorization header" in response.json()["detail"])

if __name__ == "__main__":
    unittest.main()
