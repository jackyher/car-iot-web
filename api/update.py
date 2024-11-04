from flask import jsonify, request
import pymysql
from db_config import get_db_connection

def update_record(id):
    try:
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()

        # Obtener la IP del cliente desde la solicitud si no se proporciona
        ip_client = data.get('ip_client', request.remote_addr)

        # Crear la consulta dinámica según los campos presentes en la solicitud
        sql = """
        UPDATE IoTCarStatus 
        SET status = %s, ip_client = %s, name = %s, id_device = %s 
        WHERE id = %s
        """
        
        cursor.execute(sql, (data['status'], ip_client, data['name'], data['id_device'], id))

        conn.commit()
        return jsonify({"message": "Record updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()
