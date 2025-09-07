import { supabase } from "../supabase/supabaseClient"

export const createBusinessLandload = async(business_id: any, landlord_nic: any, landlord_contact: string ) => {
    
    try{
        const { data, error } = await supabase
        .from('business_landlords')
        .insert([{
            business_id: business_id,
            landlord_nic: landlord_nic,
            landlord_contact : landlord_contact
        }])
        .select()

        if(error) {
            throw new Error(error.message)
        }

        console.log(data)
        return data[0].id
        
    }
    catch(err) {
        console.error(`Something went wrong in landload data insertion process. ${err}`)
        return null
    }
    
}