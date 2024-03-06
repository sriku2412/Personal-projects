from flask import Flask, request, render_template, session, redirect, url_for
from transformers import MarianMTModel, MarianTokenizer

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Required to use sessions

# Load tokenizer and model
tokenizer = MarianTokenizer.from_pretrained('Helsinki-NLP/opus-mt-es-en')
model = MarianMTModel.from_pretrained('Helsinki-NLP/opus-mt-es-en')

@app.route('/', methods=['GET', 'POST'])
def index():
    if 'history' not in session:
        session['history'] = []  # Initialize conversation history

    if request.method == 'POST':
        src_text = request.form['text']  # Get text from form
        if src_text:  # Check if the text is not empty
            translated = model.generate(**tokenizer(src_text, return_tensors="pt", padding=True))
            translated_text = [tokenizer.decode(t, skip_special_tokens=True) for t in translated][0]
            
            # Update history
            session['history'].append({'spanish': src_text, 'english': translated_text})
            session.modified = True  # To ensure the session gets saved

    return render_template('index.html', history=session['history'])

if __name__ == '__main__':
    app.run(debug=True)
