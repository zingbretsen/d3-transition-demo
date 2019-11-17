FROM python:alpine

RUN pip install flask jinja2

COPY src /src/

EXPOSE 5000

ENTRYPOINT ["python", "/src/app.py"]
