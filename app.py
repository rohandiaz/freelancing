from flask import Flask, request, jsonify, render_template
import PyPDF2
import re
import matplotlib.pyplot as plt
import io
import base64
from pyngrok import ngrok

app = Flask(__name__)

def extract_text_from_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = ""
    for page in pdf_reader.pages:
        text += page.extract_text()
    return text

def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s]', '', text)
    return text

def extract_skills(text, skills):
    matched_skills = []
    text = preprocess_text(text)
    for skill in skills:
        skill_lower = skill.lower()
        if re.search(r'\b' + re.escape(skill_lower) + r'\b', text):
            matched_skills.append(skill)
    return matched_skills

def calculate_match_score(matched_skills, total_skills):
    match_percentage = (len(matched_skills) / total_skills) * 100
    return match_percentage

def create_pie_chart(match_percentage):
    labels = ['Matched Skills', 'Remaining Skills']
    sizes = [match_percentage, 100 - match_percentage]
    colors = ['#4CAF50', '#FF7043']
    explode = (0.05, 0)

    plt.figure(figsize=(7, 7))
    plt.pie(sizes, explode=explode, labels=labels, colors=colors, autopct='%1.1f%%', shadow=True, startangle=140)
    plt.axis('equal')
    plt.title('Skill Match Score')

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    return base64.b64encode(buf.read()).decode('utf-8')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    skills = request.form['skills'].split(',')
    skills = [skill.strip() for skill in skills]

    file = request.files['file']

    if file and file.filename.endswith('.pdf'):
        extracted_text = extract_text_from_pdf(file)
        matched_skills = extract_skills(extracted_text, skills)
        missing_skills = list(set(skills) - set(matched_skills))
        match_score = calculate_match_score(matched_skills, len(skills))

        pie_chart_base64 = create_pie_chart(match_score)

        return jsonify({
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "match_score": match_score,
            "pie_chart": pie_chart_base64
        })

    return jsonify({"error": "Invalid file type"}), 400

# Start ngrok tunnel
public_url = ngrok.connect(5000)
print('Public URL:', public_url)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
