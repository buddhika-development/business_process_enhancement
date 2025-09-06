from app.utils.pdfReader import pdf_content_scraper
from app.libs.prompt_generator.PromptSelector import prompt_selector
from app.utils.s3ObjectStore import fileStore

def document_content_scraper(key ,file, data, bucket_name):
    content = pdf_content_scraper(file)
    # data["name"] = "Buddhika madusanka"
    data["content"] = content

    conte_result = prompt_selector(
        data= data,
        key= key
    )

    result = conte_result.invoker()
    persist_location = fileStore(file, bucket_name)

    return result,persist_location