from flask import Flask, request, jsonify
from flask_cors import CORS
import argparse
import os
import tensorflow as tf
import cv2
from PIL import Image
import numpy as np



app = Flask("BCD")
CORS(app)



try:
    model1 = tf.keras.models.load_model('BrainTumor.h5')
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model1 = None






UPLOAD_FOLDER = 'Uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/upload", methods=["POST"])
def predict():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file:
        filename = file.filename
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        file_path=os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        #PROCESS
        
        
        
        test = cv2.imread(file_path)
        
        ti = Image.fromarray(test)
        
        ti= ti.resize((64,64))
        
        ti = np.array(ti)
        
        
        input_img = np.expand_dims(ti,axis= 0)
        
        prediction = model1.predict(input_img)
        
        
        
        prediction_class = (prediction >= 0.5).astype(int)
        print(prediction_class[0][0])
        
        
        
        
        return jsonify({"message": "File uploaded successfully"}), 200
    
    
    
    
    
    
    return jsonify({"error": "File not allowed"}), 400

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Brain Cancer Detection")
    parser.add_argument("--port", default=5000, type=int, help="Port number")
    args = parser.parse_args()

    app.run(port=args.port)
