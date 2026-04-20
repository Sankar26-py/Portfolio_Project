# Sankar K — Django Portfolio

## Project Structure
```
django_portfolio/
├── manage.py
├── requirements.txt
├── README.md
├── portfolio/               ← Django project config
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
└── core/                    ← Portfolio app
    ├── models.py            ← All content models
    ├── admin.py             ← Admin configuration
    ├── views.py             ← Views
    ├── urls.py              ← URLs
    ├── fixtures/
    │   └── initial_data.json  ← Pre-loaded with your data
    ├── templates/core/
    │   └── index.html       ← Your portfolio HTML (Django template)
    └── static/core/
        ├── css/style.css    ← All your CSS
        ├── js/main.js       ← All your JavaScript
        └── images/          ← Place Sankar.jpg here
```

---

## Setup (Local)

### 1. Install dependencies
```bash
pip install -r requirements.txt
```

### 2. Run migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 3. Load your data (pre-filled with your portfolio content)
```bash
python manage.py loaddata core/fixtures/initial_data.json
```

### 4. Create admin user
```bash
python manage.py createsuperuser
# Enter: username, email, password
```

### 5. Collect static files
```bash
python manage.py collectstatic
```

### 6. Place your photo
```
Copy Sankar.jpg → core/static/core/images/Sankar.jpg
```

### 7. Run the server
```bash
python manage.py runserver
```

### 8. Visit
- Portfolio: http://127.0.0.1:8000/
- Admin:     http://127.0.0.1:8000/admin/

---

## Admin Panel — What You Can Edit

Go to http://127.0.0.1:8000/admin/ and login.

| Section | What you can change |
|---|---|
| **Profile** | Name, bio, email, phone, links, photo upload, resume upload, stats |
| **About Highlights** | The → bullet points in About section |
| **Languages** | Language proficiency cards |
| **Certifications** | Certification cards |
| **Skill Categories** | Group names (Languages, Frameworks, etc.) |
| **Skills** | Individual skill tags |
| **Experience** | Each role tab + all bullet points |
| **Projects** | Project cards, links, tags |
| **Education** | Degree cards |
| **Achievements** | Award cards |

### Uploading Photo & Resume from Admin:
1. Go to Admin → Profile → Click your profile
2. Scroll to **Files** section
3. Click **Choose File** next to Photo or Resume
4. Save — it auto-appears on the portfolio!

---

## Deploy to Render.com (Free — Recommended)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial Django portfolio"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 2. Create render.yaml in root
```yaml
services:
  - type: web
    name: sankar-portfolio
    env: python
    buildCommand: >
      pip install -r requirements.txt &&
      python manage.py migrate &&
      python manage.py loaddata core/fixtures/initial_data.json &&
      python manage.py collectstatic --no-input
    startCommand: gunicorn portfolio.wsgi:application
    envVars:
      - key: SECRET_KEY
        generateValue: true
      - key: DEBUG
        value: False
      - key: ALLOWED_HOSTS
        value: .onrender.com
```

### 3. Go to render.com
- Sign up (free)
- New → Web Service
- Connect GitHub repo
- It auto-detects render.yaml
- Deploy!

Your site will be live at: `https://sankar-portfolio.onrender.com`

---

## Deploy to Azure App Service (Free F1 Tier)

### 1. Install Azure CLI
```bash
# Windows
winget install Microsoft.AzureCLI

# Mac
brew install azure-cli
```

### 2. Login & Deploy
```bash
az login

# Create resource group
az group create --name sankar-rg --location eastasia

# Create app service plan (FREE tier)
az appservice plan create \
  --name sankar-plan \
  --resource-group sankar-rg \
  --sku F1 \
  --is-linux

# Create web app
az webapp create \
  --resource-group sankar-rg \
  --plan sankar-plan \
  --name sankar-portfolio \
  --runtime "PYTHON:3.11"

# Set startup command
az webapp config set \
  --resource-group sankar-rg \
  --name sankar-portfolio \
  --startup-file "gunicorn portfolio.wsgi:application"

# Set environment variables
az webapp config appsettings set \
  --resource-group sankar-rg \
  --name sankar-portfolio \
  --settings SECRET_KEY="your-secret-key" DEBUG="False" ALLOWED_HOSTS=".azurewebsites.net"

# Deploy via zip
zip -r portfolio.zip . -x "*.pyc" -x "__pycache__/*" -x ".git/*"
az webapp deployment source config-zip \
  --resource-group sankar-rg \
  --name sankar-portfolio \
  --src portfolio.zip
```

Your site: `https://sankar-portfolio.azurewebsites.net`

---

## Environment Variables (Production)

Set these in your hosting platform:

| Variable | Value |
|---|---|
| `SECRET_KEY` | A random long string (generate one) |
| `DEBUG` | `False` |
| `ALLOWED_HOSTS` | `.onrender.com` or `.azurewebsites.net` |

Generate a secret key:
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```
