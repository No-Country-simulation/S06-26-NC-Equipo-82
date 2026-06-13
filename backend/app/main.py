from fastapi import FastAPI

from app.routes.users import router as users_router

app = FastAPI(title="AppBit API", version="1.0.0")

app.include_router(users_router)


@app.get("/")
def root():
    return {"message": "API funcionando"}
