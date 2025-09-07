import { supabase } from "@/lib/supabase/supabaseClient"

export const createBusinessOwnerDetails = async (ownerData: any) => {
    
    try{
        const { data, error } = await supabase
        .from('business_owners')
        .insert([{
            owner_nic: ownerData.ownerNIC,
            owner_contact_number: ownerData.ownerContact,
            owner_fix_contact_number: ownerData.ownerFixedContact,
            owner_email: ownerData.ownerEmail,
            owner_address_line_one: ownerData.ownerAddressLine1,
            owner_address_line_two: ownerData.ownerAddressLine2,
            owner_city: ownerData.ownerCity,
            owner_city_postal_code: ownerData.ownerPostalCode,
        }])
        .select()
        
        if(error) {
            throw new Error(`${error.message}`)
        }

        return data[0].id
    }
    catch(err) {
        console.error(`Something went wrong in the business owner data insertion process.. ${err}`)
        return null
    }
    
}