from flask import jsonify
import pymysql
from db_config import get_db_connection

def get_last_record():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        # Obtener el último registro, ordenando por id de forma descendente
        cursor.execute("SELECT * FROM IoTCarStatus ORDER BY id DESC LIMIT 1")
        result = cursor.fetchone()
        
        if result:
            return jsonify(result), 200
        else:
            return jsonify({"message": "No records found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()
