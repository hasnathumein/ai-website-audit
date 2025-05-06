import os
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

API_KEY = os.getenv("GOOGLE_PSI_API_KEY")

def sanitize_url(url: str) -> str:
    if not url.startswith("http://") and not url.startswith("https://"):
        return "https://" + url
    return url

@app.route("/api/audit", methods=["POST"])
def audit_website():
    data = request.get_json()
    raw_url = data.get("url")
    strategy = data.get("strategy", "mobile")

    if not raw_url:
        return jsonify({"error": "Missing website URL"}), 400

    website_url = sanitize_url(raw_url)

    try:
        api_url = (
            f"https://www.googleapis.com/pagespeedonline/v5/runPagespeed"
            f"?url={website_url}"
            f"&strategy={strategy}"
            f"&category=performance"
            f"&category=accessibility"
            f"&category=best-practices"
            f"&category=seo"
            f"&key={API_KEY}"
        )
        response = requests.get(api_url)
        result = response.json()

        if "error" in result:
            return jsonify({"error": result["error"]["message"]}), 400

        categories = result.get("lighthouseResult", {}).get("categories", {})

        scores = {
            "performance": round(categories.get("performance", {}).get("score", 0) * 100),
            "seo": round(categories.get("seo", {}).get("score", 0) * 100),
            "accessibility": round(categories.get("accessibility", {}).get("score", 0) * 100),
            "bestPractices": round(categories.get("best-practices", {}).get("score", 0) * 100),
        }

        return jsonify({"scores": scores})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
