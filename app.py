import os
from flask import Flask
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST'] = os.environ.get("DB_HOST")
app.config['MYSQL_USER'] = os.environ.get("DB_USER")
app.config['MYSQL_PASSWORD'] = os.environ.get("DB_PASSWORD")
app.config['MYSQL_DB'] = os.environ.get("DB_NAME")

db = MySQL(app)


# Define the model for carousel items
class CarouselItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(255), nullable=False)
    link = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<CarouselItem {self.id}>'

@app.route('/')
def home():
    # Fetch all carousel items
    carousel_items = CarouselItem.query.all()
    return render_template('index.html', carousel_items=carousel_items)

if __name__ == '__main__':
    app.run(debug=True)
