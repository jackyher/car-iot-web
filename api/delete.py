from flask import jsonify
import pymysql
from db_config import get_db_connection

def delete_record(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        sql = "DELETE FROM IoTCarStatus WHERE id=%s"
        cursor.execute(sql, (id,))

        conn.commit()
        return jsonify({"message": "Record deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        cursor.close()
        conn.close()
