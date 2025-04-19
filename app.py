from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask app and SQLAlchemy
app = Flask(__name__)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:admin123@localhost/campus_portal'  # Update with your details
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize SQLAlchemy
db = SQLAlchemy(app)

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
