# AISentimentAnalysis
Here is a detailed documentation template for your FastAPI project, including API usage, setup instructions, and example requests/responses.

---

# **FastAPI Sentiment Analysis API**

## **Overview**
The Sentiment Analysis API allows users to upload CSV files containing text data. The API analyzes the sentiment of the text (positive, negative, or neutral) using a pre-trained sentiment analysis model (VADER) and returns the results.

---

## **Features**
- Analyze text sentiment (positive, negative, or neutral).
- Secure API endpoints with token-based authentication.
- Supports CSV file uploads.
- Provides detailed sentiment analysis results in JSON format.

---

## **Setup Instructions**

### **1. Clone the Repository**
Clone the project repository to your local machine:
```bash
git clone https://github.com/your-repository-url.git
cd your-repository-directory
```

### **2. Create a Virtual Environment**
Set up a Python virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### **3. Install Dependencies**
Install the required Python libraries:
```bash
pip install -r requirements.txt
```

### **4. Start the FastAPI Server**
Run the server using `uvicorn`:
```bash
uvicorn main:app --reload
```

### **5. Access the API**
Open your browser or an API client (e.g., Postman) and navigate to:
- Swagger Documentation: `http://127.0.0.1:8000/docs`
- ReDoc Documentation: `http://127.0.0.1:8000/redoc`

---

## **Authentication**
The API uses token-based authentication. Include the token in the `Authorization` header of your requests:
```text
Authorization: Bearer my_secure_token
```
Replace `my_secure_token` with the actual token.

---

## **API Endpoints**

### **1. GET /status**
Health check endpoint to verify the API is running.

#### **Example Request**
```bash
curl -X GET "http://127.0.0.1:8000/status"
```

#### **Response**
```json
{
  "status": "API is running"
}
```

---

### **2. POST /analyze**
Uploads a CSV file and performs sentiment analysis on the text data.

#### **Request Format**
- **Method**: `POST`
- **Headers**:
  - `Authorization: Bearer my_secure_token`
  - `Content-Type: multipart/form-data`
- **Body**:
  - Upload a CSV file with the following columns:
    - `id` (required): Unique identifier for each row.
    - `text` (required): Text data for sentiment analysis.

#### **Example Request**
Using `curl`:
```bash
curl -X POST "http://127.0.0.1:8000/analyze" \
-H "Authorization: Bearer my_secure_token" \
-F "file=@sample.csv"
```

Using Postman:
1. Set method to `POST`.
2. URL: `http://127.0.0.1:8000/analyze`.
3. Add `Authorization` header with value `Bearer my_secure_token`.
4. In the **Body** tab, use `form-data` and upload the CSV file under the key `file`.

#### **Request Example CSV File**
```csv
id,text
1,"I love this product! It's amazing."
2,"This is the worst experience I've ever had."
3,"It's okay, but not great."
```

#### **Response**
```json
{
  "results": [
    {
      "id": 1,
      "text": "I love this product! It's amazing.",
      "sentiment": "positive"
    },
    {
      "id": 2,
      "text": "This is the worst experience I've ever had.",
      "sentiment": "negative"
    },
    {
      "id": 3,
      "text": "It's okay, but not great.",
      "sentiment": "neutral"
    }
  ]
}
```

---

## **Error Responses**

### **1. Unauthorized (401)**
Occurs when the token is missing or invalid.

#### **Response**
```json
{
  "detail": "Invalid token"
}
```

### **2. Bad Request (400)**
Occurs when the uploaded file is missing the `text` column.

#### **Response**
```json
{
  "detail": "CSV must contain a 'text' column."
}
```

### **3. Unprocessable Entity (422)**
Occurs when the request is improperly formatted.

#### **Response**
```json
{
  "detail": [
    {
      "loc": ["body", "file"],
      "msg": "field required",
      "type": "missing"
    }
  ]
}
```

---

## **Deployment**
### **Local Deployment**
Run the following command to start the server locally:
```bash
uvicorn main:app --reload
```
Access the API at `http://127.0.0.1:8000`.

### **Cloud Deployment**
Deploy the app on platforms like **Render**, **Heroku**, or **AWS**. Ensure the deployment URL is updated in the React frontend configuration.

---

## **Contact**
For questions or support, contact the API developer at [samarthifyy@gmail.com](mailto:samarthifyy@gmail.com).

---