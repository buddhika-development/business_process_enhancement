from io import BytesIO
from pypdf import PdfReader

def pdf_content_scraper(file) -> str | None:
    document_content = ""

    try:
        # Read file contents once into memory
        file_stream = BytesIO(file.read())

        if file_stream.getbuffer().nbytes == 0:
            print("Empty file received")
            return None

        document = PdfReader(file_stream)
        pageCount = len(document.pages)

        for i in range(pageCount):
            page = document.pages[i]
            page_content = page.extract_text()
            if page_content:
                document_content += page_content

        return document_content if document_content else "[No text extracted]"

    except Exception as e:
        print("Something went wrong. In document reading process.")
        print("Error details:", str(e))
        return None
