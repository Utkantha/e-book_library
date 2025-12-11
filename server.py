from pathlib import Path
from flask import Flask, send_from_directory, jsonify, render_template_string
import json

BASE_DIR = Path(__file__).parent.resolve()
BOOKS_PATH = BASE_DIR / "books.json"
BOOKS_DIR = BASE_DIR / "books"

app = Flask(__name__, static_folder=str(BASE_DIR), static_url_path="")

INDEX_HTML = (BASE_DIR / "index.html").read_text(encoding="utf-8")


def load_books():
    if not BOOKS_PATH.exists():
        return []
    with BOOKS_PATH.open(encoding="utf-8") as f:
        return json.load(f)


@app.get("/")
def home():
    return render_template_string(INDEX_HTML)


@app.get("/api/books")
def books_api():
    return jsonify(load_books())


@app.get("/books/<path:filename>")
def download_book(filename: str):
    # Serve PDFs from the local books directory.
    return send_from_directory(BOOKS_DIR, filename, as_attachment=False)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)

