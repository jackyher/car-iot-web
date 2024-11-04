import pymysql

def get_db_connection():
    return pymysql.connect(
        host='instancia-db-iot.c5eaqc42cp18.us-east-1.rds.amazonaws.com',
        user='admin',
        password='Admin12345#!',
        db='db_iot',
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )
