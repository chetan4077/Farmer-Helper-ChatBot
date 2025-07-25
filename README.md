#  Farmer Helper ChatBot

An intelligent chatbot designed to assist farmers with agricultural queries, crop management, and farming best practices. Built with modern web technologies and machine learning capabilities.

## Features

- **Smart Agricultural Assistance**: Get instant answers to farming-related questions
- **Crop Management Guidance**: Receive advice on planting, harvesting, and crop care
- **Weather & Seasonal Tips**: Seasonal farming recommendations and weather-based suggestions
- **Disease & Pest Management**: Identify and treat common crop diseases and pests
- **Modern UI/UX**: Clean, responsive interface built with React and Tailwind CSS
- **Real-time Chat**: Instant responses powered by machine learning

##  Project Structure

```
Farmer-Helper-ChatBot/
├── frontend/                 # React.js frontend application
│   ├── public/              # Static assets
│   ├── src/                 # Source code
│   ├── index.html          # Entry HTML file
│   ├── package.json        # Frontend dependencies
│   ├── tailwind.config.cjs # Tailwind CSS configuration
│   └── vite.config.js      # Vite build configuration
│
└── backend/                 # Python backend with ML model
    ├── static/             # Static files for backend
    ├── chat.py            # Main chatbot logic
    ├── train.py           # Model training script
    ├── intents.json       # Training data and intents
    ├── model.h5           # Trained neural network model
    ├── class.pkl          # Serialized classes
    └── word.pkl           # Serialized vocabulary
```

##  Tech Stack

### Frontend
- **React.js** - Interactive chat interface with component-based architecture
- **Vite** - Lightning-fast development server and optimized production builds
- **Tailwind CSS** - Responsive design with custom agricultural-themed styling
- **Modern ES6+** - Async/await for API calls and modern JavaScript features

### Backend
- **Python** - Core server logic and API endpoints for chat processing
- **TensorFlow/Keras** - Neural network model for intent classification and response generation
- **NLTK** - Text preprocessing, tokenization, and agricultural terminology processing
- **Flask** - RESTful API endpoints for chat requests and model predictions
- **Pickle** - Efficient serialization of trained model weights and vocabulary data

##  Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Python** (v3.8 or higher)
- **pip** (Python package manager)

##  Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/chetan4077/Farmer-Helper-ChatBot.git
cd Farmer-Helper-ChatBot
```

### 2. Backend Setup
```bash
cd backend

# Install Python dependencies
pip install -r requirements.txt

# Train the model (if needed)
python train.py

# Start the backend server
python chat.py
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

##  Usage

1. **Start the Backend**: Run the Python server to handle chatbot requests
2. **Launch Frontend**: Open the React application in your browser
3. **Start Chatting**: Ask farming-related questions and get instant AI-powered responses

### Example Queries
- "What's the best time to plant tomatoes?"
- "How do I treat leaf blight in wheat?"
- "What fertilizer should I use for corn?"
- "How often should I water my crops?"

##  Machine Learning Model

The chatbot uses a neural network trained on agricultural data:

- **Training Data**: `intents.json` contains categorized farming queries and responses
- **Model Architecture**: Deep learning model saved as `model.h5`
- **Preprocessing**: Tokenization and vectorization using NLTK
- **Classification**: Intent classification for accurate response matching

##  Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  Author

**Chetan4077**
- GitHub: [@chetan4077](https://github.com/chetan4077)

##  Acknowledgments

- Thanks to the farming community for inspiring this project
- Agricultural experts who provided domain knowledge
- Open-source libraries that made this possible

---

*Happy Farming! 🌱*
