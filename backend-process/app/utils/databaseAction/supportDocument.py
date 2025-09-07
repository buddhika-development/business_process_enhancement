from app.libs.SupabaseClient import supabase

def document_data_insert(position, name, mail, location, validity, reason):

    data, error = supabase.table("business_document").insert({
        "responsible_person_position" : position,
        "responsible_person_name": name,
        "responsible_person_contact" : mail,
        "persist_location" : location,
        "authenticity" : validity,
        "reason" : reason
    }).execute()

    if error:
        print(f"Something went wrong in data insertion process. {error}")

    print(data)
    return data