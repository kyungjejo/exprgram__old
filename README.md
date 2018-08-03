# exprgram
### Deployment
```
cd exprgram-front && npm run build
cd ..
python build.py
cd backend
python manage.py collectstatic
python manage.py runserver
```