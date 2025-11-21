.PHONY: help install test run clean lint dev

help:
	@echo "TinyCompiler - Makefile Commands"
	@echo "=================================="
	@echo ""
	@echo "Available commands:"
	@echo "  make install    - Install dependencies"
	@echo "  make test       - Run tests"
	@echo "  make run        - Run the compiler with default example"
	@echo "  make dev        - Run in development mode"
	@echo "  make clean      - Clean up generated files"
	@echo "  make help       - Show this help message"
	@echo ""

install:
	@echo "Installing dependencies..."
	npm install

test:
	@echo "Running tests..."
	node test.js

run:
	@echo "Running TinyCompiler with example..."
	node -e "const { compiler } = require('./TinyCompiler'); console.log(compiler('(add 2 (subtract 4 2))'));"

dev:
	@echo "Running in development mode..."
	@echo "Watching for changes and running tests..."
	@watch -p "**/*.js" -c "clear && npm test"

clean:
	@echo "Cleaning up..."
	@rm -rf node_modules package-lock.json
	@echo "Clean complete!"

.DEFAULT_GOAL := help
