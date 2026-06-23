from app.core.config import settings

_supabase_client = None

def get_supabase_client():
    global _supabase_client
    if _supabase_client is not None:
        return _supabase_client

    raw_url = settings.SUPABASE_URL.strip()
    key = settings.SUPABASE_KEY

    if not raw_url or "placeholder" in raw_url.lower():
        raise ValueError("SUPABASE_URL is not configured.")
    if not key or "placeholder" in key.lower():
        raise ValueError("SUPABASE_KEY is not configured.")

    import urllib.parse
    parsed = urllib.parse.urlparse(raw_url)
    if not parsed.scheme or not parsed.netloc:
        raise ValueError(f"SUPABASE_URL '{raw_url}' is not a valid URL.")
    url = f"{parsed.scheme}://{parsed.netloc}"

    from supabase import create_client
    _supabase_client = create_client(url, key)
    return _supabase_client

class SupabaseProxy:
    def __getattr__(self, name):
        if name.startswith("_"):
            raise AttributeError(f"SupabaseProxy has no private or magic attribute '{name}'")
        client = get_supabase_client()
        return getattr(client, name)

supabase = SupabaseProxy()
