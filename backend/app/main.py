from fastapi import FastAPI
import os
from app.routes.users import router as users_router
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# variable de entorno archivo .env
load_dotenv()

app = FastAPI(title="Plataforma de Orientación Vocacional", version="1.0.0")
app.include_router(users_router)
# app.include_router(users_router)

# conexión URL de Atlas
MONGO_URL = os.getenv("MONGO_URL")
client = AsyncIOMotorClient(MONGO_URL)

# base de datos
db = client.orientacion_personal_db

# colección usuarios
users_collection = db.users


@app.get("/")
async def inicio():
    return {"mensaje": "API conectada exitosamente a MongoDB Atlas"}


# Endpoint de prueba para traer a los usuarios de la nube
@app.get("/usuarios")
async def obtener_usuarios():
    usuarios = []
    # Buscamos en la colección 'users' y traemos los documentos
    cursor = users_collection.find()
    async for documento in cursor:
        # Convertimos el _id de Mongo a string para que FastAPI no falle al mostrarlo
        documento["_id"] = str(documento["_id"])
        usuarios.append(documento)

    return {"total": len(usuarios), "data": usuarios}