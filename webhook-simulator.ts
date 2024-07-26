import axios from 'axios';

const WEBHOOK_URL = 'http://localhost:3000/webhooks/event';
const SOURCES = ['src-1'];

function generateRandomPayload() {
  return {
    id: Math.floor(Math.random() * 1000),
    timestamp: new Date().toISOString(),
    data: {
      key1: Math.random().toString(36).substring(7),
      key2: Math.random().toString(36).substring(7),
    },
  };
}

async function sendWebhook() {
  const source = SOURCES[Math.floor(Math.random() * SOURCES.length)];
  const payload = generateRandomPayload();

  try {
    const response = await axios.post(
      WEBHOOK_URL,
      {
        source,
        payload,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImxhdmlnMTAiLCJpZCI6IjY2YTQxZmM4NDUzMDIwOGIyYTEwOWViNyIsImlhdCI6MTcyMjAzMzUyOSwiZXhwIjoxNzIyMTE5OTI5fQ.fLQ0Wnhwyw3B2gNLlAM749yaiuIingmEpacSUC0HZDQ',
        },
      },
    );
    console.log(`Webhook sent successfully: ${response.status}`);
  } catch (error) {
    console.error(
      'Failed to send webhook:',
      error.response ? error.response.data : error.message,
    );
  }
}

// Send a webhook every 5 seconds
setInterval(sendWebhook, 5000);
