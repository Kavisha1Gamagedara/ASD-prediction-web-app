# Start ASD System Script
# Run this from the root ASD directory

# Open 3 terminals
# Terminal 1: Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm run dev"

# Terminal 2: Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; node index.js"

# Terminal 3: AI Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ai_service; python main.py"
