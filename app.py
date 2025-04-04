from flask import Flask, render_template, jsonify
from maze import generate_maze

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('maze.html')

@app.route('/generate_maze/<int:width>/<int:height>', methods=['GET'])
def get_maze(width, height):
    maze = generate_maze(width, height)
    return jsonify(maze)

if __name__ == '__main__':
    app.run(debug=True)
