from flask import jsonify, request
import pymysql
from db_config import get_db_connection
from datetime import datetime

def create_record():
    try:
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()

        # Obtener la IP del cliente desde la solicitud
        ip_client = request.remote_addr

        # No necesitamos enviar la fecha, ya que el campo tiene DEFAULT CURRENT_TIMESTAMP
        sql = "INSERT INTO IoTCarStatus (status, ip_client, name, id_device) VALUES (%s, %s, %s, %s)"
        cursor.execute(sql, (data['status'], ip_client, data['name'], data['id_device']))

        conn.commit()
        return jsonify({"message": "Record created successfully", "ip": ip_client, "timestamp": str(datetime.now())}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()
