.PHONY: help install test run dev clean build api docs all

# Colors for output
BLUE := \033[0;34m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m

help:
	@echo "$(BLUE)╔═══════════════════════════════════════╗$(NC)"
	@echo "$(BLUE)║    TinyCompiler - Available Commands    ║$(NC)"
	@echo "$(BLUE)╚═══════════════════════════════════════╝$(NC)"
	@echo ""
	@echo "$(YELLOW)Setup & Dependencies:$(NC)"
	@echo "  make install      - Install npm dependencies"
	@echo "  make clean        - Remove node_modules and lock files"
	@echo ""
	@echo "$(YELLOW)Testing & Running:$(NC)"
	@echo "  make test         - Run all tests"
	@echo "  make run          - Run compiler with example"
	@echo "  make dev          - Run in development mode with watch"
	@echo ""
	@echo "$(YELLOW)Building & Deployment:$(NC)"
	@echo "  make build        - Prepare for production"
	@echo "  make api          - Start local API server"
	@echo ""
	@echo "$(YELLOW)Utilities:$(NC)"
	@echo "  make docs         - Generate documentation"
	@echo "  make all          - Install, test, and build"
	@echo "  make help         - Show this help message"
	@echo ""

install:
	@echo "$(GREEN)→ Installing dependencies...$(NC)"
	npm install
	@echo "$(GREEN)✓ Dependencies installed!$(NC)"

test:
	@echo "$(GREEN)→ Running tests...$(NC)"
	node test.js
	@echo "$(GREEN)✓ Tests completed!$(NC)"

run:
	@echo "$(GREEN)→ Running TinyCompiler with example...$(NC)"
	node -e "const { compiler } = require('./TinyCompiler'); console.log(compiler('(add 2 (subtract 4 2))'));"

run-interactive:
	@echo "$(GREEN)→ Interactive Mode:$(NC)"
	@echo "Enter LISP code and press Ctrl+D to exit"
	node -e "const readline = require('readline'); const { compiler } = require('./TinyCompiler'); const rl = readline.createInterface({ input: process.stdin }); rl.on('line', l => console.log(compiler(l))); rl.on('close', () => process.exit());"

dev:
	@echo "$(GREEN)→ Development mode (requires npm install -g nodemon)...$(NC)"
	nodemon -e js -x 'make test'

build:
	@echo "$(GREEN)→ Building for production...$(NC)"
	@echo "$(YELLOW)✓ No build step required - pure JavaScript$(NC)"
	@echo "$(YELLOW)Ready for deployment!$(NC)"

api:
	@echo "$(GREEN)→ Starting API server on http://localhost:3000...$(NC)"
	@echo "$(YELLOW)Visit http://localhost:3000 for the web interface$(NC)"
	node -e "const http = require('http'); const { compiler } = require('./TinyCompiler'); const server = http.createServer((req, res) => { res.setHeader('Content-Type', 'application/json'); res.setHeader('Access-Control-Allow-Origin', '*'); if (req.url.startsWith('/api/compiler?code=')) { const code = decodeURIComponent(req.url.split('code=')[1]); try { res.writeHead(200); res.end(JSON.stringify({output: compiler(code), success: true})); } catch(e) { res.writeHead(500); res.end(JSON.stringify({error: e.message, success: false})); } } else { res.writeHead(200); res.end('TinyCompiler API - use /api/compiler?code=YOUR_CODE'); } }); server.listen(3000);"

docs:
	@echo "$(GREEN)→ Documentation files:$(NC)"
	@echo "  - README.md       $(GREEN)✓$(NC)"
	@echo "  - CONTRIBUTING.md $(GREEN)✓$(NC)"
	@echo "  - LICENSE         $(GREEN)✓$(NC)"

all: install test build
	@echo ""
	@echo "$(GREEN)╔════════════════════════════════════╗$(NC)"
	@echo "$(GREEN)║  ✓ Setup Complete & Tests Passed! ║$(NC)"
	@echo "$(GREEN)╚════════════════════════════════════╝$(NC)"

clean:
	@echo "$(YELLOW)→ Cleaning up...$(NC)"
	@rm -rf node_modules package-lock.json
	@echo "$(GREEN)✓ Clean complete!$(NC)"

.DEFAULT_GOAL := help
