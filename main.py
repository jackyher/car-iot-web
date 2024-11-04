from flask import Flask, render_template
from flask_cors import CORS
from api.create import create_record
from api.read import get_records
from api.update import update_record
from api.delete import delete_record
from api.get_last import get_last_record

app = Flask(__name__)
CORS(app)

# Ruta principal para servir el archivo index.html
@app.route('/carrito')
def inicio():
    return render_template('index.html')

# Ruta para servir el archivo control.html dentro de la subcarpeta pages
@app.route('/control')
def control():
    return render_template('pages/control.html')

# Rutas para las APIs
@app.route('/api/create', methods=['POST'])
def create():
    return create_record()

@app.route('/api/read', methods=['GET'])
def read():
    return get_records()

@app.route('/api/update/<int:id>', methods=['PUT'])
def update(id):
    return update_record(id)

@app.route('/api/delete/<int:id>', methods=['DELETE'])
def delete(id):
    return delete_record(id)

@app.route('/api/last', methods=['GET'])
def get_last():
    return get_last_record()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
