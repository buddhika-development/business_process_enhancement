import { supabase } from "../supabase/supabaseClient"

export const createDocument = async (documentData: any) => {

    console.log(documentData)
    console.log(documentData.affidavit.name)
}