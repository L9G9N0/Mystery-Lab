.PHONY: install run-frontend run-backend test build clean

install:
	npm install
	python3 -m venv venv
	./venv/bin/pip install -r requirements.txt

run-frontend:
	npm run dev

run-backend:
	./venv/bin/uvicorn app.main:app --reload --port 8000

test:
	./venv/bin/python -m unittest discover -s tests

build:
	npm run build

clean:
	rm -rf dist
	rm -rf node_modules
	rm -rf venv
	find . -type d -name "__pycache__" -exec rm -rf {} +
