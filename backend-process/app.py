from app import create_app

app = create_app()
app.run(
    port= app.config["PORT"],
    debug= app.config["DEBUG"]
)