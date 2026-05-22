import streamlit as st
import pandas as pd
from datetime import datetime, timedelta

# --- PAGE CONFIG ---
st.set_page_config(page_title="Sprinkles Admin", page_icon="🧁", layout="wide")

# --- CUSTOM CSS FOR BRANDING ---
st.markdown("""
    <style>
    .stApp { background-color: #0f0f0f; color: #ffffff; }
    h1 { color: #ff2a85; font-family: cursive; }
    .stMetric { background-color: #1a1a1a; padding: 15px; border-radius: 10px; border: 1px solid #333; }
    </style>
""", unsafe_allow_html=True)

# --- HEADER ---
st.title("Sprinkles Order Management")
st.markdown("Welcome to the Purple Worth Studios Dashboard Prototype.")

# --- MOCK DATA FOR THE PITCH ---
# For tomorrow's pitch, dummy data is safer and faster than hooking up live databases overnight.
# Once approved, you swap this dataframe out with a pd.read_csv(google_sheet_url) or Supabase client.
mock_data = {
    "Order ID": ["#001", "#002", "#003", "#004"],
    "Customer": ["Alice Banda", "Chanda Mwila", "Sarah Jones", "David Tembo"],
    "Phone": ["+260 971 123 456", "+260 962 987 654", "+260 953 555 111", "+260 977 828 035"],
    "Order Details": ["12x Signature Cupcakes", "Custom Red Velvet Cake", "24x Mini Desserts", "6x Chocolate Cupcakes"],
    "Due Date": [(datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d"), 
                 (datetime.now() + timedelta(days=2)).strftime("%Y-%m-%d"),
                 (datetime.now() + timedelta(days=2)).strftime("%Y-%m-%d"),
                 (datetime.now() + timedelta(days=3)).strftime("%Y-%m-%d")],
    "Method": ["Collection", "Delivery", "Collection", "Delivery"],
    "Status": ["New", "Baking", "New", "Pending Payment"]
}

df = pd.DataFrame(mock_data)

# --- DASHBOARD METRICS ---
col1, col2, col3 = st.columns(3)
col1.metric("New Orders Today", "2", "+1 from yesterday")
col2.metric("Orders Baking", "1")
col3.metric("Pending Deliveries", "2")

st.divider()

# --- ORDER TABLE ---
st.subheader("Active Orders")
# Streamlit allows interactive dataframes out of the box
st.dataframe(
    df, 
    use_container_width=True,
    hide_index=True
)

# --- NEXT STEPS FOR PRODUCTION ---
st.sidebar.header("System Architecture")
st.sidebar.info(
    "**Current:** Prototype Mode (Local Data)\n\n"
    "**Production Ready:** Form submissions will be routed through Supabase or Google Sheets, updating this dashboard in real-time."
)