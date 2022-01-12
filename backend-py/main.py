# spacy resume analyze
# https://kgptalkie.medium.com/resume-and-cv-summarization-using-machine-learning-in-python-394ea49fba3e
# https://towardsdatascience.com/do-the-keywords-in-your-resume-aptly-represent-what-type-of-data-scientist-you-are-59134105ba0d
# https://deepnote.com/@abid/spaCy-Resume-Analysis-gboeS3-oRf6segt789p4Jg
import os
import textract
from flask import Flask, jsonify, flash, request, redirect, url_for, send_from_directory
from werkzeug.utils import secure_filename

import pickle
import random
import spacy
from spacy.language import Language
from spacy_langdetect import LanguageDetector
from spacy.matcher import Matcher, PhraseMatcher

from PrefixMiddleware import PrefixMiddleware

UPLOAD_FOLDER = './uploads'
ALLOWED_EXTENSIONS = {'txt', 'doc', 'docm', 'docx'}


app = Flask(__name__)
app.debug = True
app.wsgi_app = PrefixMiddleware(app.wsgi_app, prefix='/api')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.add_url_rule(
    "/uploads/<name>", endpoint="download_file", build_only=True
)

@app.route("/")
def hello_world():
    return "<p>Hello, World! </p>"

@app.route("/degrees/")
def degrees():
    return jsonify([
        "Computer Scinece degree",
        "Philosophy degree",
        "Psychology degree",
        "Economics degree",
        "BA degree",
    ])

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/analyze/", methods=['POST'])
def analyze():
    file = request.files['file']
    degree = request.form['degree']
     
    if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            result = analyze_file(filename,degree);
            return jsonify(result)
            # return;#redirect(url_for('download_file', name=filename))
    return '''failed'''
  
def get_lang_detector(nlp, name):
    return LanguageDetector()

def analyze_file(fileName,degree):
    text = textract.process(os.path.join(app.config['UPLOAD_FOLDER'], fileName))
    textStr = text.decode("utf-8").lower()
    nlp = spacy.load("en_core_web_sm")
    Language.factory("language_detector", func=get_lang_detector)
    nlp.add_pipe('language_detector', last=True)
    doc = nlp(textStr)
   
    matchesResults = analyzeMatcherPattern(nlp, doc, degree)
    phraseMatches = analyzePhraseMatcherPattern(nlp, doc, degree)

    return {
        "languageDetection": doc._.language,        
        "degreeDetection":{
           "matches":matchesResults,
           "phraseMatches":phraseMatches
        }
    }

def analyzePhraseMatcherPattern(nlp, cvDoc, matcherStr):
    
    matcher = PhraseMatcher(nlp.vocab)
    matcherStr = matcherStr.lower()
    

    patternKey = matcherStr.replace(" ", "")
    # matcher.add(patternKey, [nlp(matcherStr)],on_match=on_match)
    matcher.add(patternKey, [nlp(matcherStr)])
    print("Matchers len: ",len(matcher))
    matches = matcher(cvDoc)
    matchesResult = [cvDoc[start:end] for match_id, start, end in matches]
    print(matchesResult)
    return {
                "matchesResult": str(matchesResult),
                "phrase":matcherStr,
                "patternKey": patternKey    
            }


def on_match(matcher, doc, id, matches):    
    print('Matched!', matches)


def analyzeMatcherPattern(nlp, cvDoc, matcherStr):
    doc = nlp(matcherStr)

    pattern = []
    for token in doc:
        if token.pos_ == "PUNCT":
            continue

        pattern.append({"TEXT": token.text.lower(), "OP": "?"})

  # Initialize the Matcher with the shared vocabulary
    matcher = Matcher(nlp.vocab)
    matcher.add("pattern", [pattern])
    matches = matcher(cvDoc)
    matchesResult = [cvDoc[start:end].text for match_id, start, end in matches]

    return { 
        "pattern":pattern,
        "matches":matchesResult        
    }