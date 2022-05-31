

# 1. Frontend Starter

```
npm install typescript@latest -g
npm install -g @angular/cli
cd .\frontend\
npm i
npm run build
npm start

```
Open your browser and navigate to `http://localhost:4200/`

---
---
---
# 2. Run `backend-py` Rest API 

```
cd .\backend-py\
py -3 -m venv .venv
.venv\Scripts\activate
# pip freeze > requirements.txt
pip install -r requirements.txt
$env:FLASK_APP = "main"
$env:FLASK_ENV = "development"
python -m spacy download en_core_web_sm
flask run

```
http://127.0.0.1:5000/api/
http://127.0.0.1:5000/api/degrees/
http://127.0.0.1:5000/api/analyze/
```


